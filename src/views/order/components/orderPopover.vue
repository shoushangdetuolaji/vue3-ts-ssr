<script setup lang="ts">
import { fetchOrderApi } from '@/api/order'
import { getCurrentInstance, reactive } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

// const count = ref(0)
// function fetchApi() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       count.value = 6
//       resolve(true)
//     }, 3000)
//   })
// }
// await fetchApi()
let orderData = reactive<Array<any>>([])
const { proxy }: any = getCurrentInstance()
const store = useStore()
const router = useRouter()

// 房屋订单中心列表
function fetchOrder() {
  return fetchOrderApi().then((res) => {
    console.log(res)
    const { result, success, message } = res
    if (success) {
      console.log('成功')
      orderData = result
    } else {
      proxy.$message.error(message)
    }
  })
}

if (store.state.userStatus) {
  await fetchOrder()
} else {
  const { pathname } = window.location
  router.replace({
    path: '/login',
    query: {
      redirect: pathname
    }
  })
  closeMask()
}

await fetchOrder()

// 关闭遮罩层popover
function closeMask() {
  store.commit('setOrderVisible', false)
}

function toDetail(item: any) {
  const { orderId: id } = item
  router.push({
    path: `/roomDetail/${id}`
  })
  store.commit('setRoomId', id)
}

</script>

<template>
  <Teleport to="#app">
    <div class="mask" @click="closeMask"></div>
  </Teleport>
  <ul v-if="orderData.length > 0">
    <li v-for="(item, index) in orderData" :key="index" @click="toDetail(item)">
      <img :src="item.pictureUrl" alt="">
      <div class="mess">
        <p class="title">{{ item.title }}</p>
        <p class="info">{{ item.price }}/晚 * {{ item.personNumber }}个人</p>
      </div>
    </li>
  </ul>
  <div v-else class="loading-block">
    空空如也也~
  </div>
</template>

<style scoped lang="scss">
ul {
  @include placeholder-order;
}
li {
  @include flex-layout(row, space-between, center);
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  &:last-child {
    border-bottom: none;
  }
  img {
    width: 65px;
    height: 45px;
    border-radius: 4px;
    margin-right: 5px;
    object-fit: cover;
  }
  .mess {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 5px;
    width: 100px;
    overflow: hidden;
    p {
      line-height: 16px;
      font-weight: normal;
      margin: 5px 0;
      max-width: 100px;
    }
    .title {
      font-weight: bold;
      color: #333;
      font-size: 14px;
      display: inline-block;
      @include line-text-overflow;
    }
    .info {
      color: #666;
      font-size: 12px;
    }
  }
}
</style>
