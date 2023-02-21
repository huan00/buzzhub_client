import React, { useState } from 'react'
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  FormControl,
  Select,
  MenuItem,
  InputBase
} from '@mui/material'
import { setLogout, setMode } from '../../store/store'

import {
  DarkMode,
  Comment,
  Notifications,
  Menu,
  Logout
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [isMobileToggle, setIsMobileToggle] = useState(false)
  const user = useSelector((state) => state.user)
  const fullName = `${user?.firstName} ${user?.lastName}`
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isMobile = useMediaQuery('(min-width: 1000px)')
  const theme = useTheme()

  const primaryLight = theme.palette.primary.light
  const background = theme.palette.neutral.light

  const handleMode = () => {
    dispatch(setMode())
  }
  const handleLogout = () => {
    dispatch(setLogout())
    navigate('/')
  }
  return (
    <Box
      sx={{ width: '100%', height: 100 }}
      backgroundColor={background}
      p=".25rem 1rem"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          sx={{ '&:hover': { color: primaryLight, cursor: 'pointer' } }}
          onClick={() => navigate('/home')}
        >
          Buzzhub
        </Typography>
      </Box>
      {isMobile ? (
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Box display="flex" justifyContent="space-between">
            <DarkMode
              sx={{
                marginLeft: '1rem',
                '&:hover': {
                  cursor: 'pointer',
                  color: theme.palette.primary.dark
                }
              }}
              onClick={handleMode}
            />
            <Comment sx={{ marginLeft: '1rem' }} />
            <Notifications sx={{ marginLeft: '1rem' }} />
          </Box>
          <Box marginLeft="1rem">
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  width: '150px',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  textAlign: 'center'
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName} sx={{ textAlign: 'center' }}>
                  <Typography sx={{ textAlign: 'center' }}>
                    {fullName}
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography
                    sx={{
                      display: 'flex'
                    }}
                    onClick={handleLogout}
                  >
                    <Logout sx={{ mr: '.5rem' }} /> Logout
                  </Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      ) : (
        <Box>
          <Menu
            onClick={() =>
              setIsMobileToggle((isMobileToggle) => !isMobileToggle)
            }
          />
        </Box>
      )}

      {/* show mobile menu  */}
      {isMobileToggle && (
        <Box
          position="absolute"
          width="150px"
          backgroundColor={theme.palette.primary.main}
          sx={{ right: '0', top: '100px' }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
          >
            <DarkMode
              sx={{ mb: '1rem', '&:hover': { cursor: 'pointer' } }}
              onClick={handleMode}
            />
            <Comment sx={{ mb: '1rem' }} />
            <Notifications sx={{ mb: '1rem' }} />
            <Typography
              sx={{
                display: 'flex',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                  cursor: 'pointer'
                }
              }}
              onClick={handleLogout}
            >
              <Logout sx={{ mr: '.5rem' }} /> Logout
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Navbar
