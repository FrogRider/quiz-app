import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Quiz from '@/views/Quiz.vue'
import QuizAdd from '@/components/QuizAdd.vue'

const routes = [
	{ path: '/:page?',
		name: 'home',
		component: Home },
	{ path: '/add', name: 'add', component: QuizAdd },
	{ path: '/quiz/:quizId', name: 'quiz', component: Quiz },
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
