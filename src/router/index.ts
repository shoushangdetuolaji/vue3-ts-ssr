// import home from '@/views/home/index.vue'
// import mine from '@/views/mine/index.vue'
// import login from '@/views/login/index.vue'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'

const home = () => import('@/views/home/homeIndex.vue')
const mine = () => import('@/views/mine/mineIndex.vue')
const login = () => import('@/views/login/loginIndex.vue')
const roomDetail = () => import('@/views/detail/roomIndex.vue')
const record = () => import('@/views/record/recordIndex.vue')

const routes = [
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      title: '',
      keepAlive: false
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: mine,
    meta: {
      title: '',
      keepAlive: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '',
      keepAlive: false
    }
  },
  {
    path: '/roomDetail/:id',
    name: 'roomDetail',
    component: roomDetail,
    meta: {
      title: '爱此迎-',
      keepAlive: false
    }
  },
  {
    path: '/records',
    name: 'records',
    component: record,
    meta: {
      title: '',
      keepAlive: false
    }
  }
]

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

// export default router

export function createSSRRouter() {
  return createRouter({
    // 在客户端渲染使用createWebHistory方法
    // 在服务端需要使用createMemoryHistory方法
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}
