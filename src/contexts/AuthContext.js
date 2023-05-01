import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const storedToken = localStorage.getItem("userToken")

  const [user, setUser] = useState(null)
  const [token, setToken] = useState(storedToken)
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(storedToken))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("Token updated:", token)
  }, [token])

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken")
    const storedUser = localStorage.getItem("user")

    console.log("Stored token:", localStorage.getItem("userToken"))

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }

    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      })

      localStorage.setItem("userToken", response.data.token)
      console.log("Token being saved:", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      setToken(response.data.token)
      setIsAuthenticated(true)

      const userProfileResponse = await axios.get(
        "http://localhost:8080/api/profile",
        {
          headers: { Authorization: `Bearer ${response.data.token}` },
        }
      )

      setUser(userProfileResponse.data)
    } catch (error) {
      console.error("Error logging in:", error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("userToken")
    setToken(null)
    setIsAuthenticated(false)
  }

  const register = (firstName, lastName, email, password) => {
    return axios.post("http://localhost:8080/api/register", {
      firstName,
      lastName,
      email,
      password,
    })
  }

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    register,
    loading,
    token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
