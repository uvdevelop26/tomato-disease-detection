<script setup>
import AppLayout from "@/components/Layout/AppLayout.vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import Icon from "@/components/icons/Icon.vue";

const finca = ref({});
const message = ref("");
const route = useRoute();

onMounted(async () => {
  const { id } = route.params;
  try {
    const response = await axios.get(`http://localhost:3000/api/fincas/${id}`);
    finca.value = response.data;
    message.value = response.data.message;
  } catch (error) {
    console.error("Error al cargar el usuario:", error);
    message.value = error.response.data.message || "Error al crear el usuario";
  }
});

const dismiss = () => {
  message.value = "";
};

const updateFinca = async () => {
  try {
    const { id } = route.params;
    await axios.put(`http://localhost:3000/api/fincas/${id}`, finca.value);
    message.value = "Finca Actualizado Correctamente";
  } catch (error) {
    console.error("Error al actualizar la finca:", error);
  }
};
</script>

<template>
  <AppLayout>
    <div class="flex flex-col gap-4 mb-40">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl text-primary font-bold underline">Editar Finca</h1>
      </div>
      <form
        @submit.prevent="updateFinca"
        class="max-w-2xl flex flex-col gap-4 md:mx-auto lg:max-w-5xl lg:mx-0"
      >
        <div
          class="flex flex-col gap-4 w-full items-center md:flex-row md:flex-wrap"
        >
          <div class="flex flex-col gap-1">
            <label for="nombre" class="text-sm font-bold">Nombre:</label>
            <input
              type="text"
              name="nombre"
              v-model="finca.nombre"
              class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="ubicacion" class="text-sm font-bold">Ubicación:</label>
            <input
              type="text"
              name="ubicacion"
              v-model="finca.ubicacion"
              class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="contacto" class="text-sm font-bold">Contacto:</label>
            <input
              type="text"
              name="contacto"
              v-model="finca.contacto"
              class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary"
            />
          </div>
        </div>
        <button
          type="submit"
          class="h-10 w-72 bg-primary text-white font-bold rounded-3xl text-sm hover:bg-light-green-two hover:text-primary"
        >
          Actualizar
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
