<template>
  <main-menu class="menu" />
  <div class="main">
    <router-view  class='router-view' v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import MainMenu from "@/components/mainmenu/MainMenu.vue";
import { useStore } from "vuex";
import router from "@/router";
import { onBeforeMount } from "vue";

const store = useStore();

onBeforeMount((): void => {
  const user = sessionStorage.user ? JSON.parse(sessionStorage.user) : null;
  if (user) {
    store.dispatch("loginConfirm");
    store.dispatch("updateUser", user);
    store.dispatch("updatePart", user.lastPart);
  } else {
    router.push("auth");
  }
});
</script>

<style scoped>
.menu {
  position: relative;
  width: 100%;
}
.main {
  padding: 10px;
}
.router-view {
    width: 100%;
    height: calc(100vh - 84px);
}
::-webkit-scrollbar {
    width: 7px;
}
::-webkit-scrollbar-track {
    background-color: #0d9488;
    border-radius: 4px;
}
::-webkit-scrollbar-thumb {
    background-color: rgba(201, 79, 3, 0.99);
    box-shadow: inset 0 0 6px rgba(187, 15, 15, 0.3);
    border-radius: 4px;
}
</style>
