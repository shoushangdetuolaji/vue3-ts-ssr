<script setup lang="ts">
import { IRoomListParams } from '@/api/interface'
import { useStore } from '@/store'
import { ref } from 'vue'
const store = useStore()
const cityCode = ref(store.state.cityCode)
const cityArr = [{
  cityCode: 'hz',
  cityName: '杭州'
}, {
  cityCode: 'sh',
  cityName: '上海'
}, {
  cityCode: 'nj',
  cityName: '南京'
}, {
  cityCode: 'cd',
  cityName: '成都'
}, {
  cityCode: 'cq',
  cityName: '重庆'
}, {
  cityCode: 'bj',
  cityName: '北京'
}, {
  cityCode: 'sz',
  cityName: '苏州'
}]

function cityClick(tab: any) {
  console.log(tab)
  const { name } = tab.props
  cityCode.value = name
  store.dispatch('getRoomList', {
    pageNo: 1,
    cityCode: name
  } as IRoomListParams)
}
</script>
<template>
  <!-- 城市筛选 -->
  <el-tabs v-model="cityCode" @tab-click="cityClick" type="card">
    <el-tab-pane v-for="(item, index) in cityArr" :key="index" :label="item.cityName" :name="item.cityCode"></el-tab-pane>
  </el-tabs>
</template>
