import { Input } from '@shared/ui/input'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'

import type { AuthFormValues } from '../../validation/schema'

interface Props {
  register: UseFormRegister<AuthFormValues>
  errors: FieldErrors<AuthFormValues>
  isSubmitting: boolean
  mode: 'login' | 'register'
  onToggleMode: () => void
}

export const AuthFields = ({ register, errors, isSubmitting, mode, onToggleMode }: Props) => (
  <>
    <h3>{mode === 'login' ? 'Вход' : 'Регистрация'}</h3>

    <Input type="email" placeholder="Email" {...register('email')} error={errors.email?.message} />

    <Input
      type="password"
      placeholder="Пароль"
      {...register('password')}
      error={errors.password?.message}
    />

    <button type="submit" disabled={isSubmitting}>
      {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
    </button>

    <p style={{ fontSize: 12 }}>
      {mode === 'login' ? (
        <>
          Нет аккаунта?{' '}
          <button type="button" onClick={onToggleMode}>
            Регистрация
          </button>
        </>
      ) : (
        <>
          Уже есть аккаунт?{' '}
          <button type="button" onClick={onToggleMode}>
            Войти
          </button>
        </>
      )}
    </p>
  </>
)
