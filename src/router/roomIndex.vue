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
  },
  asyncData({ store, route }: any) {
    console.log('asyncData----', store, route)
    return store.dispath('getRoomDetail', { id: 1 } as IRoomDetailParams)
  }
})
</script>

<template>
 <RoomDetail/>
</template>

<style lang="scss">
@import '@/assets/scss/detail/index.scss';
</style>
