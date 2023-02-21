import { Box, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AccountCircle, PersonAdd, PersonRemove } from '@mui/icons-material'
import { setUser } from '../store/store'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../services/services'

const Banner = ({ postUserId, firstName, lastName, userPicturePath }) => {
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme()

  const handleAddRemoveFriend = async () => {
    const res = await fetch(`${baseUrl}/${user.id}/${postUserId}`, {
      method: 'PATCH',
      headers: { Authorization: `Token ${token}` }
    })
    const data = await res.json()

    dispatch(setUser(data))
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      onClick={() => navigate(`/profile/${postUserId}`)}
      sx={{ '&:hover': { cursor: 'pointer' } }}
    >
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
          {userPicturePath ? (
            <img
              src={`${baseUrl}${userPicturePath}`}
              alt="profile"
              width="75x"
              height="75px"
            />
          ) : (
            <AccountCircle fontSize="large" />
          )}
        </Box>
        <Typography variant="h5" color={theme.palette.neutral.mediumMain}>
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
