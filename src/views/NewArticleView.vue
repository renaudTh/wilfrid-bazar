<template >
  <h2>Ajouter un article</h2>
  <form id="formulaire" autocomplete="off" @submit.prevent="onAddArticle">
    <label for="nom">Nom de l'article : </label><br>
    <input v-model="article.nom" type="text" name="nom" id="nom" required><br>
    <label for="categorie">Catégorie : </label><br>
    <SelectCategory @change-category="onChangeCategory" /><br>
    <label for="descriptions">Description</label> <br>
    <textarea type="text" @change="onChangeDescription" name="description" id="description" cols="30" rows="10"
      required></textarea><br>
    <label for="prix">prix</label><br>
    <input v-model="article.prix" type="number" min="0" step="0.5" name="prix" id="prix"><br>
    <label for="image">Ajouter une image</label><br>
    <input @change="onChangeImage" type="file" name="image" id="image" accept=".jpg, .jpeg, .png"
      capture="camera"><br><br>
    <input type="submit" value="Ajouter un article">
    <span v-if="loading">Loading...</span>
  </form>
  <p v-if="added" style="color:green"> {{ article.nom }} was succesfully added ! </p>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '@/supabase.js';
import SelectCategory from '@/components/SelectCategory.vue';
import { useArticleStore } from '@/stores/articleStore.js';

const article = ref({
  nom: null,
  description: null,
  prix: 0,
  image_name: null,
  categorie: null,

})

const image = ref(null);
const added = ref(false);
const loading = ref(false);

const storeArticles = useArticleStore();

const onChangeDescription = (evt) => {
  article.value.description = evt.target.value;
}

const onChangeCategory = (id) => {
   article.value.categorie = id

}
const onChangeImage = (evt) => {
  image.value = evt.target.files[0];

}

const uploadImage = async () => {


  if (!image.value) return true;
  const file = image.value;
  const ext = file.name.split(".").pop()
  article.value.image_name = `${Math.random()}.${ext}`

  let {error: uploadError } = await supabase.storage
    .from(process.env.VUE_APP_SUPABASE_BUCKET)
    .upload(article.value.image_name, file)
  if (uploadError) throw new Error(uploadError.message)

  return true;

}

const onAddArticle = async (event) => {
  loading.value = true;
  const uploaded = await uploadImage();
  if (uploaded) {
    storeArticles.addArticle(article.value)
    added.value = true;
  }
  loading.value = false;
  setTimeout(() => {
    event.target.reset()
    article.value = {};

  }, 1500);
} 

</script>

<style>
</style>