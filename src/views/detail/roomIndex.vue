<script lang="ts">
import { defineComponent } from 'vue'
import RoomDetail from './components/detail.vue'
import { IRoomDetailParams } from '@/api/interface'
// import { useStore } from '@/store'

export default defineComponent({
  components: {
    RoomDetail
  },
  setup() {
    // const store = useStore()
    // return {
    //   store
    // }
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
