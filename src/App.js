import React, { useMemo } from 'react'
import Home from './pages/home/Home.jsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material'
import { themeSetting } from './theme'
import { useSelector } from 'react-redux'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile.jsx'
import Navbar from './pages/navbar/Navbar.jsx'

const App = () => {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSetting(mode)), [mode])
  const isAuth = Boolean(useSelector((state) => state.token))
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:id"
              element={isAuth ? <Profile /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
