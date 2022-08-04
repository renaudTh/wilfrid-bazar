<template>
  <div>
    {{ article.nom }}
  </div>
</template>

<script setup>

import {defineProps} from 'vue'

defineProps([
    'article'
])


</script>

<style>

</style>