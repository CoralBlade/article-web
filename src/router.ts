import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  {
    path: '/:chapterNumber(\\d+)?',
    component: App,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/1'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router