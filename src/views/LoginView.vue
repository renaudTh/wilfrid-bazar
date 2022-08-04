<template>
  <form  @submit.prevent="handleLogin">
    <label for="email">email</label>
    <input v-model="email" type="email" name="email" required><br>
    <label for="password">password</label>
    <input v-model="password" type="password" name="password" id="password"><br/>
    <input type="submit" value="Login">
  </form>
</template>

<script setup>
import {ref} from 'vue';
import { supabase } from '@/supabase.js';
const email = ref();
const password = ref();

const handleLogin = async () => {
    const { user, session, error } = await supabase.auth.signIn({
        email: email.value,
        password: password.value,
    })
    if(error) throw new Error(error);
    console.log(user, session);
}
</script>

<style>

</style>