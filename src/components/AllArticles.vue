<template>
    <div>
    <ArticleItem v-for="article in storeArticles.articles" :key="article.id" :article="article"
       />
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import ArticleItem from './ArticleItem.vue';
import { useArticleStore } from '@/stores/articleStore';

const storeArticles = useArticleStore();

const getArticles = async () => {

    await storeArticles.fetchAll();

}

onMounted(() => {

    getArticles();

}) 
</script>

<style scoped>
div{
    display:flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
}
</style>