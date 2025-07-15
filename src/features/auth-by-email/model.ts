import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { useUserStore } from '@entities/user/model'
import type { AuthFormValues } from '@features/auth-by-email/validation/schema'
import { api } from '@shared/api/axios'

const loginReq = (d: AuthFormValues) => api.post('/auth/login', d)

const registerReq = (d: AuthFormValues) => api.post('/auth/register', d)

type AuthResult = Awaited<ReturnType<typeof loginReq>>['data']

export type SubmitFn = (d: AuthFormValues) => Promise<AuthResult>

function useAuthMutation(
  req: (d: AuthFormValues) => Promise<{ data: AuthResult }>,
): UseMutationResult<AuthResult, unknown, AuthFormValues> {
  const setSession = useUserStore.getState().setSession
  return useMutation({
    mutationFn: (data) => req(data).then((r) => r.data),
    onSuccess: ({ user, accessToken }) => setSession(user, accessToken),
  })
}

export const useLoginMutation = () => useAuthMutation(loginReq)

export const useRegisterMutation = () => useAuthMutation(registerReq)
