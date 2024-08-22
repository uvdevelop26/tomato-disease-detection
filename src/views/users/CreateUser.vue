<script setup>
import AppLayout from "@/components/Layout/AppLayout.vue";
import { ref } from "vue";
import axios from "axios";

const nombre = ref(null);
const apellido = ref(null);
const dni = ref(null);
const telefono = ref(null);
const fecha_nacimiento = ref(null);
const edad = ref(null);
const sexo = ref(null);
const ciudade_id = ref(null);
const departamento = ref(null);
const direccion = ref(null);
const correo = ref(null);
const role_id = ref(null);
const password = ref(null);

const createUser = async () => {
  try {
    await axios.post("http://localhost:3000/api/users/create", {
      nombre: nombre.value,
      apellido: apellido.value,
      dni: dni.value,
      telefono: telefono.value,
      fecha_nacimiento: fecha_nacimiento.value,
      edad: edad.value,
      sexo: sexo.value,
      ciudade_id: ciudade_id.value,
      departamento: departamento.value,
      direccion: direccion.value,
      correo: correo.value,
      role_id: role_id.value,
      password: password.value,
    });
    // Manejar el éxito, como redirigir o mostrar un mensaje
  } catch (error) {
    console.error("Error al crear el usuario:", error);
  }
};
</script>

<template>
  <AppLayout>
    <div class="flex flex-col gap-4 mb-40">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl text-primary font-bold underline">Nuevo Usuario</h1>
      </div>
      <form
        @submit.prevent="createUser"
        class="max-w-2xl flex flex-col gap-4 md:mx-auto lg:max-w-5xl lg:mx-0">
        <div
          class="flex flex-col gap-4 w-full items-center md:flex-row md:flex-wrap">
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
            <label for="apellido" class="text-sm font-bold">Apellido:</label>
            <input
              type="text"
              name="apellido"
              v-model="apellido"
              class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="dni" class="text-sm font-bold">DNI:</label>
            <input
              type="text"
              name="dni"
              v-model="dni"
              class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="telefono" class="text-sm font-bold">Teléfono:</label>
            <input
              type="text"
              name="telefono"
              v-model="telefono"
              class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="fecha_nacimiento" class="text-sm font-bold">Fecha de Nacimiento:</label>
            <input
              type="date"
              name="fecha_nacimiento"
              v-model="fecha_nacimiento"
              class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="edad" class="text-sm font-bold">Edad:</label>
            <input
              type="number"
              min="1"
              max="100"
              name="edad"
              v-model="edad"
              class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="sexo" class="text-sm font-bold">Sexo:</label>
            <input
              type="text"
              name="sexo"
              v-model="sexo"
              class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="departamento" class="text-sm font-bold">Departamento:</label>
            <select
              id="departamento"
              name="departamento"
              class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary"
              v-model="departamento">
              <option :value="null"></option>
              <option value="1" class="cursor-pointer">Guaira</option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label for="ciudad" class="text-sm font-bold">Ciudad:</label>
            <select
              id="ciudad"
              name="ciudad"
              class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary"
              v-model="ciudade_id">
              <option :value="null"></option>
              <option value="1" class="cursor-pointer">Troche</option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label for="direccion" class="text-sm font-bold">Dirección:</label>
            <input
              type="text"
              name="direccion"
              v-model="direccion"
              class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="correo" class="text-sm font-bold">Correo:</label>
            <input
              type="email"
              name="correo"
              v-model="correo"
              class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="password" class="text-sm font-bold">Contraseña:</label>
            <input
              type="password"
              name="password"
              v-model="password"
              class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="rol" class="text-sm font-bold">rol:</label>
            <select
              id="rol"
              name="rol"
              class="h-10 w-72 px-2 bg-light-green-two rounded-lg text-sm text-primary"
              v-model="role_id">
              <option :value="null"></option>
              <option value="1" class="cursor-pointer">Administrador</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          class="h-10 w-72 bg-primary text-white font-bold rounded-3xl text-sm  hover:bg-light-green-two hover:text-primary">
          Agregar
        </button>
      </form>
    </div>
  </AppLayout>
</template>
