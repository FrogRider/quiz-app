import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue';
import Quiz from '@/views/Quiz.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/quiz/:quizId', name: 'quiz', component: Quiz }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

