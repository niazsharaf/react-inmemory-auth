import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthFields } from '@features/auth-by-email/ui/AuthFields'
import { type AuthFormValues, authSchema } from '@features/auth-by-email/validation/schema.ts'
import {
  type SubmitFn,
  useLoginMutation,
  useRegisterMutation,
} from '@features/auth-by-email/model.ts'

type Mode = 'login' | 'register'

export const AuthForm = () => {
  const [mode, setMode] = useState<Mode>('login')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({ resolver: zodResolver(authSchema) })

  const loginMut = useLoginMutation()

  const regMut = useRegisterMutation()

  const sumbitMode: Record<Mode, SubmitFn> = {
    login: (data: AuthFormValues) => loginMut.mutateAsync(data),
    register: (data: AuthFormValues) => regMut.mutateAsync(data),
  }

  const onSubmit = async (data: AuthFormValues) => {
    return sumbitMode[mode](data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthFields
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        mode={mode}
        onToggleMode={() => setMode(mode === 'login' ? 'register' : 'login')}
      />
    </form>
  )
}
