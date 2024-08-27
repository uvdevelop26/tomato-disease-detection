<script setup>
import { onMounted, ref } from "vue";
import AppLayout from "@/components/Layout/AppLayout.vue";
import * as tf from "@tensorflow/tfjs";
import Icon from "@/components/icons/Icon.vue";

const video = ref(null);
const canvas = ref(null);
const othercanvas = ref(null);
let ctx = null;
let modelo = null;
const size = 400;
let currentStream = null;
let facingMode = "user"; // user/environment

// Cargar el modelo de TensorFlow.js
(async () => {
  console.log("Cargando modelo...");
  modelo = await tf.loadLayersModel("saved.model.pb");
  console.log("Modelo cargado...");
})();

// Función para mostrar la cámara
function mostrarCamara() {
  const opciones = {
    audio: false,
    video: {
      facingMode: "user",
      width: size,
      height: size,
    },
  };

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia(opciones)
      .then((stream) => {
        currentStream = stream;
        video.value.srcObject = currentStream;
      })
      .catch((err) => {
        alert("No se pudo utilizar la cámara :(");
        console.log("No se pudo utilizar la cámara :(", err);
        alert(err);
      });
  } else {
    alert(
      "No existe la función getUserMedia... oops :( no se puede usar la cámara"
    );
  }
}

// Función para cambiar la cámara (entre frontal y trasera)
function cambiarCamara() {
  if (currentStream) {
    currentStream.getTracks().forEach((track) => {
      track.stop();
    });
  }

  facingMode = facingMode === "user" ? "environment" : "user";

  const opciones = {
    audio: false,
    video: {
      facingMode: facingMode,
      width: size,
      height: size,
    },
  };

  navigator.mediaDevices
    .getUserMedia(opciones)
    .then((stream) => {
      currentStream = stream;
      video.value.srcObject = currentStream;
    })
    .catch((err) => {
      console.log("Oops, hubo un error", err);
    });
}

// Función para tomar una foto desde el video y analizarla
function tomarFoto() {
  // Captura el frame actual del video y lo dibuja en el canvas
  ctx.drawImage(video.value, 0, 0, size, size);

  // Procesar la imagen capturada
  predecir();
}

// Función para realizar la predicción
function predecir() {
  if (modelo != null) {
    // Pasar canvas a versión 150x150
    resample_single(canvas.value, 150, 150, othercanvas.value);

    const ctx2 = othercanvas.value.getContext("2d");

    const imgData = ctx2.getImageData(0, 0, 150, 150);
    let arr = []; // El arreglo completo
    let arr150 = []; // Al llegar a arr150 posiciones se pone en 'arr' como un nuevo índice

    for (let p = 0; p < imgData.data.length; p += 4) {
      const red = imgData.data[p] / 255;
      const green = imgData.data[p + 1] / 255;
      const blue = imgData.data[p + 2] / 255;
      arr150.push([red, green, blue]); // Agregar al arr150 y normalizar a 0-1. Aparte queda dentro de un arreglo en el índice 0... again
      if (arr150.length === 150) {
        arr.push(arr150);
        arr150 = [];
      }
    }

    arr = [arr]; // Meter el arreglo en otro arreglo porque si no TensorFlow se enoja >:(
    // Debe estar en un arreglo nuevo en el índice 0, por ser un tensor4d en forma 1, 150, 150, 1
    const tensor4 = tf.tensor4d(arr);
    const resultados = modelo.predict(tensor4).dataSync();
    const mayorIndice = resultados.indexOf(Math.max(...resultados));

    const clases = ["Gato", "Perro"];
    console.log("Predicción", clases[mayorIndice]);
    document.getElementById("resultado").innerHTML = clases[mayorIndice];
  }
}

