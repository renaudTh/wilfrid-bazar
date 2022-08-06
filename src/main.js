import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {user_store} from '@/stores/userStore'

createApp(App).use(router).mount('#app')

router.beforeEach( (to) => {
    if (
      // make sure the user is authenticated
      !user_store.user &&
      // ❗️ Avoid an infinite redirect
      to.name !== 'login'
    ) {
      // redirect the user to the login page
      return { name: 'login' }
    }
  })