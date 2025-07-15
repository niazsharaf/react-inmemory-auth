import axios from 'axios'
import { useUserStore } from '@entities/user/model'
import { refreshSession } from '@features/refrest-token/api.ts'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

let isRefreshing = false
let queue: ((t: string) => void)[] = []

api.interceptors.request.use((cfg) => {
  const token = useUserStore.getState().accessToken
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const { config, response } = error
    if (response?.status !== 401 || config._retry) throw error

    config._retry = true

    if (isRefreshing) {
      return new Promise((res) =>
        queue.push((newToken) => {
          config.headers.Authorization = `Bearer ${newToken}`
          res(api(config))
        }),
      )
    }

    isRefreshing = true
    try {
      const { accessToken, user } = await refreshSession()
      useUserStore.getState().setSession(user, accessToken)
      queue.forEach((cb) => cb(accessToken))
      return api(config)
    } catch (e) {
      useUserStore.getState().clear()
      throw e
    } finally {
      isRefreshing = false
      queue = []
    }
  },
)
