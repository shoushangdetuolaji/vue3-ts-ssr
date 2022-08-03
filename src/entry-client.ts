import { createApp } from './main'
import airbnb from './db' // 引入数据库和对象仓库

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.beforeEach((to, from, next) => {
  airbnb.airbnbDB.openStore({
    ...airbnb.languageObjectStore,
    ...airbnb.userObjectStore
  }).then((res: any) => {
    console.log('初始化所有对象仓库', res)
    next()
  })
})

router.isReady().then(() => {
  app.mount('#app')
})
