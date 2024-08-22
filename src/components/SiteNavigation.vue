<script setup>
import Icon from "./icons/Icon.vue";
</script>

<template>
  <nav class="fixed w-full h-16 bottom-0 left-0 bg-white md:static md:h-full md:w-[35vw] lg:w-[30vw] xl:w-[20vw] md:bg-green-600">
    <div class="w-full h-full flex md:flex-col">
      <div class="hidden md:block md:h-20 md:bg-nature-image md:bg-cover">
        <div class="h-full w-full flex items-center justify-center gap-1">
          <span class="text-shadow text-lg text-green-800">BugApp</span>
          <Icon name="camara" class="w-5 h-5 fill-green-800" />
        </div>
      </div>
      <div class="w-full h-full md:h-12 md:px-4 md:w-[90%] md:mx-auto md:mt-8 md:rounded-xl hover:bg-white group">
        <router-link to="/dashboard" class="w-full h-full flex items-center justify-center md:justify-start md:gap-2 hover:bg-gray-100 md:hover:bg-transparent">
          <Icon name="home" class="w-5 h-5 fill-emerald-600 md:fill-white md:group-hover:fill-emerald-600" />
          <span class="hidden md:block md:text-xl md:font-bold md:text-white md:group-hover:text-green-600">Dashboard</span>
        </router-link>
      </div>
      <div class="w-full h-full md:h-12 md:px-4 md:w-[90%] md:mx-auto md:mt-4 md:rounded-xl hover:bg-white group">
        <router-link to="/capturar" class="w-full h-full flex items-center justify-center md:justify-start md:gap-2 hover:bg-gray-100 md:hover:bg-transparent">
          <Icon name="expandir" class="w-5 h-5 fill-emerald-600 md:fill-white md:group-hover:fill-emerald-600" />
          <span class="hidden md:block md:text-xl md:font-bold md:text-white md:group-hover:text-green-600">Expandir</span>
        </router-link>
      </div>
      <div class="w-full h-full md:h-12 md:px-4 md:w-[90%] md:mx-auto md:mt-4 md:rounded-xl hover:bg-white group">
        <router-link to="/" class="w-full h-full flex items-center justify-center md:justify-start md:gap-2 hover:bg-gray-100 md:hover:bg-transparent">
          <Icon name="buscar" class="w-5 h-5 fill-emerald-600 md:fill-white md:group-hover:fill-emerald-600" />
          <span class="hidden md:block md:text-xl md:font-bold md:text-white md:group-hover:text-green-600">Buscar</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
