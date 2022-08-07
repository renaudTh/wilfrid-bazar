<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link v-if="!storeUser.user" to="/login">Login</router-link>
    <a v-if="storeUser.user" @click="logout">Logout </a> |
    <router-link v-if="storeUser.user" to="/articles/new">New</router-link>

  </nav>
  <router-view />
</template>
<script setup>
import { useUserStore } from '@/stores/userStore'
import { useArticleStore } from './stores/articleStore.js';
import { supabase } from './supabase.js';
import router from './router/index.js';

const storeArticles = useArticleStore()
const storeUser = useUserStore()

storeUser.$patch((state) => {
  state.user = supabase.auth.user()
})

const logout = async () => {
  storeUser.signOut();
  storeArticles.$reset();
  router.push('/')
}
supabase.auth.onAuthStateChange((event) => {

  console.log(event)
  
})

</script>
<style>
</style>
