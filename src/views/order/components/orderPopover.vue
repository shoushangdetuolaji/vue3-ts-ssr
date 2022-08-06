<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)

function fetchApi() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      count.value = 6
      resolve(true)
    }, 3000)
  })
}
await fetchApi()
</script>

<template>
  <ul>
    <li v-for="i in 6" :key="i">
      <img src="https://oss.dalieyingcai.com/static/temp/cdn-airbnb/images/1/1.jpg" alt="">
      <div class="item">
        <p class="title">北京四合院</p>
        <p class="info">234/晚 * 1个人</p>
      </div>
    </li>
  </ul>
</template>

<style scoped>
</style>