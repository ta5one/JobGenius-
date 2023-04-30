import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return user ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace={true} />
  )
}

export default PrivateRoute
