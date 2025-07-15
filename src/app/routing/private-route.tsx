import { Navigate } from 'react-router-dom'
import { useUserStore } from '@entities/user/model.ts'
import type { ReactElement } from 'react'

interface Props {
  children: ReactElement
}

export const PrivateRoute = ({ children }: Props): ReactElement => {
  const user = useUserStore((s) => s.user)
  return user ? children : <Navigate to="/login" replace />
}
