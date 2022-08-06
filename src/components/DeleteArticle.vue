<template >
    <span @click="deleteArticle">Delete</span>
</template>

<script setup>

import { supabase } from '@/supabase.js';
import { defineProps } from 'vue';
import router from '@/router'

const props = defineProps([
    'article'
])

const deleteArticle = async () => {

    let isOk = confirm(`Do you really want to delete "${props.article.nom}" ?`)
    if (isOk) {
        const {data:article , error } = await supabase
            .from('articles')
            .delete()
            .eq('id', props.article.id)

        if (error) throw new Error(error.message);
        if(article == 0){
            alert(`You don't have permission to delete "${props.article.nom}"`)
            router.push('/') 
        }
        if (props.article.image_name) {
            const { error } = await supabase
                .storage
                .from(process.env.VUE_APP_SUPABASE_BUCKET)
                .remove([props.article.image_name])
            if (error) throw new Error(error.message)

        }
        alert(`"${props.article.nom}" successfully deleted`)
        router.push('/') 
  
    }
}
</script>

<style scoped>
span {
    padding: 10px;
    background-color: rgb(200, 0, 0);
    border-radius: 5px;
    color: white;
    cursor: pointer;
}

span:hover {
    background-color: rgb(180, 0, 0);
}
</style>