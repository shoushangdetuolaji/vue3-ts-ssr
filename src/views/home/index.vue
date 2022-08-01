<script setup lang="ts">
import { useRouter } from 'vue-router'
import { h, getCurrentInstance } from 'vue'
import { fetchRoomList, fetchElephant } from '../../api/index'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'

const { t } = useI18n()
console.log(useI18n)
const router = useRouter()
const store = useStore()

const { proxy }: any = getCurrentInstance() // 用proxy来代替this

proxy.$message({
  message: h('p', null, [
    h('span', null, 'Message can be '),
    h('i', { style: 'color: teal' }, 'VNode')
  ])
})

// 真实接口
function getRoomList() {
  fetchRoomList().then(res => {
    console.log('fetchRoomList', res)
  })
}
getRoomList()

// Mock接口
function getElephant() {
  fetchElephant().then(res => {
    console.log('fetchElephant', res)
  })
}
getElephant()

function setMutataion() {
  store.commit('setCount', 2)
}

function setAction() {
  store.dispatch('fetchCount', 10)
}

</script>

<template>
  <div class="home">
    {{ t('message.home')}}
    <el-button @click="setMutataion">mutataion</el-button>
     <el-button  @click="setAction">action</el-button>
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
