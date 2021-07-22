import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import locale from 'element-ui/lib/locale/lang/ru-RU';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false;
Vue.use(ElementUI, {locale});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
