<script setup>
import AppLayout from "@/components/Layout/AppLayout.vue";
import { ref } from "vue";
import axios from "axios";
import Icon from "@/components/icons/Icon.vue";

const rol = ref(null);
const message = ref("");

const createRol = async () => {
  try {
   const response = await axios.post("http://localhost:3000/api/roles/create", {
      rol: rol.value,
    });
    // Manejar el éxito, como redirigir o mostrar un mensaje
    message.value = response.data.message;

    cleanForm()
  } catch (error) {
    console.error("Error al crear el rol:", error);
    message.value = error.response.data.message || "Error al crear el rol";
  }
};

const dismiss = () => {
  message.value = "";
};


const cleanForm = () => {
  setTimeout(() => {
    rol.value = ""
  }, 300);
};
</script>

<template>
  <AppLayout>
    <div class="flex flex-col gap-4 mb-40">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl text-primary font-bold underline">Nuevo Rol</h1>
      </div>
      <form
        @submit.prevent="createRol"
        class="max-w-2xl flex flex-col gap-4 md:mx-auto lg:max-w-5xl lg:mx-0">
        <div class="flex flex-col gap-4 w-full items-center md:flex-row md:flex-wrap">
          <div class="flex flex-col gap-1">
            <label for="rol" class="text-sm font-bold">Rol:</label>
            <input
              type="text"
              name="rol"
              v-model="rol"
              class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary"
            />
          </div>
        </div>
        <button
          type="submit"
          class="h-10 w-72 bg-primary text-white font-bold rounded-3xl text-sm hover:bg-light-green-two hover:text-primary">
          Agregar
        </button>
      </form>
      <div
        v-if="message"
        class="bg-green-400 max-w-96 px-4 py-2 rounded-xl mx-auto flex items-center gap-2"
      >
        <span class="text-white y font-bold text-sm italic">{{ message }}</span>
        <button
          type="button"
          class="bg-white w-4 h-4 rounded-full flex justify-center items-center"
          @click="dismiss"
        >
          <Icon name="close" class="w-2 h-2 fill-green-400" />
        </button>
      </div>
    </div>
  </AppLayout>
</template>
