import { createSSRApp } from 'vue'
import App from './App.vue'
import { createSSRRouter } from './router'
import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import { createSSRI18n } from './language/i18n'
import airbnb from './db' // 引入数据库和对象仓库
import { createSSRStore, key } from './store'

// router.beforeEach((to, from, next) => {
//   airbnb.airbnbDB.openStore({
//     ...airbnb.languageObjectStore,
//     ...airbnb.userObjectStore
//   }).then((res: any) => {
//     console.log('初始化所有对象仓库', res)
//     next()
//   })
// })

// const app = createApp(App)
// app.config.globalProperties.$message = ElMessage
// app.use(store, key)
// app.use(router)
// app.use(ElementPlus)
// app.use(i18n)
// app.mount('#app')
// createApp(App).mount('#app')  可以拆分

export function createApp() {
  const app = createSSRApp(App)
  const store = createSSRStore()
  const router = createSSRRouter()
  const i18n = createSSRI18n()

  router.beforeEach((to, from, next) => {
    airbnb.airbnbDB.openStore({
      ...airbnb.languageObjectStore,
      ...airbnb.userObjectStore
    }).then((res: any) => {
      console.log('初始化所有对象仓库', res)
      next()
    })
  })

  app.config.globalProperties.$message = ElMessage
  app.use(store, key)
  app.use(router)
  app.use(ElementPlus)
  app.use(i18n)
  return {
    app,
    router,
    store
  }
  // app.mount('#app')
}
