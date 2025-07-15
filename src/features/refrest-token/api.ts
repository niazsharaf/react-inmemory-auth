import { api } from '@shared/api/axios'

export const refreshSession = async () => {
  const { data } = await api.post('/auth/refresh')
  return data as { accessToken: string; user: any }
}
