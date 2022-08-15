<template>
<h2>Connexion</h2>
  <form  @submit.prevent="handleLogin">
    <input placeholder="email" v-model="credentials.email" type="email" name="email" required><br>
    <input placeholder="password" v-model="credentials.password" type="password" name="password" id="password" required><br/>
    <input type="submit" value="Login">
  </form>
  <a  @click="sendForgottenMail">Mot de passe oublié</a>
</template>

<script setup>
import {ref} from 'vue';
//import { supabase } from '@/supabase.js';
import { useUserStore} from '../stores/userStore';
//import router from '@/router'

const credentials = ref({
  email: null,
  password: null
})

const storeUser = useUserStore();
const handleLogin = async () => {
    await storeUser.signIn(credentials.value);
   //console.log(credentials.value)
    //router.push('/')
}
/*
const sendForgottenMail = async () => {
  if(credentials.value.email){
    const { data, error } = await supabase.auth.api
    .resetPasswordForEmail(credentials.value.email, {redirectTo: 'http://localhost:8080/update/password'})

    if(error) throw new Error(error.message);
    console.log(data);
  }
}*/
</script>

<style>

</style>
