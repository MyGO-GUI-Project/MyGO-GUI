import { defineStore } from 'pinia'

interface UserInfo {
  id: number
  name: string
  role: string
  expire: number
}
const TOKEN_PREFIX = 'Bearer '

const rawToken = _getToken()
const userInfo = _parseToken(rawToken)

const useTokenStore = defineStore('token', {
  state: () => ({
    // you shouldn't access rawToken directly, use the token getter
    raw: rawToken as string | null,
    userInfo: userInfo as UserInfo | null,
  }),
  getters: {
    isLogin: (state) => {
      if (state.userInfo === null) return false
      if (state.userInfo?.expire ?? 0 < Date.now() / 1000) {
        _clearToken()
        state.raw = null
        state.userInfo = null
        return false
      }
      return true
    },
    token: (state) => {
      if (state.raw === null) return null
      return TOKEN_PREFIX + state.raw
    },
  },
  actions: {
    setToken(token: string) {
      token = token.replace(TOKEN_PREFIX, '')
      _setToken(token)
      this.raw = token
      this.userInfo = _parseToken(token)
    },
    clearToken() {
      _clearToken()
      this.raw = null
      this.userInfo = null
    },
  },
})

export default useTokenStore

function _parseToken(token: string | null) {
  if (token === null) return null
  const strings = token.split('.')
  let userInfo: any
  try {
    userInfo = JSON.parse(decodeURIComponent(window.atob(strings[1].replace(/-/g, '+').replace(/_/g, '/'))))
  } catch (e) {
    console.log('Token invalid')
    _clearToken()
    return null
  }
  return {
    id: userInfo.Id,
    name: userInfo.Name,
    role: userInfo.Role,
    expire: userInfo.exp,
  } as UserInfo
}

function _getToken() {
  const token = localStorage.getItem('token')
  if (token === null) return null
  return token
}

function _setToken(token: string) {
  localStorage.setItem('token', token)
}

function _clearToken() {
  localStorage.removeItem('token')
}
