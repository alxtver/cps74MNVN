import { createRouter, createWebHistory } from 'vue-router'
import Pki from "@/components/pki/Pki.vue";
import Apkzi from "@/components/apkzi/Apkzi.vue";
import Pc from "@/components/pc/Pc.vue";
import SystemCases from "@/components/systemcases/SystemCases.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Pki
    },
    {
      path: '/pki',
      name: 'pki',
      component: Pki
    },
    {
      path: '/apkzi',
      name: 'apkzi',
      component: Apkzi
    },
    {
      path: '/systemCases',
      name: 'systemCases',
      component: SystemCases
    },
    {
      path: '/pc',
      name: 'pc',
      component: Pc
    },
  ]
})

export default router
