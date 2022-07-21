import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

const i18n = createI18n({
  legacy: false, // 处理vue-i18n legacy报错
  locale: 'zh',
  messages: {
    zh,
    en
  }
})

export default i18n
