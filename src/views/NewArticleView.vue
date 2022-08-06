<template >
  <h2>Ajouter un article</h2>
  <form id="formulaire" autocomplete="off" @submit.prevent="onAddArticle">
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
    <span v-if="loading">Loading...</span>
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
const image = ref(null);
const fileName = ref(null);
const added = ref(false);
const category = ref(null);
const loading = ref(false);

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
  fileName.value = `${Math.random()}.${ext}`

  let {error: uploadError } = await supabase.storage
    .from(process.env.VUE_APP_SUPABASE_BUCKET)
    .upload(fileName.value, file)
  if (uploadError) throw new Error(uploadError.message)

  return true;

}

const onAddArticle = async (event) => {
  loading.value = true;
  const uploaded = await uploadImage();
  if (uploaded) {
    const { error } = await supabase
      .from('articles')
      .insert([
        { nom: nom.value, categorie: category.value, description: description.value, prix: prix.value, image_name: fileName.value},
      ])
    if (error) {
      console.log(error.message);
      throw new Error(error.details);

    }
    added.value = true;
  }
  loading.value = false;
  setTimeout(() => {
    event.target.reset()
    nom.value = null
    prix.value = 0
    added.value = false;

  }, 1500);
} 

</script>

<style>
</style>