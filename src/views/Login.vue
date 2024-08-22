<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const correo = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post("http://localhost:3000/api/login", { // URL completa
      correo: correo.value,
      password: password.value,
    });

    const token = response.data.token;

    localStorage.setItem("token", token);

    router.push("/dashboard");
  } catch (error) {
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = "Error al conectar con el servidor";
    }
  }
};
</script>
<template>
  <div class="h-full w-full overflow-hidden lg:flex lg:items-center lg:justify-center">
    <div class="flex flex-col gap-8 lg:flex-row lg:h-96 lg:rounded-xl lg:overflow-hidden lg:gap-2 lg:bg-gray-100 lg:shadow-md">
      <div class="w-full h-64 relative lg:w-80 lg:h-auto lg:flex-1">
        <div
          class="w-[43rem] h-[43rem] bg-hero-pattern bg-cover rounded-full absolute top-0 -translate-y-[61%] left-1/2 -translate-x-1/2  sm:w-[64rem] sm:h-[64rem] sm:-translate-y-[74%] md:w-[78rem] md:h-[78rem] md:-translate-y-[79%] lg:static lg:w-full lg:h-full lg:translate-x-0 lg:translate-y-0 lg:rounded-none"
        ></div>
      </div>
      <div class="lg:flex-1 lg:flex lg:flex-col lg:px-4 lg:items-center lg:justify-center">
        <div class="text-center">
          <h1 class="text-primary font-bold text-2xl">Bienvenido</h1>
          <p class="text-gray-500 text-sm font-bold">- Ingresa a tu cuenta -</p>
        </div>
        <form @submit.prevent="login" class="pt-8 flex flex-col gap-4 items-center">
          <input type="email" class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary placeholder:text-xs placeholder:text-primary placeholder:italic" placeholder="Ingresa tu Correo" v-model="correo">
          <input type="password" class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary placeholder:text-xs placeholder:text-primary placeholder:italic" placeholder="Ingresa tu Contraseña" v-model="password">
          <div class="pt-8">
            <button type="submit" class="h-10 w-72 bg-primary text-white font-bold rounded-3xl text-sm hover:bg-light-green-two hover:text-primary">
              Ingresar
            </button>
          </div>
        </form>
        
      </div>
    </div>
  </div>
</template>
