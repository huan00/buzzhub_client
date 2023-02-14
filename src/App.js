import React, { useMemo } from 'react'
import Navbar from './pages/navbar/Navbar'
import Home from './pages/home/Home.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material'
import { themeSetting } from './theme'
import { useSelector } from 'react-redux'

const App = () => {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSetting(mode)), [mode])
  const isAuth = Boolean(useSelector((state) => state.token))
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Home />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
