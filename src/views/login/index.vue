<script setup lang="ts">
import { reactive, ref } from 'vue'
const activeName = ref('login')

const ruleFormRef = ref()
const ruleForm = reactive({
  mobile: '',
  password: ''
})
const rules = reactive({
  mobile: [
    {
      required: true,
      min: 11,
      max: 11,
      messsage: '请输入正确的手机号码',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      messsage: '请输入正确的密码',
      trigger: 'blur'
    }
  ]
})

function handClick(e: any) {
  console.log(e)
}

function submitForm() {
  ruleFormRef.value.validate((valid: any) => {
    if (valid) {
      alert('成功')
    } else {
      return false
    }
  })
}
</script>

<template>
  <div class="login-page">
    <div class="left-part"></div>
    <div class="right-part">
      <div class="login-panel">
        <!-- tabs -->
        <el-tabs v-model="activeName" @tab-click="handClick">
          <el-tab-pane label="登录" name="login"></el-tab-pane>
          <el-tab-pane label="注册" name="sign"></el-tab-pane>
        </el-tabs>
        <!-- 表单组件 -->
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px">
          <el-form-item prop="mobile">
            <el-input placeholder="请输入正确的手机号" v-model="ruleForm.mobile"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入正确的密码" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm()">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/login/index.scss";
</style>
