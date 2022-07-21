/**
 * http://110.42.184.111/api/room/room/getRoomList?pageNo=1&pageSize=6&cityCode=cd
 */

import { http } from '../utils/http'

export function fetchRoomList() {
  return http.httpRequestGet('http://110.42.184.111/api/room/room/getRoomList?pageNo=1&pageSize=6&cityCode=cd', {})
}
