<script setup>
import AppLayout from "@/components/Layout/AppLayout.vue";
import { ref } from "vue";
import axios from "axios";

const nombre = ref(null);
const descripcion = ref(null);
const fecha_siembra = ref(null);
const fecha_cosecha = ref(null);
const finca_id = ref(null)


const createCultivo = async () => {
  try {
    await axios.post("http://localhost:3000/api/cultivos/create", {
      nombre: nombre.value,
      descripcion: descripcion.value,
      fecha_siembra: fecha_siembra.value,
      fecha_cosecha: fecha_cosecha.value,
      finca_id: finca_id.value
    });
    // Manejar el éxito, como redirigir o mostrar un mensaje
  } catch (error) {
    console.error("Error al crear el cultivo:", error);
  }
};
</script>

<template>
  <AppLayout>
    <div class="flex flex-col gap-4 mb-40">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl text-primary font-bold underline">Nuevo Cultivo</h1>
      </div>
      <form
        @submit.prevent="createCultivo"
        class="max-w-2xl flex flex-col gap-4 md:mx-auto lg:max-w-5xl lg:mx-0">
        <div class="flex flex-col gap-4 w-full items-center md:flex-row md:flex-wrap">
          <div class="flex flex-col gap-1">
            <label for="nombre" class="text-sm font-bold">Nombre:</label>
            <input
              type="text"
              name="nombre"
              v-model="nombre"
              class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="descripcion" class="text-sm font-bold">Descripción:</label>
            <input
              type="text"
              name="descripcion"
              v-model="descripcion"
              class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="fecha_siembra" class="text-sm font-bold">Fecha Siembra:</label>
            <input
              type="date"
              name="fecha_siembra"
              v-model="fecha_siembra"
              class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="fecha_cosecha" class="text-sm font-bold">Fecha Cosecha:</label>
            <input
              type="date"
              name="fecha_cosecha"
              v-model="fecha_cosecha"
              class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="finca" class="text-sm font-bold">Finca:</label>
            <select
              id="finca"
              name="finca"
              class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary"
              v-model="finca_id">
              <option :value="null"></option>
              <option value="1" class="cursor-pointer">Quinta don Felipe</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          class="h-10 w-72 bg-primary text-white font-bold rounded-3xl text-sm hover:bg-light-green-two hover:text-primary">
          Agregar
        </button>
      </form>
    </div>
  </AppLayout>
</template>
