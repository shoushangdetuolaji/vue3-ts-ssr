import DB from '../../utils/indexedDB'
const airbnbDB = new DB('airbnb')
interface IResultOr { // 定义interface规范返回的结果数据
  code: string,
  success: boolean,
  message: string,
  result: any
}

// Mock接口：保存当前语言包
export async function saveLanguageApi(lang: any) {
  await airbnbDB.openStore('language', 'id', ['name'])
  const resultOr: IResultOr = await airbnbDB.getItem('language', 1).then(res => {
    return {
      code: '000000',
      message: '操作成功',
      result: res || null,
      success: true
    }
  })
  const { success } = resultOr
  let obj = {}
  if (success) { // 说明数据已经存在，则更新数据
    obj = { name: lang, id: 1 }
  } else {
    obj = { name: lang }
  }
  const result: IResultOr = await airbnbDB.updateItem('language', obj).then(res => {
    return {
      code: '000000',
      message: '操作成功',
      result: null,
      success: true
    }
  })
  return result
}

// Mock接口: 获取当前语言包
export async function fetchLanguageApi() {
  await airbnbDB.openStore('language', 'id', ['name'])
  const result: IResultOr = await airbnbDB.getItem('language', 1).then(res => {
    return {
      code: '000000',
      message: '操作成功',
      result: res || null,
      success: true
    }
  })
  return result
}
