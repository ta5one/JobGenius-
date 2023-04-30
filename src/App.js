import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import Homepage from "./pages/home/Homepage"

import Login from "./auth/Login"
import Layout from "./Layout/Layout"
import SignUp from "./auth/Signup"
import { AuthProvider } from "./contexts/AuthContext"

function App() {
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
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  )
}

export default App
