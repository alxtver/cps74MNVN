import Vue from 'vue';
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router';
import Pkis from '../views/pki/Pkis.vue';
import LoginForm from '@/components/loginform/LoginForm.vue';
import Apkzi from '@/views/apkzi/Apkzi.vue';
import SystemCases from '@/views/systemcases/SystemCases.vue';
import goTo from 'vuetify/lib/services/goto';
import Assembly from '@/views/assembly/Assembly.vue';
import Pc from '@/views/pc/Pc.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: '/pc',
    },
    {
        path: '/pc',
        name: 'Pc',
        component: Pc,
        meta: {
            title: 'ПЭВМ',
        },
    },
    {
        path: '/pkis',
        name: 'Pki',
        component: Pkis,
        meta: {
            title: 'ПКИ',
        },
    },
    {
        path: '/apkzi',
        name: 'Apkzi',
        component: Apkzi,
        meta: {
            title: 'АПКЗИ',
        },
    },
    {
        path: '/systemCases',
        name: 'SystemCases',
        component: SystemCases,
        meta: {
            title: 'Системные блоки',
        },
    },
    {
        path: '/assembly',
        name: 'Assembly',
        component: Assembly,
        meta: {
            title: 'Сборка системных блоков',
        },
    },
    {
        path: '/eans',
        name: 'Eans',
        component: Assembly,
        meta: {
            title: 'Штрих-коды',
        },
    },
    {
        path: '/countries',
        name: 'Countries',
        component: Assembly,
        meta: {
            title: 'Страны',
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginForm,
        meta: {
            title: 'Авторизация',
        },
    },
];

const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        let scrollTo: string | number = 0;
        if (to.hash) {
            scrollTo = to.hash;
        } else if (savedPosition) {
            scrollTo = savedPosition.y;
        }
        const scroll: any = goTo(scrollTo);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(scroll);
            }, 1000);
        });
    },
});

router.beforeEach(
    (toRoute: Route, fromRoute: Route, next: NavigationGuardNext) => {
        const isAuth = sessionStorage.getItem('isAuth') === 'true';
        if (toRoute.name !== 'Login' && !isAuth) {
            next({ name: 'Login' });
        }
        next();
    }
);

router.beforeEach((toRoute, fromRoute, next) => {
    window.document.title =
        toRoute.meta && toRoute.meta.title ? toRoute.meta.title : 'Home';
    next();
});

export default router;
