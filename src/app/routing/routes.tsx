import { Navigate } from 'react-router-dom'
import { MainLayout } from '@widgets/main-layout'
import { HomePage } from '@pages/home-page'
import { LoginPage } from '@pages/login-page'
import { PrivateRoute } from '@app/routing/private-route.tsx'

export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'home',
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
      { path: '/login', element: <LoginPage /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]
