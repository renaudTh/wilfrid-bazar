<template>
  <h2>{{article.nom}}</h2>
  <span>{{storeArticles.showCategory(article)}}</span><br><br>
  <DeleteArticle v-if="storeUser.user" :article="article" /> <br><br>
  <img v-if="imageUrl" :src="imageUrl" :alt="article.nom"><br>

  <p>{{ article.description }}</p>
  <p>
    <strong>{{ storeArticles.showPrice(article) }}</strong>
  </p>
</template> 

<script setup>

import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore.js";
import DeleteArticle from "@/components/DeleteArticle.vue";
import { useArticleStore } from '@/stores/articleStore';
import { onBeforeMount, ref } from "@vue/runtime-core";
import router  from '@/router'

const storeArticles = useArticleStore();
const storeUser = useUserStore();

const route = useRoute();
const article = ref({})
const imageUrl = ref(null) 

const getArticle = async () => {
  
  let foundInStore = storeArticles.getOne(route.params.id)
  if(!foundInStore){
    let found = await storeArticles.fetchOne(route.params.id);
    if(!found){
      router.push('/404')
    }
    else article.value = found
  }
  else {
    article.value = foundInStore
  }
  imageUrl.value = storeArticles.getImageUrl(article.value);
    
}
onBeforeMount(() => {
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