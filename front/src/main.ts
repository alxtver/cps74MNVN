import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/main.css'
import { store } from "@/store/store";

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(VueAxios, axios)

app.mount('#app')