// Hermite resize - fast image resize/resample using Hermite filter. 1 cpu version!
function resample_single(canvas, width, height, resize_canvas) {
  const width_source = canvas.width;
  const height_source = canvas.height;
  width = Math.round(width);
  height = Math.round(height);

  const ratio_w = width_source / width;
  const ratio_h = height_source / height;
  const ratio_w_half = Math.ceil(ratio_w / 2);
  const ratio_h_half = Math.ceil(ratio_h / 2);

  const ctx = canvas.getContext("2d");
  const ctx2 = resize_canvas.getContext("2d");
  const img = ctx.getImageData(0, 0, width_source, height_source);
  const img2 = ctx2.createImageData(width, height);
  const data = img.data;
  const data2 = img2.data;

  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      const x2 = (i + j * width) * 4;
      let weight = 0;
      let weights = 0;
      let weights_alpha = 0;
      let gx_r = 0;
      let gx_g = 0;
      let gx_b = 0;
      let gx_a = 0;
      const center_y = (j + 0.5) * ratio_h;
      const yy_start = Math.floor(j * ratio_h);
      const yy_stop = Math.ceil((j + 1) * ratio_h);
      for (let yy = yy_start; yy < yy_stop; yy++) {
        const dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half;
        const center_x = (i + 0.5) * ratio_w;
        const w0 = dy * dy; // pre-calc part of w
        const xx_start = Math.floor(i * ratio_w);
        const xx_stop = Math.ceil((i + 1) * ratio_w);
        for (let xx = xx_start; xx < xx_stop; xx++) {
          const dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half;
          const w = Math.sqrt(w0 + dx * dx);
          if (w >= 1) {
            // pixel too far
            continue;
          }
          // hermite filter
          weight = 2 * w * w * w - 3 * w * w + 1;
          const pos_x = 4 * (xx + yy * width_source);
          // alpha
          gx_a += weight * data[pos_x + 3];
          weights_alpha += weight;
          // colors
          if (data[pos_x + 3] < 255) weight = (weight * data[pos_x + 3]) / 250;
          gx_r += weight * data[pos_x];
          gx_g += weight * data[pos_x + 1];
          gx_b += weight * data[pos_x + 2];
          weights += weight;
        }
      }
      data2[x2] = gx_r / weights;
      data2[x2 + 1] = gx_g / weights;
      data2[x2 + 2] = gx_b / weights;
      data2[x2 + 3] = gx_a / weights_alpha;
    }
  }

  ctx2.putImageData(img2, 0, 0);
}

// Hook onMounted para inicializar el canvas cuando el componente se monta
onMounted(() => {
  ctx = canvas.value.getContext("2d");
  mostrarCamara();
});
</script>
<template>
  <AppLayout>
    <div class="flex flex-col gap-4">
      <div>
        <h1 class="text-2xl text-primary font-bold underline">
          Nuevo Análisis
        </h1>
      </div>
      <div class="mt-3">
        <div class="max-w-2xl mx-auto">
          <div class="flex flex-col gap-2">
            <video
              ref="video"
              id="video"
              class="border-2 border-primary rounded-md"
              playsinline
              autoplay
              style="width: 100%"
            ></video>
            <canvas
              ref="canvas"
              id="canvas"
              width="400"
              height="400"
              style="max-width: 100%; display: none"
            ></canvas>
            <canvas
              ref="othercanvas"
              id="othercanvas"
              width="150"
              height="150"
              style="display: none"
            ></canvas>
            <div id="resultado"></div>
          </div>
          <div class="pt-4 flex gap-4 justify-center">
            <button
              class="inline-block px-5 py-5 rounded-full bg-light-green-two hover:shadow-md"
              id="capturar-foto"
              @click="tomarFoto"
            >
              <Icon name="circle" class="w-4 h-4 fill-primary" />
            </button>
            <button
              class="inline-block px-5 py-5 rounded-full bg-light-green-two hover:shadow-md"
              @click="cambiarCamara"
            >
              <Icon name="switch" class="w-4 h-4 fill-primary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
