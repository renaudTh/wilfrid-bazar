<template>
    <ul v-for="article in storeArticles.articles" :key="article.id">
       <ArticleItem :article="article" @click="showOne(article.id)"/>
    </ul>
</template>

<script setup>
import { onMounted} from 'vue';
import ArticleItem from './ArticleItem.vue';
import router from '@/router';
import { useArticleStore } from '@/stores/articleStore';

const storeArticles = useArticleStore();

const showOne = (id) => {
    router.push('article/'+id);
}
onMounted(() => {
   
    storeArticles.fetchAll();
     
}) 
</script>

<style>


</style>