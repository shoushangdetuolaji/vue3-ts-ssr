<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import headerCommon from './components/layout/commonHeader.vue'
import footerCommon from './components/layout/commonFooter.vue'

const route = useRoute()
const { locale: localeLanguage } = useI18n()
// const router = useRouter()
const locale = ref(zhCn)
const changeLang = (language: any) => {
  locale.value = language
  localeLanguage.value = language.name
}

</script>

<template>
  <el-config-provider :locale="locale">
    <headerCommon v-show="route.fullPath.indexOf('login') === -1" @changeLang="changeLang"/>
    <div class="container">
      <router-view />
    </div>
    <footerCommon v-show="route.fullPath.indexOf('login') === -1" />
  </el-config-provider>
</template>

<style lang="scss">
</style>
