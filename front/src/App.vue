<template>
  <main-menu class="menu" />
  <div class="main">
    <transition>
      <routerView></routerView>
    </transition>
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
<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
export default defineComponent({});
</script>

<style scoped>
.menu {
  position: relative;
  width: 100%;
}
.main {
  padding: 10px;
}
</style>
