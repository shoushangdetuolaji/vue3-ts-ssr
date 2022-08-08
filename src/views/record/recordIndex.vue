<script setup lang="ts">
import { fetchRecordApi } from '@/api/record'
import { getCurrentInstance, ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

const recordData = ref()
const { proxy }: any = getCurrentInstance()
const store = useStore()
const router = useRouter()
function fetchRecord() {
  fetchRecordApi().then(res => {
    const { success, message, result } = res
    if (success) {
      recordData.value = result
      console.log(result)
    } else {
      proxy.$message.error(message)
    }
  })
}

onMounted(() => {
  if (store.state.userStatus) {
    fetchRecord()
  } else {
    const { pathname } = window.location
    router.replace({
      path: '/login',
      query: {
        redirect: pathname
      }
    })
  }
})

function toDetail(item: any) {
  const { recordId: id } = item
  router.push({
    path: `/roomDetail/${id}`
  })
  store.commit('setRoomId', id)
  console.log(item)
}
</script>

<template>
  <div class="record-page">
    <div class="main-wrapper">
      <div class="column-style">
        <div class="item" v-for="(item, index) in recordData" :key="index" @click="toDetail(item)">
          <el-image :src="item.pictureUrl" :alt="item.title"></el-image>
          <p class="title">{{ item.title }}</p>
          <p class="price">￥{{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.record-page {
  .main-wrapper {
    @include main-wapper(30px);
    .column-style {
      column-count: 3;
      .item {
        width: 315px;
        overflow: hidden;
        margin-bottom: 25px;
        cursor: pointer;
        text-align: left;
        display: inline-block;
        img {
          width: 315px;
          height: auto;
          border-radius: 4px;
        }
        .title {
          width: 315px;
          font-size: 18px;
          margin: 15px 0px;
          font-weight: bold;
        }
        .price {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
