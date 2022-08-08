<script setup lang="ts">
import { fetchRecordApi } from '@/api/record'
import { getCurrentInstance, ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

const recordData = ref()
const data = reactive({
  recordData1: [],
  a: '',
  b: 0
})
const { proxy }: any = getCurrentInstance()
const store = useStore()
const router = useRouter()
function fetchRecord() {
  fetchRecordApi().then(res => {
    const { success, message, result } = res
    if (success) {
      recordData.value = result
      data.recordData1 = result
      console.log(result)
    } else {
      proxy.$message.error(message)
    }
  })
}

onMounted(() => {
  if (store.state.userStatus) {
    fetchRecord()
  } else {
    const { pathname } = window.location
    router.replace({
      path: '/login',
      query: {
        redirect: pathname
      }
    })
  }
})
</script>

<template>
  {{ recordData }} ----- {{ $data.recordData1 }}
</template>

<style scoped lang="scss">
</style>
