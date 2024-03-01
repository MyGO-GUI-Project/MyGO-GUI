import axios from 'axios'
import { useTokenStore } from '@/stores'

const http = axios.create({
  baseURL: 'http://47.113.194.28:8888/api',
})

http.interceptors.request.use((config) => {
  const tokenStore = useTokenStore()
  const token = tokenStore.token
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

export default http
