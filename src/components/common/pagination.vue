<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
const store = useStore()
const pageNo = computed(() => store.state.pageNo)
const pageSize = computed(() => store.state.pageSize)
const total = computed(() => store.state.total)

function changePage(pageNo) {
  console.log(pageNo)
}
</script>

<template>
  <el-pagination
    :current-page="pageNo"
    :pagee-size="pageSize"
    :total="total"
    @current-change="changePage">
  </el-pagination>
</template>

<style scoped>
</style>
