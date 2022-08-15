<template >
  <h2>Ajouter un article</h2>
  <ArticleForm :update="false" :content="null" @article-submitted="onAddArticle"/>
  <p v-if="loading">Loading...</p>
  <p v-if="added" class="success">Your article was successfully added</p>
</template>

<script setup>
import ArticleForm from '@/components/ArticleForm.vue';
import { ref } from 'vue';

import { useArticleStore } from '@/stores/articleStore.js';

const loading = ref(false);
const added = ref(false);
const storeArticles = useArticleStore();

const onAddArticle = async (content) => {

  loading.value = true;
  let uploadOk = await storeArticles.uploadImage(content.file)
  if(uploadOk.status){
    let article = {
      nom : content.nom,
      categorie: content.categorie,
      prix: content.prix,
      description: content.description,
      image_name: uploadOk.imageName
    }
    storeArticles.addArticle(article);
    loading.value = false;
    added.value = true;
 }
}
</script>

<style scoped>
.success{
  color: green;
}
</style>