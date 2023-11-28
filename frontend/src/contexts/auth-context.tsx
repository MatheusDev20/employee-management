import React, {
  type ReactNode,
  createContext,
  useContext,
  useState,
} from 'react'
import { type ActiveUser } from '../@types/employees'
import { type LoginFormData } from '../@types'
import { login, logout } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import {
  getFromLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '../utils/auth'
import { timeout } from '../utils'

export interface AuthenticationContextProps {
  user: ActiveUser | null
  setUser: React.Dispatch<ActiveUser>
  signIn: (loginInformation: LoginFormData) => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
  failedMessage: string
  setFailedMessage: React.Dispatch<string>
}

export const AuthenticationContext =
  createContext<AuthenticationContextProps | null>(null)

const AuthProvider = ({
  children,
}: {
  children: ReactNode
}): React.JSX.Element => {
  const [user, setUser] = useState<ActiveUser | null>(() => {
    const item = getFromLocalStorage('profile')
    return item ? JSON.parse(item) : null
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [failedMessage, setFailedMessage] = useState<string>('')

  const navigate = useNavigate()

  const signIn = async (loginInformation: LoginFormData): Promise<void> => {
    setLoading(true)
    await timeout(30000)

    try {
      const response = await login(loginInformation)
      const { user } = response
      setUser(user)
      setLocalStorage('profile', JSON.stringify(user))
      setLoading(false)
      navigate('/app/home')
    } catch (err: any) {
      setLoading(false)
      setFailedMessage(err.message)
    }
  }

  const signOut = async (): Promise<void> => {
    await logout()
    removeLocalStorage('profile')
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        setUser,
        signIn,
        signOut,
        loading,
        failedMessage,
        setFailedMessage,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

const useAuth = (): AuthenticationContextProps => {
  const context = useContext(AuthenticationContext)
  if (context == null) {
    throw new Error('useAuth must be used within a provider')
  }
  return context
}

export { AuthProvider, useAuth }
