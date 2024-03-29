// import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

// const defaultConfig = {
//   timeout: 5000,
//   baseURL: import.meta.env.PROD ? 'http://110.42.184.111' : 'http:// localhost: 3000/release'
// }

// class Http {
//   constructor() {
//     this.httpInterceptorsRequest()
//     this.httpInterceptorsResponse()
//   }

//   private static axiosInstance = axios.create(defaultConfig)

//   // 请求拦截
//   private httpInterceptorsRequest() {
//     Http.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
//       return config
//     }, err => {
//       return Promise.reject(err)
//     })
//   }

//   // 响应拦截
//   private httpInterceptorsResponse() {
//     Http.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
//       return response
//     }, err => {
//       return Promise.reject(err)
//     })
//   }

//   /**
//    * 封装请求
//    */
//   // get
//   public httpRequestGet<T>(url: string, params: AxiosRequestConfig): Promise<T> {
//     return Http.axiosInstance.get(url, { params }).then(res => res.data).catch()
//   }

//   // post
//   public httpRequestPost<T>(url: string, params: AxiosRequestConfig): Promise<T> {
//     return Http.axiosInstance.post(url, params).then(res => res.data).catch()
//   }
// }

// export const http = new Http()

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const defaultConfig = {
  timeout: 5000,
  baseURL: import.meta.env.PROD ? 'http://110.42.184.111' : 'http://localhost:3000/release'
}

class Http {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  private static axiosInstance = axios.create(defaultConfig)

  // 请求拦截
  private httpInterceptorsRequest() {
    Http.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      return config
    }, err => {
      return Promise.reject(err)
    })
  }

  // 响应拦截
  private httpInterceptorsResponse() {
    Http.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      return response
    }, err => {
      return Promise.reject(err)
    })
  }

  /**
   * 封装请求
   */
  // get
  public httpRequestGet<T>(url: string, params: AxiosRequestConfig): Promise<T> {
    return Http.axiosInstance.get(url, { params }).then(res => res.data).catch()
  }

  // post
  public httpRequestPost<T>(url: string, params: AxiosRequestConfig): Promise<T> {
    return Http.axiosInstance.post(url, params).then(res => res.data).catch()
  }
}

export const http = new Http()
