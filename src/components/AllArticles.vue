<template>
    <ul v-for="article in articles" :key="article.id">
       <ArticleItem :article="article" @click="showOne(article.id)"/>
    </ul>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { supabase } from '@/supabase.js';
import ArticleItem from './ArticleItem.vue';
import router from '@/router';


const articles = ref([])


const fetchAll = async () => {
    let { data: recv, error } = await supabase
    .from('articles')
    .select('*')
    if(error) throw new Error(error);
    articles.value = recv;

}

const showOne = (id) => {
    router.push('article/'+id);
}
onMounted(() => {

    fetchAll();
}) 
</script>

<style>


</style>