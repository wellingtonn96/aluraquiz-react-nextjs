import React, { createContext, useState, useContext, useEffect } from 'react'
import { setCookie, parseCookies } from 'nookies'
import { getApiClient } from '../services/api'
import Router from 'next/router'

type IAuthContextData = {
  signIn: ({ email, password }: SignInData) => Promise<void>
  user: UserData
}

type SignInData = {
  email: string
  password: string
}

type UserData = {
  username: string
  name: string
  lastname: string
  email: string
}

type IResponseData = {
  user: UserData
  accessToken: string
}

const AuthContext = createContext({} as IAuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserData | undefined>(null)

  useEffect(() => {
    const { 'quiz-auth.token': token } = parseCookies()

    if (token) {
      const api = getApiClient()
      api
        .get('users/me')
        .then(response => {
          setUser(response.data)
        })
        .catch(error => {
          Router.push('/')
        })
    }
  }, [])

  const signIn = async ({ email, password }: SignInData) => {
    try {
      const api = getApiClient()

      const response = await api.post('/auth', {
        email,
        password,
      })

      const { accessToken, user } = response.data as IResponseData

      setCookie(undefined, 'quiz-auth.token', accessToken, {
        maxAge: 60 * 60 * 24, // 1 day
      })

      setUser(user)

      Router.push('/home')
    } catch (error) {
      alert(JSON.stringify(error.message))
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, user }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be use within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
