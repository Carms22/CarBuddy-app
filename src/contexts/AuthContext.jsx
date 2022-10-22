import { createContext, useState, useContext, useEffect } from 'react'
import { setToken, getAccessToken, logout } from '../store/AccessTokenStore'
import { getCurrentUser } from '../services/UserService'
import { verifyJWT } from '../helper/jwtHelper'

const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [isAuthFetched, setIsAuthFetched] = useState(false)

  const login = (token, cb) => {
    setToken(token)

    getUser(cb)
  }

  const getUser = (cb) => {
    getCurrentUser()
      .then(user => {
        setUser(user)
        setIsAuthFetched(true)
        // cb && cb() Callback por si queremos hacer algo justo al traernos el usuario
      })
  }

  useEffect(() => {
    // Si existe token, me traigo al usuario

    if (getAccessToken()) {
      if (!verifyJWT(getAccessToken())) {
        logout()
      } else {
        getUser()
      }
    } else {
      setIsAuthFetched(true)
    }
  }, [])

  const value = {
    user,
    login,
    getUser,
    isAuthFetched
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext