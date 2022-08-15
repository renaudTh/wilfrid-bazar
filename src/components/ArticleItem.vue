<template>
  <div class="article">
    <div class="photo" :style="{backgroundImage: `url(${url})`}">
    </div>
    <div class="texte">
      <h3>{{ article.nom }}</h3>
      <span>{{price}}</span>
      <p>{{article.description}}</p>
    </div>
   
  </div>
</template>

<script setup>
import { useArticleStore } from "@/stores/articleStore";
import {defineProps} from 'vue'
const storeArticles = useArticleStore();

const props = defineProps([
    'article'
])

const url = (props.article.image_name) ? storeArticles.getImageUrl(props.article) : "assets/image-not-found.svg";
const price = storeArticles.showPrice(props.article);
</script>

<style scoped>
.article{
  width: 100%;
  height: 80px;
  display:flex;
  flex-direction: row;
  margin:5px;
  background-color:#F7F3E3;
  width: 90%;
  cursor: pointer;
  border-radius: 5px;
  color: black;
}

.photo {
  width: 25%;
  height: 100%;
  background-size: cover;
  background-position: 0%;
  border-radius: 5px 0 0 5px;

}
.texte{
  width: 75%;
  padding-left: 5px;
  height: 100%;

}
.texte p {
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}



</style>