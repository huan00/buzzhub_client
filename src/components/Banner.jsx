import React, { useEffect, useState } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AccountCircle, PersonAdd, PersonRemove } from '@mui/icons-material'
import { setUser } from '../store/store'

const Banner = ({ postUserId, firstName, lastName }) => {
  const [postUser, setPostUser] = useState(null)
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch()
  const theme = useTheme()

  const getUser = async () => {
    const res = await fetch(
      `http://localhost:8000/buzzhub/user/${postUserId}`,
      {
        method: 'GET'
      }
    )

    const data = await res.json()

    setPostUser(data)
  }

  useEffect(() => {
    getUser()
  }, [])

  // useEffect(() => {
  //   dispatch(setUser(user))
  // }, [user])

  const handleAddRemoveFriend = async () => {
    const res = await fetch(
      `http://localhost:8000/buzzhub/user/${user.id}/${postUserId}`,
      { method: 'GET', headers: { Authorization: `Token ${token}` } }
    )
    const data = await res.json()

    dispatch(setUser(data))
  }

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" alignItems="center">
        <Box
          display="flex"
          width="75px"
          height="75px"
          borderRadius="50%"
          overflow="hidden"
          justifyContent="center"
          alignItems="center"
          mr="1rem"
        >
          {postUser?.picturePath ? (
            <img
              src={`http://localhost:8000${postUser.picturePath}`}
              alt="profile"
              width="75x"
              height="75px"
            />
          ) : (
            <AccountCircle fontSize="large" />
          )}
        </Box>
        <Typography variant="h4" color={theme.palette.neutral.mediumMain}>
          {firstName} {lastName}
        </Typography>
      </Box>
      {user.id === postUserId ? (
        ''
      ) : (
        <Box
          borderRadius="50%"
          backgroundColor={theme.palette.primary.light}
          p="1rem"
          sx={{ '&:hover': { cursor: 'pointer' } }}
          onClick={handleAddRemoveFriend}
        >
          <>
            {user.friends[postUserId] ? (
              <PersonRemove fontSize="large" />
            ) : (
              <PersonAdd fontSize="large" />
            )}
          </>
        </Box>
      )}
    </Box>
  )
}

export default Banner
