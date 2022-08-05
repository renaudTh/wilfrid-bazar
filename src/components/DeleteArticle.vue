<template >
    <span @click="deleteArticle">Delete</span>
</template>

<script setup>

import { supabase } from '@/supabase.js';
import { defineProps } from 'vue';
import router from'@/router'

const props = defineProps([
    'article_id'
])

const deleteArticle = async () => {

    let isOk = confirm("Do you really want to delete ?")
    if (isOk) {
        const { error } = await supabase
            .from('articles')
            .delete()
            .eq('id', props.article_id)

        if (error) throw new Error(error);
        alert("Article well deleted");
        router.push('/')
    }


}
</script>

<style scoped>
span {
    padding: 10px;
    background-color: rgb(200, 0, 0);
    border-radius: 10px;
    color: white;
    cursor: pointer;
}

span:hover {
    background-color: rgb(180, 0, 0);
}
</style>