<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  setup() {
    const store = useStore()
    function clickIt(item:any) {
      console.log(item)
    }
    return {
      store,
      clickIt
    }
  },
  asyncData({ store, route }: any) {
    console.log('asyncData----', store, route)
    return store.dispatch('getRoomList')
  }
})

</script>

<template>
<div class="home-page">
  <!-- banner -->
  <div class="banner"></div>
  <!-- 房屋列表 -->
  <div class="main-wapper">
    <h2 class="title">主标题</h2>
    <p class="sub-title">副标题</p>
    <div class="home-list">
      <div class="item" @click="clickIt(item)" v-for="(item, index) in store.state.roomList" :key="index">
        <img :src="item.pictureUrl" :alt="item.title">
        <p class="title">{{ item.title }}</p>
        <p class="price">￥{{ item.price }}</p>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss">
@import "@/assets/scss/home/index.scss";
</style>
