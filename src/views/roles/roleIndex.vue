<script setup>
import AppLayout from "@/components/Layout/AppLayout.vue";
import Icon from "@/components/icons/Icon.vue";
import { ref, onMounted } from "vue";
import axios from "axios"; // Importa Axios

const roles = ref([]);
const errorMessage = ref("");

// Función para obtener los datos de usuarios
const fechRoles = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/roles"); // Llama a tu backend
    roles.value = response.data; // Almacena los datos en la variable users
  } catch (error) {
    errorMessage.value = "Error al obtener los datos de los usuarios.";
    console.error(error);
  }
};

// Llama a la función cuando el componente se monta
onMounted(() => {
  fechRoles();
});
</script>
<template>
  <AppLayout>
    <div class="flex flex-col gap-4">
      <!-- Head -->
      <div class="flex items-center justify-between">
        <h1 class="text-2xl text-primary font-bold underline">Roles</h1>
        <router-link
          to="/roles/create"
          class="flex items-center justify-center gap-1 bg-primary text-white font-bold w-28 h-9 rounded-md text-sm">
          <Icon name="plus" class="w-3 h-3 fill-white" />
          Añadir
        </router-link>
      </div>
      <!-- table -->
      <div class="w-full overflow-x-auto rounded-lg">
        <table
          class="w-full text-sm whitespace-nowrap border-separate border-spacing-y-2 rounded-md overflow-hidden shadow-md">
          <thead>
            <tr class="h-12 uppercase shadow">
              <th
                class="py-3 px-4 bg-light-green-two rounded-l-xl text-primary font-bold">
                N°
              </th>
              <th
                class="py-3 px-4 bg-light-green-two text-primary font-bold">
                Rol
              </th>
              <th
                class="py-3 px-4 bg-light-green-two rounded-r-xl text-primary font-bold">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="h-14 text-center shadow group"
              v-for="(role, index) in roles"
              :key="role.id">
              <td
                class="py-1 px-1 bg-white group-hover:bg-gray-100 rounded-l-xl">
                {{ index + 1 }}
              </td>
              <td
                class="py-1 px-1 bg-white group-hover:bg-gray-100">
                {{ role.rol }}
              </td>
              <td
                class="py-1 px-1 bg-white group-hover:bg-gray-100 rounded-r-xl">
                <div class="w-full h-full flex items-center justify-center gap-2">
                  <button
                    class="inline-block px-3 py-3 rounded-full bg-light-green-two hover:shadow-md">
                    <Icon name="delete" class="w-3 h-3 fill-primary" />
                  </button>
                  <button
                    class="inline-block px-3 py-3 rounded-full bg-light-green-two hover:shadow-md">
                    <Icon name="edit" class="w-3 h-3 fill-primary" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AppLayout>
</template>

<style lang="scss" scoped></style>
