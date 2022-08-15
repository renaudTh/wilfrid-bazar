<template>
  <h2>Mettre à jour l'article</h2>
  <ArticleForm
    :update="true"
    :content="article"
    @article-submitted="onUpdateArticle"
  />
</template>

<script setup>
import ArticleForm from "@/components/ArticleForm.vue";
import { useArticleStore } from "@/stores/articleStore";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { supabase } from '@/supabase.js';

const storeArticles = useArticleStore();
const route = useRoute();
const article = ref(null);

article.value = storeArticles.getOne(route.params.id);

const onUpdateArticle = async (content) => {
  let upload = {status: true, imageName: null}
  console.log(content)
  if (content.file) {
    if (article.value.image_name) {
      deleteImage(article.value.image_name);
    }
  upload = storeArticles.uploadImage(content.file);
  }
  if (upload.status) {
    let article = {
      nom: content.nom,
      categorie: content.categorie,
      prix: content.prix,
      description: content.description,
      image_name: upload.imageName,
    };
    const { data, error } = await supabase
      .from("articles")
      .update(article)
      .match({ id: content.id });
      if(error) throw new Error(error.message)
      console.log(data);
  }

};

const deleteImage = async (name) => {
  if (name) {
    const { result, error } = await supabase.storage
      .from(process.env.VUE_APP_SUPABASE_BUCKET)
      .remove([name]);
    if (error) throw new Error(error.message);
    return result;
  }
  return true;
};

//TODO: ron refresh, fetch the article
</script>

<style>
</style>