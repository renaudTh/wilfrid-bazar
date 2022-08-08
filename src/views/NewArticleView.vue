<template >
  <h2>Ajouter un article</h2>
  <ArticleForm :update="false" @article-submitted="onAddArticle"/>
  <p v-if="loading">Loading...</p>
  <p v-if="added" class="success">Your article was successfully added</p>
</template>

<script setup>
import ArticleForm from '@/components/ArticleForm.vue';
import { ref } from 'vue';
import { supabase } from '@/supabase.js';

import { useArticleStore } from '@/stores/articleStore.js';

const loading = ref(false);
const added = ref(false);
const storeArticles = useArticleStore();

const uploadImage = async (file) => {

  if (!file) return {
    status: true,
    imageName: null
  };

  const ext = file.name.split(".").pop()
  const name = `${Math.random()}.${ext}`

  let {error: uploadError } = await supabase.storage
    .from(process.env.VUE_APP_SUPABASE_BUCKET)
    .upload(name, file)
  if (uploadError) throw new Error(uploadError.message)

  return {
    status: true,
    imageName: name,
  };

}

const onAddArticle = async (content) => {

  loading.value = true;
  let uploadOk = await uploadImage(content.file)
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