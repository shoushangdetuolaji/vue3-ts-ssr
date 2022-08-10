import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// element-plus 按需加载
// 服务端渲染的时候需要把element-plus 按需加载 给注释掉
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vitePluginCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginCompression() // 代码压缩gizp
    // 按需引入配置
    // AutoImport({
    //   resolvers: [ElementPlusResolver()]
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()]
    // })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/variable.scss";@import "@/assets/scss/main.scss";'
      }
    }
  },
  server: {
    host: 'localhost',
    port: 3000,
    proxy: {
      '/release': {
        target: 'http://110.42.184.111',
        rewrite: path => path.replace(/^\/release/, '')
      }
    }
  }
})
