<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import userFormProperties from '@/composables/login/userFormProperties'
import userFormOperates from '@/composables/login/userFormOperates'
const router = useRouter()
const { t } = useI18n()

const { ruleForm, loginText, ruleFormRef, activeName } = userFormProperties(t)
const { userSign, userLogin } = userFormOperates(router, ruleForm)

function handClick(e: any) {
  const { name } = e.props
  // if (name === 'login') {
  //   loginText.value = t('login.loginBtn')
  // } else if (name === 'sign') {
  //   loginText.value = t('login.signBtn')
  // }
  // console.log(name, label)
  loginText.value = t(`login['${name}Btn']`)
}

function submitForm() {
  ruleFormRef.value.validate((valid: any) => {
    if (valid) {
      if (activeName.value === 'sign') {
        userSign(ruleForm)
      } else if (activeName.value === 'login') {
        userLogin(ruleForm)
      }
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
          <el-tab-pane :label="t('login.loginTab')" name="login"></el-tab-pane>
          <el-tab-pane :label="t('login.signTab')" name="sign"></el-tab-pane>
        </el-tabs>
        <!-- 表单组件 -->
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px">
          <el-form-item prop="mobile">
            <el-input :placeholder="t('login.placeMobile')" v-model="ruleForm.mobile"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" :placeholder="t('login.placePass')" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm()">{{ loginText }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/login/index.scss";
</style>
