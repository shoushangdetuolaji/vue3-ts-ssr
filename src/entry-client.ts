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
  router.beforeResolve((to, from, next) => {
    const toComponents = router.resolve(to).matched.flatMap(record => Object.values(record.components))

    const fromComponents = router.resolve(from).matched.flatMap(record => Object.values(record.components))

    const actived = toComponents.filter((c, i) => {
      return fromComponents[i] !== c
    })

    if (!actived.length) {
      return next()
    }
    console.log('开始loading....')
    Promise.all(actived.map((Component: any) => {
      if (Component.asyncData) {
        return Component.asyncData({
          store,
          route: router.currentRoute
        })
      }
    })).then(() => {
      console.log('结束loading....')
      next()
    })
  })
  app.mount('#app')
})
