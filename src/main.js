// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')
import { createApp, h } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import firebase from 'firebase/app'

createApp({
  created() {
    const config = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
    firebase.initializeApp(config);
  },
  render: () => h(App),
})
.use(router)
// .use(Notifications)
.use(createPinia())
// .use(autoAnimatePlugin)
.mount('#app')