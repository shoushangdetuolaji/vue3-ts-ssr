import { ref, reactive } from 'vue'
interface IRuleForm {
  mobile: string,
  password: string
}

export default function userFormProperties(t: any) {
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
  return {
    activeName,
    loginText,
    ruleFormRef,
    ruleForm,
    rules
  }
}
