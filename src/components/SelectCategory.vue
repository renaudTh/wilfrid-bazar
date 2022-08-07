<template>
  <select v-model="selected" @change="$emit('change-category', selected)" name="category" id="category">
   <option :value="null"></option>
   <option v-for="category in storeCategories.categories" :key="category.id" :value="category.id">{{category.nom}}</option>
  </select>

</template>

<script setup>
import {onMounted, ref} from 'vue';
import { useCategoriesStore } from '@/stores/categoriesStore.js';

const selected = ref(null);
const storeCategories = useCategoriesStore();


onMounted(() => {
  if(storeCategories.categories.length == 0)
  storeCategories.fetchAll();
    
})
</script>

<style>

</style>