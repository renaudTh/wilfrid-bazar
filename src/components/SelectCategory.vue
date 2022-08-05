<template>
  <select v-model="selected" @change="$emit('change-category', selected)" v-if="loaded" name="category" id="category">
   <option value=""></option>
   <option v-for="category in categories" :key="category.id" :value="category.id">{{category.nom}}</option>
  </select>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import { supabase } from '@/supabase.js';
const categories = ref([]);
const loaded = ref(false);
const selected = ref(null);

const fetchCategories = async () => {
    let { data, error } = await supabase
    .from('categories')
    .select('*')
    if(error) throw new Error(error);
    categories.value = data;
    loaded.value = true;
}

onMounted(() => {
    fetchCategories();
})
</script>

<style>

</style>