import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import Form from './Form'

const Login = () => {
  const theme = useTheme()
  return (
    <Box sx={{ width: '100%', margin: '0 auto' }}>
      <Box width="100%" backgroundColor={theme.palette.primary.light}>
        <Typography
          variant="h3"
          color={theme.palette.primary.main}
          textAlign="center"
        >
          Buzzhub
        </Typography>
      </Box>
      <Box
        width="60%"
        margin="3rem auto 0"
        backgroundColor={theme.palette.neutral.light}
        borderRadius="5px"
        p="1rem"
      >
        <Typography variant="h5" textAlign="center" sx={{ mb: '1rem' }}>
          Welcome to Buzzhub
        </Typography>
        <Form />
      </Box>
    </Box>
  )
}

export default Login
