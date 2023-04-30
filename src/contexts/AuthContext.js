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
    const storedToken = localStorage.getItem("userToken")
    console.log("Stored token:", localStorage.getItem("userToken"))

    if (storedToken) {
      setToken(storedToken)
      console.log("Sending request to /api/profile with token:", storedToken)
      axios
        .get("http://localhost:8080/api/profile", {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(response => {
          setUser(response.data)
          console.log("Fetched user profile:", response.data)
          setLoading(false)
        })
        .catch(error => {
          console.error("Error fetching user profile:", error)
          localStorage.removeItem("userToken")
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      })

      localStorage.setItem("userToken", response.data.token)
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
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
