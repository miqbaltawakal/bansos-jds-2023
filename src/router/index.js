import { createWebHistory, createRouter } from 'vue-router'
import FormBansos from '../components/FormBansos.vue'
import PreviewPage from '../components/PreviewPage.vue'

const routes = [
  {
    path: '/',
    name: 'Form Bansos Covid',
    component: FormBansos
  },
  {
    path: '/preview',
    name: 'Preview Bansos',
    component: PreviewPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router