
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();


const openPopMenu = ref(false);

const logout = () => {
  // Elimina el token del localStorage
  localStorage.removeItem('token');

  // Redirige al usuario a la página de inicio de sesión
  router.push({ name: 'login' });
};

</script>

<template>
  <div
    class="relative h-64 rounded-b-4xl bg-hero-pattern bg-no-repeat bg-cover shadow-md md:h-20 md:rounded-none">
    <div
      class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center md:block md:left-auto md:-translate-x-0 md:right-[4.2rem] md:max-w-32 md:bg-green-600 md:rounded-tl-xl md:rounded-bl-xl md:h-11 md:pt-1 md:shadow-lg md:border md:border-green-600">
      <h1 class="text-2xl text-white font-bold md:hidden md:overflow-hidden">
        Bienvenida
      </h1>
      <div class="bg-green-600 mt-1 md:mt-0 rounded-lg shadow-2xl w-full font-bold  border-b-2 md:border-none border-green-800 group hover:bg-white md:hover:bg-green-600 relative">
        <button class="inline-block py-1 px-2 md:py-0 md:px-0  w-full h-full text-xs italic text-white md:leading-4 md:text-xs group-hover:text-green-600 md:h-full md:w-full md:group-hover:text-white" @click="openPopMenu = !openPopMenu">
            Andrea Rivero Administradora
        </button>  
        <div class="absolute border border-green-600 rounded-md shadow -top-11 left-1/2 -translate-x-1/2  w-40 h-10 bg-white z-[50] hover:bg-gray-100 md:-bottom-12 md:top-auto" v-if="openPopMenu">
          <button class="w-full h-full text-xs text-green-600" @click="logout">Cerrar Sesión</button>
        </div>
      </div>
    </div>
    <div
      class="absolute w-28 h-28 rounded-lg shadow-md -bottom-10 left-1/2 -translate-x-1/2 overflow-hidden z-10 md:w-12 md:h-12 md:rounded-full md:top-1/2 md:-translate-y-1/2 md:left-auto md:right-2 md:border-2 md:border-white">
      <img
        src="../images/profile_picture.jpg"
        alt="user"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>


<style lang="scss" scoped></style>
