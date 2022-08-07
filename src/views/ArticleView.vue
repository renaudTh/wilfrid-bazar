<template>
  <h2>{{article.nom}}</h2>
  <span>{{storeArticles.showCategory(article)}}</span><br><br>
  <DeleteArticle v-if="user_store.user" :article="article" /> <br><br>
  <img v-if="imageUrl" :src="imageUrl" :alt="article.nom"><br>

  <p>{{ article.description }}</p>
  <p>
    <strong>{{ storeArticles.showPrice(article) }}</strong>
  </p>
</template> 

<script setup>

import { useRoute } from "vue-router";
import { user_store } from "@/stores/userStore.js";
import DeleteArticle from "@/components/DeleteArticle.vue";
import { useArticleStore } from '@/stores/articleStore';
import { onMounted, ref } from "@vue/runtime-core";


const storeArticles = useArticleStore();

const route = useRoute();
const article = ref({})
const imageUrl = ref(null) 

const getArticle = async () => {
  
  let found = storeArticles.getOne(route.params.id)
  if(!found){
    article.value = await storeArticles.fetchOne(route.params.id);
  }
  else {
    article.value = found
  }
  imageUrl.value = storeArticles.getImageUrl(article.value);
    
}
onMounted(() => {
  getArticle();
})


</script>

<style scoped>
@media screen and (max-width: 480px) {
img{
  max-width: 100%;
}
}
@media screen and (min-width: 480px) {
img{
  max-width: 300px;
}
}

</style>