<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useStore } from '@/store'

const store = useStore()
const roomDetail = computed(() => store.state.roomDetail)
const orderForm = reactive({
  personNumber: 1
})
function submitForm() {

}

</script>

<template>
  <!-- 照片墙 -->
  <el-carousel
    trigger="click"
    height="380px"
    :interval="3000"
    indicator-position="none"
    type="card">
    <el-carousel-item v-for="(item, index) in roomDetail.imgs" :key="index">
      <img :src="item" />
    </el-carousel-item>
  </el-carousel>

  <!-- 房屋详情信息 -->
  <div class="main-wapper">
    <div class="room-detail">
      <div class="detail-part">
        <h2>{{ roomDetail.title }}</h2>
        <!-- 房屋信息 -->
        <div class="info">
          <span class="room">{{ roomDetail.room }}</span>
          <span class="bed">{{ roomDetail.bed }}</span>
          <span class="toilet">{{ roomDetail.toilet }}</span>
          <span class="live-number">{{ roomDetail.liveNumber }}</span>
        </div>
        <div class="tags">
          <el-tag size="small">{{ roomDetail.remarks }} 评论</el-tag>
          <el-tag size="small" class="ml-10" type="danger" v-if="roomDetail.metro">靠近地铁</el-tag>
          <el-tag size="small" class="ml-10" type="warning" v-if="roomDetail.parking">免费停车</el-tag>
          <el-tag size="small" class="ml-10" type="success" v-if="roomDetail.luggage">可放置行李</el-tag>
        </div>
        <!-- 房东信息 -->
        <div class="owner-detail">
          <img :src="roomDetail.owner.avatar" />
          <div class="info">
            <p>房东: {{ roomDetail.owner.name }}</p>
            <p>
              <span v-if="roomDetail.owner.certify">已验证身份</span>
              <span v-if="roomDetail.info.goodOnwer">超赞房东</span>
            </p>
          </div>
        </div>
        <!-- 基本介绍 -->
        <div class="introduce">{{ roomDetail.owner.introduce }}</div>
      </div>
      <div class="form-part">
        <p class="price">
          <span>￥{{ roomDetail.price }}</span> / 晚
        </p>
        <el-form ref="orderForm" :model="orderForm" label-position="top" class="">
          <el-form-item prop="personNumber" label="人数">
            <select v-model="order.personNumber">
              <option v-for="item in 3" :value="item" :key="item">{{ item }}</option>
            </select>
          </el-form-item>
          <le-form-item>
            <el-button type="primary" @click="submitForm">预定</el-button>
          </le-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/detail/index.scss';
</style>
