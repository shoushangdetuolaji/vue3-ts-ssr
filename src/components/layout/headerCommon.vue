<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

const activeIndex = ref('orders')

const emit = defineEmits<{(e: 'changeLang', language: any): void}>()

function handleSelect(e: any) {
  if (e === 'zh') {
    emit('changeLang', zhCn)
  } else if (e === 'en') {
    emit('changeLang', en)
  }
  console.log(e)
}

</script>

<template>
  <div class="header-common">
    <img class="logo" src="../../assets/images/layout/logo.png" alt="爱此迎">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="orders">房屋订单中心</el-menu-item>
      <el-menu-item index="records">历史足迹</el-menu-item>
      <el-sub-menu index="language">
        <template #title>国际化切换</template>
        <el-menu-item index="zh">中文</el-menu-item>
        <el-menu-item index="en">英文</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="avatar">
        <img class="avatar" src="../../assets/images/layout/avatar.jpg" alt="个人中心">
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/layout/index.scss";
</style>
