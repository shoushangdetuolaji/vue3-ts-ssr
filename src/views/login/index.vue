<script setup lang="ts">
import { reactive, ref, getCurrentInstance } from 'vue'
import { useI18n } from 'vue-i18n'
import { userLoginApi, userSignApi } from '@/api/login'
import { IResultOr } from '@/api/interface'
import { useRouter } from 'vue-router'

interface IRuleForm {
  mobile: string,
  password: string
}
const router = useRouter()
const { t } = useI18n()
const { proxy }: any = getCurrentInstance()
const activeName = ref('login')
const loginText = ref(t('login.loginBtn'))
const ruleFormRef = ref()
const ruleForm: IRuleForm = reactive({
  mobile: '',
  password: ''
})
const rules = reactive({
  mobile: [
    {
      required: true,
      min: 11,
      max: 11,
      messsage: t('login.placeMobile'),
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      messsage: t('login.placePass'),
      trigger: 'blur'
    }
  ]
})

function handClick(e: any) {
  const { name, label } = e.props
  if (name === 'login') {
    loginText.value = t('login.loginBtn')
  } else if (name === 'sign') {
    loginText.value = t('login.signBtn')
  }
  console.log(name, label)
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

// 注册接口
function userSign(params: IRuleForm) {
  userSignApi(params).then((res: IResultOr) => {
    const { success, message } = res
    if (success) {
      proxy.$message.success(message)
    } else {
      proxy.$message.error(message)
    }
  })
}

// 登录接口
function userLogin(params: IRuleForm) {
  userLoginApi(params).then((res: IResultOr) => {
    const { success, message, result } = res
    const { status } = result
    if (success) {
      localStorage.setItem('userStatus', status)
      router.push({ name: 'home' })
      proxy.$message.success(message)
    } else {
      proxy.$message.error(message)
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
