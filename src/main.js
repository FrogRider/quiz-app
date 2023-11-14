import { createApp, h } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import firebase from 'firebase/app'
import './index.css'

createApp({
	created() {
		const config = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG)
		firebase.initializeApp(config)
	},
	render: () => h(App),
})
	.use(createPinia())
	.use(router)
	// .use(Notifications)
	// .use(autoAnimatePlugin)
	.mount('#app')
