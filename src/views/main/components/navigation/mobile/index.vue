<template>
  <div>我是移动端的navigation</div>
</template>

<script setup>
import { getCategory } from '@/api/category.js'
import {} from 'vue'

async function getAPI() {
  const res = await getCategory()
  console.log(res)
}
getAPI()
</script>

<style lang="scss" scoped></style>
