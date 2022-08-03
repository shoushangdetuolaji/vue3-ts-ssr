import { http } from '../../utils/http'
import { IResultOr as IRsult, IRoomListParams } from '../interface'

// 真实接口 - 首页房屋列表接口
export function fetchRommList(params: IRoomListParams): Promise<IRsult> {
  return http.httpRequestGet('/api/room/room/getRoomList', params)
}
