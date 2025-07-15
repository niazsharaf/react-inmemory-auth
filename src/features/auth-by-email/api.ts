import { api } from '@shared/api/axios'

export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password })
