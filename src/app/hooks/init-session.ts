import { useLayoutEffect, useState } from 'react'
import { useUserStore } from '@entities/user/model.ts'
import { refreshSession } from '@features/refrest-token/api.ts'

export function useInitSession() {
  const [ready, setReady] = useState(false)
  const setSession = useUserStore((s) => s.setSession)

  useLayoutEffect(() => {
    refreshSession()
      .then(({ user, accessToken }) => setSession(user, accessToken))
      .catch(() => {})
      .finally(() => setReady(true))
  }, [setSession])

  return ready
}
