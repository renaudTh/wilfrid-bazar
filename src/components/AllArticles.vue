<template>
    <ul v-for="article in articles" :key="article.id">
       <ArticleItem :article="article" @click="showOne(article.id)"/>
    </ul>
</template>

<script setup>
import { onMounted, ref} from 'vue';
import ArticleItem from './ArticleItem.vue';
import router from '@/router';
import { useArticleStore } from '@/stores/articleStore';

const storeArticles = useArticleStore();
const articles = ref([]);

const showOne = (id) => {
    router.push('article/'+id);
}

const getArticles = async () => {
        if(storeArticles.articles.length == 0){
           await storeArticles.fetchAll();
        }
        articles.value = storeArticles.articles;
    }

onMounted(() => {

    getArticles();
    
}) 
</script>

<style>


</style>