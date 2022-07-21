<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { h, getCurrentInstance } from 'vue'
import { fetchRoomList } from '../../api/index'
const router = useRouter()
const route = useRoute()
console.log(route.params)

const { proxy }: any = getCurrentInstance() // 用proxy来代替this

proxy.$message({
  message: h('p', null, [
    h('span', null, 'Message can be '),
    h('i', { style: 'color: teal' }, 'VNode')
  ])
})

const getRoomList = () => {
  fetchRoomList()
}
getRoomList()
</script>

<template>
  <div class="home">
    首页
    <button @click="() => router.push({ path: '/mine', query: {id: 1}})">跳转个人中心</button>
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <div class="text">十大阿三大苏打十大阿三大苏打十大阿三大苏打十大阿三大苏打十大阿三大苏打十大阿三大苏打十大阿三大苏打十大阿三大苏打十大阿三大苏打</div>
    <el-date-picker
      type="week"
      format="[Week] ww"
      placeholder="Pick a week"
    />
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/home/index.scss";
</style>
