import { saveLanguageApi } from '@/api/layout'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { fetchRoomList } from '@/api/home'
import { fetchRoomDetail } from '@/api/detail'
import { IRoomDetailParams, IRoomListParams } from '@/api/interface'

// 为store state 声明类型
export interface AllStateTypes {
  count: number,
  locale: any,
  userStatus: number,
  roomList: Array<any>,
  pageNo: number,
  pageSize: number,
  total: number,
  cityCode: string,
  roomDetail: any,
  roomId: null
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
      total: 0,
      cityCode: 'hz',
      roomDetail: {},
      roomId: null
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
      },
      setRoomDetail(state, payload) { // 设置房屋详情数据
        state.roomDetail = payload
        return state.roomDetail
      },
      setRoomId(state, payload) { // 设置房屋详情id
        state.roomId = payload
        return state.roomId
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
      getRoomList({ commit, state }, payload: IRoomListParams) {
        const { pageNo, cityCode = state.cityCode } = payload
        state.pageNo = pageNo
        const params = {
          pageNo,
          pageSize: state.pageSize,
          cityCode
        }
        return new Promise(resolve => {
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
        })
      },
      // 房屋详情接口
      getRoomDetail({ commit, state}, payload: IRoomDetailParams) {
        return new Promise(resolve => {
          fetchRoomDetail(payload).then(res => {
            const { success, result } = res
            if (success) {
              console.log('详情页数据保存到vuex中', result)
              commit('setRoomDetail', result)
              resolve(true)
            }
          })
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
