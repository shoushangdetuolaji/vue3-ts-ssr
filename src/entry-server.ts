import { createApp } from './main'
import { renderToString } from 'vue/server-renderer'

export async function render(url: string) {
  const { app, router, store } = createApp()
  await router.push(url)
  await router.isReady()

  const matchedComponents = router.currentRoute.value.matched.flatMap(record => Object.values(record.components))

  console.log('匹配组件', matchedComponents)

  // 对所有匹配的路由组件调用 `asyncData()`
  await Promise.all(matchedComponents.map((Component: any) => {
    if (Component.asyncData) {
      return Component.asyncData({
        store,
        route: router.currentRoute
      })
    }
  }))

  const html = renderToString(app)
  return html
}
