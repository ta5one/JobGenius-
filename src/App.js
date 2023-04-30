import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import Homepage from "./pages/home/Homepage"

import Login from "./auth/Login"
import Layout from "./Layout/Layout"
import SignUp from "./auth/Signup"
import { AuthProvider } from "./contexts/AuthContext"
import Services from "./pages/Services"
import PrivateRoute from "./components/PrivateRoute"
import AddService from "./pages/AddService"
import { useAuth } from "./contexts/AuthContext"

function App() {
  const { loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <div
        className="App"
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Homepage />
                </Layout>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {!loading && (
              <Route
                path="/services"
                element={<PrivateRoute component={Services} />}
              />
            )}

            <Route
              path="/add-service"
              element={<PrivateRoute component={AddService} />}
            />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  )
}

export default App
