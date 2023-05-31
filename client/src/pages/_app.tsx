import ProtectedRoute from '@/components/protectedRoutes'
import { AuthContextProvider } from '@/context/AuthUserContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const noAuthRequired = ['/', '/login', '/register']
  return (
    <AuthContextProvider >
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>)
}
