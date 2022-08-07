import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import {user_store} from '@/stores/userStore'
import {supabase} from '@/supabase'
import { createPinia } from 'pinia'

const pinia = createPinia()
createApp(App).use(router).use(pinia).mount('#app')


// router.beforeEach( (to) => {
//     if (to.name.includes('#')) 
//     {
//         console.log('here')
//       return { name: 'update/password' }
//     }
//   })

supabase.auth.onAuthStateChange((event, session) => {

    if(event == 'SIGN_IN'){
        console.log(session, session.user)
        user_store.user = session.user;
        user_store.session = session;
    }
})