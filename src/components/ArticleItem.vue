<template>
  <div class="article">
    <div @click="showOne(article.id)" class="photo" :style="{backgroundImage: `url(${url})`}">
    </div>
    <div   @click="showOne(article.id)" class="texte">
      <h3>{{ article.nom }}</h3>
      <span>{{price}}</span>
      <p>{{article.description}}</p>
    </div>
    <div v-if="storeUser.user" class="modify">
      <DeleteArticle :article="article"/>
      <router-link class="update" :to="`/article/update/${article.id}`"><i class="fa-solid fa-file-pen"></i></router-link>
    </div>
  </div>
</template>

<script setup>
import { useArticleStore } from "@/stores/articleStore";
import { useUserStore } from "@/stores/userStore";
import router from '@/router';
import {defineProps} from 'vue'
import DeleteArticle from "./DeleteArticle.vue";
const storeArticles = useArticleStore();
const storeUser = useUserStore();
const props = defineProps([
    'article'
])

const url = (props.article.image_name) ? storeArticles.getImageUrl(props.article) : "assets/image-not-found.svg";
const price = storeArticles.showPrice(props.article);

const showOne = (id) => {
    router.push('article/' + id);
}
</script>

<style scoped>
.article{
  width: 100%;
  height: 100px;
  display:flex;
  flex-direction: row;
  margin:5px;
  background-color:#F7F3E3;
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
  color:#F7F3E3;

}
.texte{
  width: 65%;
  padding: 0px 5px 0px 5px;
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
.texte h3{
    overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.modify{
  width: 10%;
  height: 100%;
  display:flex;
  flex-direction: column;
  color:black;
  justify-content: center;

}
.update{
  display:block;
  padding: 5px;
  font-size: 18px;
  color: #8661c1;
  text-align: center;
  width: 100%;
}
.update:hover{
  color:#F7F3E3;
  background-color: #8661c1;
  border-radius: 5px;
}


</style>