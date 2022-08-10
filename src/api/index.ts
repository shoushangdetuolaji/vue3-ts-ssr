/**
 * http://110.42.184.111/api/room/room/getRoomList?pageNo=1&pageSize=6&cityCode=cd
 */
import airbnb from '../db'

// 真实接口
// export function fetchRoomList(params: any): Promise<IResult> {
//   return http.httpRequestGet('http://110.42.184.111/api/room/room/getRoomList', params)
// }

// Mock接口
export async function fetchElephant() {
  await airbnb.airbnbDB.openStore({ elephant: { keyPath: 'id', indexs: ['nose', 'ear'] } })
  const result = await airbnb.airbnbDB.getList('elephant').then(res => {
    return { code: '000000', message: '操作成功', result: res, success: true }
  })
  return result
}
