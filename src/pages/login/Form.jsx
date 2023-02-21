import { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  TextField
} from '@mui/material'
import Dropzone from 'react-dropzone'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Edit } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogin } from '../../store/store'
import { baseUrl } from '../../services/services'

const registerSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('Please enter a valid email').required('required'),
  password: yup.string().required('required'),
  location: yup.string().required('required'),
  occupation: yup.string().required('required'),
  picturePath: yup.string().required('required')
})

const loginSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('required'),
  password: yup.string().required('required')
})

const loginForm = {
  email: '',
  password: ''
}

const registerForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  occupation: '',
  picturePath: ''
}

const Form = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isMobile = useMediaQuery('(min-width:600px)')

  const handleRegister = async (values, actions) => {
    const formData = new FormData()
    for (let value in values) {
      formData.append(value, values[value])
    }
    formData.append('picturePath', values.picturePath.name)

    const saveUserReponse = await fetch(`${baseUrl}/buzzhub/user/register`, {
      method: 'POST',
      body: formData
    })
    if (saveUserReponse.status === 201) {
      actions.resetForm()
      setIsLogin((isLogin) => !isLogin)
    }
  }

  const handleLogin = async (values, actions) => {
    const formData = new FormData()
    formData.append('email', values.email)
    formData.append('password', values.password)

    const res = await fetch(`${baseUrl}/buzzhub/user/login`, {
      method: 'POST',
      body: formData
    })

    const { data } = await res.json()
    if (data) {
      dispatch(setLogin({ user: data.user, token: data.token }))
      navigate('/home')
    }
  }

  const onSubmit = async (values, actions) => {
    if (!isLogin) {
      await handleRegister(values, actions)
    } else {
      await handleLogin(values, actions)
    }
  }
  return (
    <Formik
      initialValues={isLogin ? { ...loginForm } : { ...registerForm }}
      validationSchema={isLogin ? loginSchema : registerSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        touched,
        errors,
        setFieldValue,
        handleBlur,
        handleChange,
        resetForm,
        handleSubmit = { onSubmit },
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0,1fr))"
            gap="30px"
            sx={{ '& > div': { gridColumn: isMobile ? undefined : 'span 4' } }}
          >
            {!isLogin && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={touched.firstName && errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: 'span 2' }}
                />

                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={touched.lastName && errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={touched.location && errors.location}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={touched.occupation && errors.occupation}
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: 'span 4' }}
                />
                <Box gridColumn="span 4" border="1px dashed red">
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue('picturePath', acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        p="1rem"
                        display="flex"
                        justifyContent="space-between"
                      >
                        <TextField {...getInputProps()} />
                        {!values.picturePath ? (
                          <Typography>Profile Picture</Typography>
                        ) : (
                          <>
                            <Typography>{values.picturePath.name}</Typography>
                            <Edit />
                          </>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label="Email"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              error={touched.email && errors.email}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: 'span 4' }}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.password && errors.password}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: 'span 4' }}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              sx={{
                gridColumn: 'span 4',
                m: '2rem 0',
                p: '1rem',
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': { color: palette.primary.main }
              }}
            >
              {isLogin ? 'Login' : 'Register'}
            </Button>
            <Typography
              onClick={() => {
                setIsLogin((isLogin) => !isLogin)
                resetForm()
              }}
              sx={{
                gridColumn: 'span 4',
                textDecoration: 'underline',
                color: palette.primary.main
              }}
            >
              {isLogin
                ? "Don't have an account? Sign up here"
                : 'Already have an account? Login here'}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default Form
