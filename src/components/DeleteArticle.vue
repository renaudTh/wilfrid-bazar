<template >
    <span @click="onDeleteArticle">Delete</span>
</template>

<script setup>


import { defineProps } from 'vue';
import router from '@/router'
import { useArticleStore } from '@/stores/articleStore.js';

const props = defineProps([
    'article'
])
const storeArticles = useArticleStore();
const onDeleteArticle = async () => {
    storeArticles.deleteArticle(props.article);
    router.push('/')
}
</script>

<style scoped>
span {
    padding: 10px;
    background-color: rgb(200, 0, 0);
    border-radius: 5px;
    color: white;
    cursor: pointer;
}

span:hover {
    background-color: rgb(180, 0, 0);
}
</style>