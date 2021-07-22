<template>
  <v-app>
    <main-menu></main-menu>
    <transition>
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script src="./App.ts" lang="ts"></script>
<style src="./styles/styles.scss" lang="scss"></style>
