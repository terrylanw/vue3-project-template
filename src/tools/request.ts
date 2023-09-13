import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { BASE_URLS } from '@/config/baseUrls'
import { router } from '@/router'

interface PagingInfoParams {
  pageNo: number
  pageSize: number
}

function handleLogout() {
}

const service = axios.create({
  baseURL: `${BASE_URLS[window.ENV || 'DEV']}/api/rest/`,
  timeout: 7000,
})

service.interceptors.request.use(
  (config) => {
    const token = ''

    if (token)
      config.headers['X-Request-Token'] = token

    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      const code = response.data.code
      if (code === -10)
        handleLogout()

      return response.data
    }

    throw new Error(response.status.toString())
  },
  (error) => {
    const response = error.response

    // 处理响应错误
    if (response && [500, 502].includes(response.status) && window.location.hash === '#/500')
      router.push({ name: 'ServerError' })

    return Promise.reject(error)
  },
)

export interface Response<T> {
  data: T
  message: string | null
  code: number
}

type RequestOptions = AxiosRequestConfig & { ignoreErrorCheck?: boolean }

function http<T>(method: 'GET' | 'POST' = 'POST', url: string, payload?: { pagingInfo?: PagingInfoParams; [key: string]: any } | null, options?: RequestOptions) {
  /* 请求成功处理函数 */
  const successHandler = (res: Response<T>) => {
    if (res.code === 0 || options?.ignoreErrorCheck)
      return res

    // if (res.message) {
    //   const msg = res.message.match(/\[(?<msg>[\s\S]+)\]/)?.groups?.msg
    //   msg && (window.$message.error(msg))
    // }

    return Promise.reject(res)
  }

  /* 请求失败处理函数 */
  const failHandler = (error: Error) => {
    throw new Error(error?.message || 'Error')
  }

  // 分页参数携带
  if (payload?.pagingInfo) {
    const { pageNo, pageSize } = payload.pagingInfo
    delete payload.pagingInfo
    if (pageNo && pageSize)
      options ? (options.params ? (options.params = { ...options.params, ...{ pageNo, pageSize } }) : options.params = { pageNo, pageSize }) : options = { params: { pageNo, pageSize } }
  }

  return method === 'GET'
    ? service.get<any, Response<T>>(url, Object.assign(options || {}, payload || {})).then(successHandler, failHandler)
    : service.post<any, Response<T>>(url, payload || null, options || {}).then(successHandler, failHandler)
}

export const request = {
  get<T>(url: string, params?: { pagingInfo?: PagingInfoParams; [key: string]: any } | null, options?: RequestOptions) {
    return http<T>('GET', url, params, options)
  },

  post<T>(url: string, payload?: { pagingInfo?: PagingInfoParams; [key: string]: any } | null, options?: RequestOptions) {
    return http<T>('POST', url, payload, options)
  },
}
