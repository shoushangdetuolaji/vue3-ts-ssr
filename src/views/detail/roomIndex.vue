<script lang="ts">
import { defineComponent, watch, watchEffect} from 'vue'
import RoomDetail from './components/detail.vue'
import { IRoomDetailParams } from '@/api/interface'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    RoomDetail
  },
  setup() {
    // const store = useStore()
    // return {
    //   store
    // }
    // const router = useRouter()
    const route = useRoute()
    const store = useStore()
    watch(() => route.params, (newVal, oldVal) => {
      store.dispatch('getRoomDetail', newVal)
    })
    // watchEffect相对于watch方法简洁一点，但不能监听oldVal，只能拿newValue
    // watchEffect(() => store.dispatch('getRoomDetail', route.params))
  },
  asyncData({ store, route }: any) {
    console.log('asyncData----详情页', store, route.value)
    const { roomId } = store.state
    const { id } = route.value.params
    return store.dispatch('getRoomDetail', { id: roomId || id } as IRoomDetailParams)
  }
})
</script>

<template>
 <RoomDetail/>
</template>

<style lang="scss">
@import '@/assets/scss/detail/index.scss';
</style>
