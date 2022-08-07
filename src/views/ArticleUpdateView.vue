<template>
<h2>Mettre à jour l'article</h2>
  <ArticleForm :update="true" :content="storeArticles.getOne(route.params.id)" />
</template>

<script setup>
import ArticleForm from '@/components/ArticleForm.vue';
import { useArticleStore } from '@/stores/articleStore';
import { useRoute } from 'vue-router';

const storeArticles = useArticleStore();
const route = useRoute();

</script>

<style>

</style>