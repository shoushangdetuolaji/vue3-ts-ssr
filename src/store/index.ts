import { saveLanguageApi } from '@/api/layout'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'

// 为store state 声明类型
export interface AllStateTypes {
  count: number,
  locale: any,
  userStatus: Number
}

// 定义 injection key
export const key: InjectionKey<Store<AllStateTypes>> = Symbol('storeKey')

export function useStore() {
  return baseUseStore(key)
}

export const store = createStore({
  state: {
    count: 1,
    locale: null, // 语言包
    userStatus: 0 // 登录态
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
    }
  },
  actions: {
    fetchCount({ commit, state }, payload) {
      setTimeout(() => {
        this.commit('setCount', payload)
      }, 3000)
    },
    saveLanguage({ commit, state }, language: any) {
      saveLanguageApi(language.name).then(res => {
        const { success } = res
        if (success) {
          this.commit('setLanguage', language)
          console.log('保存当前语言包成功')
        }
      })
    }
  }
})
