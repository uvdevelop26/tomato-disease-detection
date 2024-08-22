<script setup>
import Icon from "../icons/Icon.vue";
import { ref, onMounted, onUnmounted } from "vue";

const isMobile = ref(null);
let mql = null;
const sidebar = ref(false);

const handleMqlChange = (e) => {
  isMobile.value = e.matches;
};

const toggleModal = (state) => {
  if (state == "open") {
    isMobile.value = !isMobile.value;
    setTimeout(() => {
      sidebar.value.classList.remove("-translate-x-full");
      sidebar.value.classList.add("translate-x-0");
    }, 400);
  } else if (state === "close") {
    sidebar.value.classList.remove("translate-x-0");
    sidebar.value.classList.add("-translate-x-full");
    setTimeout(() => {
      isMobile.value = !isMobile.value;
    }, 400);
  }
};

onMounted(() => {
  mql = window.matchMedia("(min-width: 1024px)");
  isMobile.value = mql.matches;

  mql.addEventListener("change", handleMqlChange);
});

onUnmounted(() => {
  mql.removeEventListener("change", handleMqlChange);
});
</script>
<template>
  <div
    class="h-screen w-full overflow-y-auto relative lg:flex lg:flex-row-reverse">
    <div class="w-full h-full overflow-y-auto">
       <!-- header -->
      <header
        class="fixed h-20 w-full bg-nature-image bg-cover shadow flex items-center justify-end px-4">
        <button
          type="button"
          class="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-light-green-two group lg:hidden"
          @click="toggleModal('open')">
          <Icon
            name="menu"
            class="h-4 w-4 fill-primary group-hover:fill-white"
          />
        </button>
      </header>
      <!-- content -->
      <div class="w-full h-full overflow-y-auto container pt-24 ">
        <slot />
      </div>
    </div>
    <!-- modal -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-x-auto lg:static lg:inset-auto lg:flex lg:shadow-md"
      ref="modal"
      v-if="isMobile">
      <button
        type="button"
        class="absolute right-4 top-5 w-10 h-10 rounded-full pb-1 bg-white shadow-lg flex items-center justify-center hover:bg-light-green-two group lg:hidden"
        @click="toggleModal('close')">
        <Icon
          name="close"
          class="h-4 w-4 fill-primary group-hover:fill-white"
        />
      </button>
      <!-- navlist -->
      <nav
        class="bg-light-green-two w-[60vw] h-screen flex flex-col transition-transform duration-200 -translate-x-full md:w-[40vw] lg:w-[22vw] lg:translate-x-0"
        ref="sidebar">
        <div
          class="h-20 w-full bg-hero-pattern flex items-center justify-center">
          <span class="text-2xl italic font-bold text-white">BuggApp</span>
        </div>
        <ul
          class="w-full pt-8 px-3 flex flex-col gap-3 max-w-80 sm:px-4 md:px-8 md:max-w-[22rem] lg:px-4 lg:gap-4">
          <li class="h-11 px-3 bg-white rounded-2xl shadow">
            <router-link
              to="/dashboard"
              class="w-full h-full flex items-center gap-2 font-bold text-primary">
              <Icon name="home" class="inline-block w-4 h-4 fill-primary" />
              Dashboard
            </router-link>
          </li>
          <li class="h-11 px-3 bg-white rounded-2xl shadow">
            <router-link
              to="/users"
              class="w-full h-full flex items-center gap-2 font-bold text-primary">
              <Icon name="user" class="inline-block w-4 h-4 fill-primary" />
              Usuarios
            </router-link>
          </li>
          <li class="h-11 px-3 bg-white rounded-2xl shadow">
            <router-link
              to="/roles"
              class="w-full h-full flex items-center gap-2 font-bold text-primary">
              <Icon name="roles" class="inline-block w-4 h-4 fill-primary" />
              Roles
            </router-link>
          </li>
          <li class="h-11 px-3 bg-white rounded-2xl shadow">
            <router-link
              to="/fincas"
              class="w-full h-full flex items-center gap-2 font-bold text-primary">
              <Icon name="location" class="inline-block w-4 h-4 fill-primary" />
              Fincas
            </router-link>
          </li>
          <li class="h-11 px-3 bg-white rounded-2xl shadow">
            <router-link
              to="/cultivos"
              class="w-full h-full flex items-center gap-2 font-bold text-primary">
              <Icon name="plant" class="inline-block w-4 h-4 fill-primary" />
              Cultivos
            </router-link>
          </li>
          <li class="h-11 px-3 bg-white rounded-2xl shadow">
            <a
              href="#"
              class="w-full h-full flex items-center gap-2 font-bold text-primary">
              <Icon name="buscar" class="inline-block w-4 h-4 fill-primary" />
              Análisis
            </a>
          </li>
        </ul>
        <div
          class="mt-auto py-8 px-3 max-w-80 sm:px-4 md:px-8 md:max-w-[22rem] lg:px-4">
          <button
            type="button"
            class="w-full px-1 py-2 bg-white shadow rounded-2xl flex gap-3">
            <div class="w-9 h-9 rounded-full overflow-hidden">
              <img
                src="../../images/profile_picture.jpg"
                alt=""
                class="w-full h-full object-cover"
              />
            </div>
            <p class="text-xs text-start font-bold">
              Andrea Rivero <br />
              Administradora
            </p>
          </button>
        </div>
      </nav>
    </div>
    <!-- app footer -->
    <footer class="h-16 w-full absolute bottom-0 left-0 bg-white shadow">
      <div
        class="hidden lg:w-full lg:h-full lg:flex lg:justify-center lg:items-center lg:gap-1">
        <Icon name="info" class="w-3 h-3 fill-primary" />
        <p class="text-xs italic text-start text-primary">
          BuggApp UNVES - Andrea Rivero 2024
        </p>
      </div>
      <div class="flex w-full h-full lg:hidden">
        <div class="w-full h-full flex items-center justify-center">
          <Icon name="info" class="w-5 h-5 fill-primary" />
        </div>
        <div class="w-full h-full hover:bg-gray-100">
          <router-link to="/capturar" class="h-full w-full flex items-center justify-center">
            <Icon name="expandir" class="w-5 h-5 fill-primary" />
          </router-link>
        </div>
        <div class="w-full h-full flex items-center justify-center">
          <Icon name="buscar" class="w-5 h-5 fill-primary" />
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped></style>
