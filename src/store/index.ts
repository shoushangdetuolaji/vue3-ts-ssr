import { saveLanguageApi } from '@/api/layout'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { fetchRoomList } from '@/api/index'

// 为store state 声明类型
export interface AllStateTypes {
  count: number,
  locale: any,
  userStatus: Number,
  roomList: Array<any>,
  pageNo: Number,
  pageSize: Number,
  total: Number
}

// 定义 injection key
export const key: InjectionKey<Store<AllStateTypes>> = Symbol('storeKey')

export function useStore() {
  return baseUseStore(key)
}

export function createSSRStore() {
  return createStore<AllStateTypes>({
    state: {
      count: 1,
      locale: null, // 语言包
      userStatus: 0, // 登录态
      roomList: [],
      pageNo: 1,
      pageSize: 6,
      total: 0
    },
    mutations: {
      setCount(state, payload) {
        state.count += payload
        return state.count
      },
      setLanguage(state, payload) { // 设置语言包
        state.locale = payload
        return state.locale
      },
      setUserStatus(state, payload) { // 设置登录态
        state.userStatus = payload
        return state.userStatus
      },
      setRoomList(state, payload) { // 设置房屋列表数据
        state.roomList = payload
        return state.roomList
      }
    },
    actions: {
      fetchCount({ commit, state }, payload) {
        setTimeout(() => {
          commit('setCount', payload)
        }, 3000)
      },
      saveLanguage({ commit, state }, language: any) {
        saveLanguageApi(language.name).then(res => {
          const { success } = res
          if (success) {
            commit('setLanguage', language)
            console.log('保存当前语言包成功')
          }
        })
      },
      getRoomList({ commit, state }, payload) {
        const { pageNo } = payload
        state.pageNo = pageNo
        const params = {
          pageNo,
          pageSize: state.pageSize
        }
        return new Promise(resolve => {
          setTimeout(() => {
            fetchRoomList(params).then(res => {
              const { success, result } = res
              const orders = result.orders
              const total = result.total
              if (success) {
                commit('setRoomList', orders.data)
                console.log('获取当前房屋列表成功')
                console.log('保存到vuex中', orders.data)
                state.total = total
                resolve(true)
              }
            })
          }, 3000)
        })
      }
    }
  })
}

// export const store = createStore({
//   state: {
//     count: 1,
//     locale: null, // 语言包
//     userStatus: 0 // 登录态
//   },
//   mutations: {
//     setCount(state, payload) {
//       state.count += payload
//       return state.count
//     },
//     setLanguage(state, payload) { // 设置语言包
//       state.locale = payload
//       return state.locale
//     },
//     setUserStatus(state, payload) { // 设置登录态
//       state.userStatus = payload
//       return state.userStatus
//     }
//   },
//   actions: {
//     fetchCount({ commit, state }, payload) {
//       setTimeout(() => {
//         this.commit('setCount', payload)
//       }, 3000)
//     },
//     saveLanguage({ commit, state }, language: any) {
//       saveLanguageApi(language.name).then(res => {
//         const { success } = res
//         if (success) {
//           this.commit('setLanguage', language)
//           console.log('保存当前语言包成功')
//         }
//       })
//     }
//   }
// })
