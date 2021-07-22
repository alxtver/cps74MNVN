import Vue from 'vue';
import VueRouter, {NavigationGuardNext, Route, RouteConfig} from 'vue-router';
import Home from '../views/Home.vue';
import Pkis from '../views/pki/Pkis.vue';
import LoginForm from '@/components/loginform/LoginForm.vue';
import Apkzi from "@/views/apkzi/Apkzi.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/pc',
  },
  {
    path: '/pc',
    name: 'ПВЭМ',
    component: Home,
    meta: {
      title: 'ПЭВМ'
    }
  },
  {
    path: '/pkis',
    name: 'Pki',
    component: Pkis,
    meta: {
      title: 'ПКИ'
    }
  },
  {
    path: '/apkzi',
    name: 'Apkzi',
    component: Apkzi,
    meta: {
      title: 'АПКЗИ'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm,
    meta: {
      title: 'Авторизация'
    }
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((toRoute: Route, fromRoute: Route, next: NavigationGuardNext) => {
  const isAuth = sessionStorage.getItem('isAuth') === 'true';
  if (toRoute.name !== 'Login' && !isAuth) {
    next({name: 'Login'});
  }
  next();
});

router.beforeEach((toRoute, fromRoute, next) => {
  window.document.title = toRoute.meta && toRoute.meta.title ? toRoute.meta.title : 'Home';
  next();
});

export default router;
