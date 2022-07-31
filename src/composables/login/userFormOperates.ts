import { getCurrentInstance } from 'vue'
import { IResultOr } from '@/api/interface'
import { userLoginApi, userSignApi } from '@/api/login'
interface IRuleForm {
  mobile: string,
  password: string
}

export default function userFormOperates(router: any, params: IRuleForm) {
  const { proxy }: any = getCurrentInstance()
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

  return {
    userSign,
    userLogin
  }
}