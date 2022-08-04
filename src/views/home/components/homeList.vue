<script setup lang="ts">
import { useStore } from '@/store'
import Pagination from '@/components/common/pagination.vue'

const store = useStore()
function clickIt(item: any) {
  console.log(item)
}
</script>

<template>
  <div class="home-list">
    <div class="item" @click="clickIt(item)" v-for="(item, index) in store.state.roomList" :key="index">
      <img :src="item.pictureUrl" :alt="item.title">
      <p class="title">{{ item.title }}</p>
      <p class="price">￥{{ item.price }}</p>
    </div>
  </div>
  <!-- 分页 -->
  <Pagination />
</template>

<style scoped>
</style>