<template>
  <h2>{{article.nom}}</h2><p>{{article.desciption}}</p><p><strong>{{showPrice(article)}}</strong></p>
</template>

<script setup>
import { supabase } from '@/supabase.js';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'

const article = ref({})
const route = useRoute()

const getOne = async (id) => {

    let { data , error } = await supabase
    .from('articles')
    .select("*")
    .eq("id", id)
    .single()

    if(error) throw new Error(error);
    article.value = data;

}

const showPrice = (article) => {
    return (article.prix) ? article.prix+" €" : "Gratuit"
}
onMounted(() => {
    getOne(route.params.id);

})

</script>

<style>

</style>