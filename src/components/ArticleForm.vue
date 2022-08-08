<template >
  <form
    id="formulaire"
    autocomplete="off"
    @submit.prevent="$emit('article-submitted', formContent)"
  >
    <label for="nom">Nom de l'article : </label><br />
    <input
      v-model="formContent.nom"
      type="text"
      name="nom"
      id="nom"
      required
    /><br />
    <label for="categorie">Catégorie : </label><br />
    <SelectCategory
      :defaultSelected="formContent.categorie"
      @change-category="onChangeCategory"
    /><br />
    <label for="descriptions">Description</label> <br />
    <textarea
      :value="formContent.description"
      @input="onChangeDescription"
      resize="none"
      name="description"
      id="description"
      cols="30"
      rows="10"
      required
    ></textarea
    ><br />
    <label for="prix">prix</label><br />
    <input
      v-model="formContent.prix"
      type="number"
      min="0"
      step="0.5"
      name="prix"
      id="prix"
    /><br />

    <label for="image">Ajouter une image</label><br />
    <input
      @change="onChangeImage"
      type="file"
      name="image"
      id="image"
      accept=".jpg, .jpeg, .png"
      capture="camera"
    /><br /><br />
    <input type="submit" :value="showSubmitName" />
  </form>
</template>

<script setup>
import { ref, defineProps } from "vue";
import SelectCategory from "@/components/SelectCategory.vue";
const props = defineProps(["update", "content"]);

const formContent = ref({
  id: null,
  nom: null,
  description: null,
  prix: 0,
  file: null,
  categorie: null,
});

const onChangeDescription = (evt) => {
  formContent.value.description = evt.target.value;
};

const onChangeCategory = (id) => {
  formContent.value.categorie = id;
};
const onChangeImage = (evt) => {
  formContent.value.file = evt.target.files[0];
};
const showSubmitName = props.update ? `Mettre à jour` : `Ajouter un article`;

console.log(props.content)
if (props.update)
  formContent.value = {
    id: props.content.id,
    nom: props.content.nom,
    description: props.content.description,
    prix: props.content.prix,
  };

  formContent.value = {
    ...formContent.value,
    categorie: (props.content.categories) ? props.content.categories.id : null,
  };


</script>

<style>
</style>