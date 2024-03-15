import { createApp } from 'vue'
import { IonicVue } from '@ionic/vue'

import router from './plugins/router'
import pinia from './plugins/pinia'

import App from './App.vue'

import './assets/main.css'

createApp(App).use(IonicVue).use(router).use(pinia).mount('#app')
