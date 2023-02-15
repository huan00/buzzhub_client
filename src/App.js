import React, { useMemo } from 'react'
import Home from './pages/home/Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material'
import { themeSetting } from './theme'
import { useSelector } from 'react-redux'
import Login from './pages/login/Login'

const App = () => {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSetting(mode)), [mode])
  const isAuth = Boolean(useSelector((state) => state.token))
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
