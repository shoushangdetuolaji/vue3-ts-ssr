<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import HomeList from './components/homeList.vue'

export default defineComponent({
  components: {
    HomeList
  },
  setup() {
    const store = useStore()
    return {
      store
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
    <!-- 城市筛选 -->
    <HomeList />
  </div>
</div>
</template>

<style lang="scss">
@import "@/assets/scss/home/index.scss";
</style>
