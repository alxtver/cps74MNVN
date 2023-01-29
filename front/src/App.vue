<template>
  <main-menu class="menu" />
  <transition>
    <routerView></routerView>
  </transition>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import MainMenu from "@/components/mainmenu/MainMenu.vue";
</script>

<style scoped>
.menu {
  position: relative;
  width: 100%;
}
</style>
