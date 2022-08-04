<template>
  <li>
    {{ article.nom }}
  </li>
</template>

<script setup>

import {defineProps} from 'vue'

defineProps([
    'article'
])


</script>

<style scoped>
  li{
    cursor: pointer;
  }
</style>