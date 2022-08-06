<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> | 
    <router-link v-if="!user_store.user" to="/login">Login</router-link> 
    <a href="" v-if="user_store.user" @click="logout">Logout </a> |
    <router-link v-if="user_store.user" to="/articles/new">New</router-link> 

  </nav>
  <router-view/>
</template>
<script setup>
import {user_store} from '@/stores/userStore'
import { supabase } from './supabase.js';
import router from './router/index.js';
const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if(error) throw new Error(error.message);
  user_store.user = null;
  router.push('/')
}
console.log("supabase auth user ", supabase.auth.user());
</script>
<style>

</style>
