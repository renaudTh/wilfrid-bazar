<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link v-if="!user_store.user" to="/login">Login</router-link>
    <a v-if="user_store.user" @click="logout">Logout </a> |
    <router-link v-if="user_store.user" to="/articles/new">New</router-link>

  </nav>
  <router-view />
</template>
<script setup>
import { user_store } from '@/stores/userStore'
import { useArticleStore } from './stores/articleStore.js';

import { supabase } from './supabase.js';
import router from './router/index.js';

const storeArticles = useArticleStore()

const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message);
  }
  storeArticles.articles = [];
  router.push('/')
}
supabase.auth.onAuthStateChange((event, session) => {

  if (event == 'SIGNED_IN') {
    console.log(event)
    user_store.user = session.user;
    user_store.session = session;
  }
  else if(event == 'SIGNED_OUT'){
    console.log(event)
    user_store.user = null;
    user_store.session = null;
  }

})
</script>
<style>
</style>
