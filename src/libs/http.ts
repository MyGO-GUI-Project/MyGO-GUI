import axios, { AxiosError } from 'axios'
import { useToken } from '@/stores'

interface Response {
  code: number
  msg: string
  data: any
}

export const HTTP = Object.freeze({
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
})

const http = axios.create({
  baseURL: 'http://47.113.194.28:8888/api',
})

http.interceptors.request.use((config) => {
  const token = useToken().token
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data as Response
    if (data.code === HTTP.UNAUTHORIZED) {
      useToken().clearToken()
      window.location.reload()
    }
    console.error(data)
    return Promise.reject(error)
  }
)

export default http

export async function get(url: string, params?: any): Promise<Response> {
  try {
    const res = await http.get(url, { params })
    return res.data as Response
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data as Response
    }
    throw error
  }
}

/* 上下两个写法等价, 写的好玩 */

export async function post(url: string, data?: any): Promise<Response> {
  return new Promise((resolve, reject) => {
    http.post(url, data).then(
      (res) => {
        resolve(res.data as Response)
      },
      (error) => {
        if (error instanceof AxiosError) {
          const data = error.response?.data
          resolve(data as Response)
        }
        reject(error)
      }
    )
  })
}
