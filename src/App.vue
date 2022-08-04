<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> | 
    <router-link v-if="!user_store.logged" to="/login">Login</router-link>
    <router-link to="/about">About</router-link> |
    <router-link to="/articles/new">Add Article</router-link> 

  </nav>
  <router-view/>
</template>
<script setup>
import {user_store} from '@/stores/userStore'

console.log(user_store.user);
</script>
<style>

</style>
