import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

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

//TODO: Add form subscription reactivity or each form
//TODO: Refresh the update page
//TODO: Make an article image component and store
//TODO: Styling
//TODO: Interesting feature
//TODO: Admin Dashboard
