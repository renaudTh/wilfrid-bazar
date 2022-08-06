<template >
  <h2>Ajouter un article</h2>
  <form autocomplete="off" @submit.prevent="onAddArticle">
    <label for="nom">Nom de l'article : </label><br>
    <input v-model="nom" type="text" name="nom" id="nom" required><br>
    <label for="categorie">Catégorie : </label><br>
    <SelectCategory @change-category="onChangeCategory" /><br>
    <label for="descriptions">Description</label> <br>
    <textarea type="text" @change="onChangeDescription" name="description" id="description" cols="30" rows="10"
      required></textarea><br>
    <label for="prix">prix</label><br>
    <input v-model="prix" type="number" min="0" step="0.5" name="prix" id="prix"><br>
    <label for="image">Ajouter une image</label><br>
    <input @change="onChangeImage" type="file" name="image" id="image" accept=".jpg, .jpeg, .png"
      capture="camera"><br><br>
    <input type="submit" value="Ajouter un article">
  </form>
  <p v-if="added" style="color:green"> {{ nom }} was succesfully added ! </p>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '@/supabase.js';
import SelectCategory from '@/components/SelectCategory.vue';

const nom = ref("");
const description = ref("");
const prix = ref(0);
const image = ref([]);
const added = ref(false);
const category = ref(null);

const onChangeDescription = (evt) => {
  description.value = evt.target.value;
}

const onChangeCategory = (id) => {
  category.value = id

}
const onChangeImage = (evt) => {
  image.value = evt.target.files[0];

}

const uploadImage = async () => {


  if (!image.value) return true;
  const file = image.value;
  const ext = file.name.split(".").pop()
  const fileName = `${Math.random()}.${ext}`
  const filePath = `${fileName}`

  let {data,  error: uploadError } = await supabase.storage
    .from("articles-images")
    .upload(filePath, file)
  if (uploadError) throw new Error(uploadError.message)
  console.log(data);
  const { publicURL, error } = supabase
  .storage
  .from('articles-images')
  .getPublicUrl(filePath);

  if(error) throw new Error(error.message);
  console.log(publicURL);
  return true;

}

const onAddArticle = async () => {

  const uploaded = await uploadImage();
  if (uploaded) {
    const { error } = await supabase
      .from('articles')
      .insert([
        { nom: nom.value, categorie: category.value, description: description.value, prix: prix.value },
      ])
    if (error) {
      console.log(error.message);
      throw new Error(error.details);

    }
    added.value = true;
  }



} 
</script>

<style>
</style>