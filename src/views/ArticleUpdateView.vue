<template>
<h2>Mettre à jour l'article</h2>
  <ArticleForm :update="true" :content="storeArticles.getOne(route.params.id)"  @article-submitted="onUpdateArticle"/>
</template>

<script setup>
import ArticleForm from '@/components/ArticleForm.vue';
import { useArticleStore } from '@/stores/articleStore';
import { useRoute } from 'vue-router';

const storeArticles = useArticleStore();
const route = useRoute();

const onUpdateArticle = async (content) => {
  console.log(content)
  if(content.file){
    
    //delete previous image if any
    //upload image
  }
  //if upload ok
  //create article
  //Update

}

//TODO: ron refresh, fetch the article
</script>

<style>

</style>