## 第二次SSR改造
- 服务端数据预取: 封装asyncData函数、create函数
- 同步数据状态: vuex-router-sync、window._INITIAL_STATE_
路由同步、客户端和服务端window标识同步，数据状态
- SSR优化：生成预加载指令 ssr-manifest.json
 比如可以解决 加载首页时css文件错乱的问题