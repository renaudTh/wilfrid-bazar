<template>
  <form  @submit.prevent="handleLogin">
    <label for="email">email</label>
    <input v-model="email" type="email" name="email" required><br>
    <label for="password">password</label>
    <input v-model="password" type="password" name="password" id="password" required><br/>
    <input type="submit" value="Login">
  </form>
  <a  @click="sendForgottenMail">Mot de passe oublié</a>
</template>

<script setup>
import {ref} from 'vue';
import { supabase } from '@/supabase.js';
import { user_store} from '../stores/userStore';
import router from '@/router'
const email = ref();
const password = ref();

const handleLogin = async () => {
    const { user, error } = await supabase.auth.signIn({
        email: email.value,
        password: password.value,
    })
    if(error) throw new Error(error.message);
    user_store.logged = true;
    user_store.user = user;
    router.push('/')
}

const sendForgottenMail = async () => {
  if(email.value){
    const { data, error } = await supabase.auth.api
    .resetPasswordForEmail(email.value, {redirectTo: 'http://localhost:8080/update/password'})

    if(error) throw new Error(error.message);
    console.log(data);
  }
}
</script>

<style>

</style>
