<script setup lang="ts">
import { useRouter } from 'vue-router'
import { h, getCurrentInstance } from 'vue'
import { fetchRoomList } from '../../api/index'
import { useI18n } from 'vue-i18n'
import IndexedDB from '../../utils/indexedDB'

const { t } = useI18n()
console.log(useI18n)
const router = useRouter()

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

// 数据库线相关操作
const airbnbDB = new IndexedDB('airbnb')
airbnbDB.openStore('elephant', 'id', ['nose', 'ear'])

// 增和改
function addDB(storeName: string) {
  // 增
  // airbnbDB.updateItem(storeName, {
  //   nose: '33m',
  //   ear: '比较大'
  // })
  // 改
  airbnbDB.updateItem(storeName, {
    id: 1,
    nose: '44m',
    ear: '比较小'
  })
}

// 删除
function deleteDB(storeName: string, key: number | string) {
  airbnbDB.deleteItem(storeName, key)
}

// 查询所有数据
function getObjectStore(storeName: string) {
  airbnbDB.getList(storeName)
}

// 查询某一条数据
function getObjectStoreItem(storeName: string, key: number | string) {
  airbnbDB.getItem(storeName, key)
}

</script>

<template>
  <div class="home">
    {{ t('message.home')}}
    <el-button @click="addDB('elephant')">增/改</el-button>
    <el-button @click="deleteDB('elephant', 2)">删除</el-button>
    <el-button @click="getObjectStore('elephant')">查询所有数据</el-button>
    <el-button @click="getObjectStoreItem('elephant', 1)">查询某一条数据</el-button>
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
