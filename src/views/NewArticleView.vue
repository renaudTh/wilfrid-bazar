<template >
  <h2>Ajouter un article</h2>
  <ArticleForm :update="false" @article-submitted="onAddArticle"/>
</template>

<script setup>
import ArticleForm from '@/components/ArticleForm.vue';


//TOdo: Create fileName if any file
//TODO: Upload file if any
//TODO: create object to be added
//TODO: Add object in DB
//import { ref } from 'vue';
//import { supabase } from '@/supabase.js';

//import { useArticleStore } from '@/stores/articleStore.js';



//const storeArticles = useArticleStore();


/*
const uploadImage = async () => {

  if (!image.value) return true;
  const file = image.value;
  const ext = file.name.split(".").pop()
  article.value.image_name = `${Math.random()}.${ext}`

  let {error: uploadError } = await supabase.storage
    .from(process.env.VUE_APP_SUPABASE_BUCKET)
    .upload(article.value.image_name, file)
  if (uploadError) throw new Error(uploadError.message)

  return true;

}*/

const onAddArticle = async (content) => {

  console.log(content)

 /* loading.value = true;
  const uploaded = await uploadImage();
  if (uploaded) {
    storeArticles.addArticle(article.value)
    added.value = true;
  }
  loading.value = false;
  setTimeout(() => {
    event.target.reset()
    article.value = {};

  }, 1500);*/
} 

</script>

<style>
</style>