<template>
<h2>Ajouter un article</h2>
  <form autocomplete="off" @submit.prevent="onAddArticle"> 
    <label for="nom">Nom de l'article : </label><br>
    <input v-bind="nom" type="text" name="nom" id="nom" required><br>
    <label  for="descriptions">Description</label> <br>
    <textarea v-bind="description" name="description" id="description" cols="30" rows="10" required></textarea><br>
    <label v-bind="prix" for="prix">prix (vide si gratuit)</label><br>
    <input type="number" name="prix" id="prix"><br>
    <label for="image">Ajouter une image</label><br>
    <input v-bind="image" type="file" name="image" id="image"><br><br>
    <input type="submit" value="Ajouter un article">
  </form>
</template>

<script setup>
import { ref } from 'vue';
const nom = ref("");
const description = ref("");
const prix = ref("");
const image = ref("");

const onAddArticle = async () => {

    console.log(nom.value, description.value, prix.value, image.value);

} 
</script>

<style>

</style>