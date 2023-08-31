import './assets/main.css'

import QuestionsView from './views/QuestionView.vue'
import App  from './App.vue'
import SettingsView from './views/SettingsView.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', component: App },
    { path: '/settings', component: SettingsView },
    { path: '/questions', component: QuestionsView }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(router)

app.mount('#app')
