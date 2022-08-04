import { http } from '../../utils/http'
import { IResultOr as IRsult, IRoomListParams } from '../interface'

// 真实接口 - 首页房屋列表接口
export function fetchRoomList(params: IRoomListParams): Promise<IRsult> {
  return http.httpRequestGet('http://110.42.184.111/api/room/room/getRoomList', params)
}
