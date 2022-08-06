<template>
  <h2>{{ article.nom }}</h2>
  <DeleteArticle v-if="isLoaded && user_store.user" :article="article" /> <br><br>
  <img v-if="isLoaded && imageUrl" :src="imageUrl" alt="hello"><br>
  <p>{{ article.description }}</p>
  <p>
    <strong v-if="isLoaded">{{ showPrice(article) }}</strong>
  </p>
</template>

<script setup>
import { supabase } from "@/supabase.js";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { user_store } from "@/stores/userStore.js";
import DeleteArticle from "@/components/DeleteArticle.vue";

const article = ref({});
const route = useRoute();
const isLoaded = ref(false);
const imageUrl = ref();
const getOne = async (id) => {
  let { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error);
  article.value = data;
  isLoaded.value = true;
   getImageUrl();
};

const showPrice = (article) => {
  return (article.prix > 0) ? article.prix + " €" : "Gratuit";
};

const getImageUrl = async () => {
  if (article.value.image_name) {
    const { publicURL, error } = await supabase
      .storage
      .from(process.env.VUE_APP_SUPABASE_BUCKET)
      .getPublicUrl(article.value.image_name);

      if(error) throw new Error(error.message);
      imageUrl.value = publicURL;
  }


}
onMounted(() => {
  getOne(route.params.id);

});
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