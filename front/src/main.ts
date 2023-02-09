import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import axios from "axios";
import VueAxios from "vue-axios";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import VueCookies from "vue-cookies";

import "./assets/main.css";
import { store } from "@/store/store";

// @ts-ignore
import ru from "element-plus/dist/locale/ru.mjs";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus, {
  locale: ru,
});
app.use(router);
app.use(store);
app.use(VueAxios, axios);
app.use(VueCookies);

app.mount("#app");
