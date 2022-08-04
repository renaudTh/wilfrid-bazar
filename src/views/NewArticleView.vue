<template>
  <h2>Ajouter un article</h2>
  <form autocomplete="off" @submit.prevent="onAddArticle">
    <label for="nom">Nom de l'article : </label><br>
    <input v-model="nom" type="text" name="nom" id="nom" required><br>
    <label for="descriptions">Description</label> <br>
    <textarea type="text" @change="onChangeDescription" name="description" id="description" cols="30" rows="10"
      required></textarea><br>
    <label for="prix">prix (vide si gratuit)</label><br>
    <input v-model="prix" type="number" min="0" step="0.5" name="prix" id="prix"><br>
    <label for="image">Ajouter une image</label><br>
    <input @change="image" type="file" name="image" id="image"><br><br>
    <input type="submit" value="Ajouter un article">
  </form>
  <p v-if="added" style="color:green"> {{nom}} was succesfully added ! </p>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '@/supabase.js';

const nom = ref("");
const description = ref("");
const prix = ref(0);
const image = ref("");
const added = ref(false);

const onChangeDescription = (evt) => {
  description.value = evt.target.value;
}
const onAddArticle = async () => {

  const { error } = await supabase
    .from('articles')
    .insert([
      { nom: nom.value, desciption: description.value, prix: prix.value, categorie: 1 },
    ])
  if (error) throw new Error(error.details);
  added.value = true;


} 
</script>

<style>
</style>