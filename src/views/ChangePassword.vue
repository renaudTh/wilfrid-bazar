<template>
  Change password :
  <form @submit.prevent="onChangePassword">
    <input v-model="password" type="password">
    <input  type="submit" value="Change password">
  </form>
</template>

<script setup>
import { user_store } from '@/stores/userStore.js';
import { ref } from 'vue';
import { supabase } from '@/supabase.js';
const password = ref()


const onChangePassword = async () => {
    const { error } = await supabase.auth.api
      .updateUser(user_store.session.access_token, { password : password.value })
    if(error) throw new Error(error.message)
}   


</script>


<style>

</style>