<template>
  <h2>{{ article.nom }}</h2>
  <DeleteArticle v-if="isLoaded" :article_id="article.id"/>
  <p>{{ article.desciption }}</p>
  <p>
    <strong v-if="isLoaded">{{ showPrice(article) }}</strong>
  </p>
</template>

<script setup>
import { supabase } from "@/supabase.js";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import DeleteArticle from "@/components/DeleteArticle.vue";

const article = ref({});
const route = useRoute();
const isLoaded = ref(false);

const getOne = async (id) => {
  let { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error);
  article.value = data;
  isLoaded.value = true;
};

const showPrice = (article) => {
  return article.prix ? article.prix + " €" : "Gratuit";
};  
onMounted(() => {
  getOne(route.params.id);
});
</script>

<style>
</style>