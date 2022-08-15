<template >
    <div @click="onDeleteArticle"><i class="fa-solid fa-trash-can"></i></div>
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
div {
    padding: 5px;
    border-radius: 5px;
    color: rgb(200, 0, 0);;
    cursor: pointer;
    font-size: 18px;
    text-align: center;
}

div:hover {
    background-color: rgb(180, 0, 0);
    color: #F7F3E3;
}
</style>