<template>

  <NavBar />
  <router-view />
</template>
<script setup>
import { useUserStore } from '@/stores/userStore'

import { supabase } from './supabase.js';


import NavBar from './components/NavBar.vue'


const storeUser = useUserStore()

storeUser.$patch((state) => {
  state.user = supabase.auth.user()
})


supabase.auth.onAuthStateChange((event) => {

  console.log(event)
  
})

</script>
<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  background-color: #1A281F;
  color: #ecf0f1;
}

</style>
