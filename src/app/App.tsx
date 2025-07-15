import { useRoutes } from 'react-router-dom'
import { useInitSession } from '@app/hooks/init-session.ts'
import { routes } from '@app/routing/routes.tsx'

export function App() {
  const ready = useInitSession()
  const element = useRoutes(routes)

  if (!ready) return null

  return element
}
