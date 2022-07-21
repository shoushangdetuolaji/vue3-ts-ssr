<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { useRouter } from 'vue-router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale: localeLanguage } = useI18n()
const router = useRouter()
const locale = ref(zhCn)
const changeLang = (language: any) => {
  locale.value = language
  localeLanguage.value = language.name
}

</script>

<template>
  <el-config-provider :locale="locale">
    123
    <button @click="changeLang(zhCn)">中文</button>
    <button @click="changeLang(en)">英文</button>
    <button @click="() => router.push({path:'/home'})">首页</button>
    <button @click="() => router.push({path:'/mine'})">个人中心</button>
    <router-view />
  </el-config-provider>
</template>

<style lang="scss">
#app {
  button {
    font-size: 40px;
    color: $red;
  }
}
</style>
