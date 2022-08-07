import { getCurrentInstance } from 'vue'
import { IResultOr } from '@/api/interface'
import { userLoginApi, userSignApi } from '@/api/login'
import { useStore } from 'vuex'
import { key } from '@/store'
import { useRoute } from 'vue-router'

interface IRuleForm {
  mobile: string,
  password: string
}

export default function userFormOperates(router: any, params: IRuleForm) {
  const { proxy }: any = getCurrentInstance()
  const store = useStore(key)
  const route = useRoute()
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
      if (success) {
        const { status, userId } = result
        localStorage.setItem('userStatus', userId)
        store.commit('setUserStatus', status)
        // 假如存在重定向
        const { redirect }: any = route.query
        router.push({ path: redirect || '/home' })
        // window.location.href = '/home'
        proxy.$message.success(message)
      } else {
        proxy.$message.error(message)
      }
    })
  }

  return {
    userSign,
    userLogin
  }
}
