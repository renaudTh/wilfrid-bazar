<template>
    <nav>
    <router-link class="link" to="/"><i class="fa-solid fa-house"></i></router-link> 
    <router-link class="link" to="/about"><i class="fa-solid fa-circle-info"></i></router-link> 
    <router-link class="link" v-if="!storeUser.user" to="/login"><i class="fa-solid fa-user"></i></router-link>
    <a class="link" v-if="storeUser.user" @click="logout"><i class="fa-solid fa-arrow-right-from-bracket"></i></a>
    <router-link class="link" v-if="storeUser.user" to="/articles/new"><i class="fa-solid fa-circle-plus"></i></router-link>
  </nav>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { useArticleStore } from '@/stores/articleStore'
import router from '@/router/index.js';

const storeUser = useUserStore()
const storeArticles = useArticleStore()

const logout = async () => {
  storeUser.signOut();
  storeArticles.$reset();
  router.push('/')
}
</script>

<style scoped>
nav {
    display:flex;
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: center;
}

.link{
    color: white;
    margin: 10px;
}
.link i{
    font-size: 30px;
}
</style>