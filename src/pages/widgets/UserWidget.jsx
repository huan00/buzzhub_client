import { Box, Divider, Typography, useTheme } from '@mui/material'
import {
  ManageAccounts,
  Place,
  Interests,
  Twitter,
  LinkedIn,
  Edit
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserWidget = ({ userId }) => {
  const [user, setUser] = useState(null)
  const theme = useTheme()
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getUser = async () => {
    const res = await fetch(`http://localhost:8000/buzzhub/user/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Token ${token}` }
    })

    const data = await res.json()

    dispatch(setUser(data))
  }

  useEffect(() => {
    getUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {user ? (
        <Box
          backgroundColor={theme.palette.neutral.light}
          display="flex"
          flexDirection="column"
          borderRadius="5px"
          p="1rem"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="0 0 1rem 0"
            onClick={() => navigate(`/profile/${user.id}`)}
            sx={{ '&:hover': { cursor: 'pointer' } }}
          >
            <Box
              borderRadius="50%"
              border={`1px solid ${theme.palette.neutral.medium}`}
              width="75px"
              height="75px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              overflow="hidden"
            >
              <img
                src={`http://localhost:8000${user.picturePath}`}
                alt="profile"
                width="100%"
                height="100%"
              />
            </Box>
            <Box>
              <Typography sx={{ fontSize: '1.5rem' }}>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography>
                {Object.keys(user.friends).length} Friends
              </Typography>
            </Box>
            <ManageAccounts />
          </Box>

          <Divider />

          <Box>
            <Box display="flex" alignItems="center" p="1rem 0 .5rem">
              <Place fontSize="large" sx={{ mr: '1rem' }} />
              <Typography>{user.location}</Typography>
            </Box>
            <Box display="flex" alignItems="center" p="1rem 0 1rem">
              <Interests fontSize="large" sx={{ mr: '1rem' }} />
              <Typography>{user.occupation}</Typography>
            </Box>
          </Box>

          <Divider />

          <Box sx={{ textAlign: 'justify' }} p="1rem 0">
            <Box display="flex" justifyContent="space-between">
              <Typography>Who's viewed your profile:</Typography>
              <Typography>{user.viewedProfile}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography>Impressions of your post: </Typography>
              <Typography>{user.impressions}</Typography>
            </Box>
          </Box>

          <Divider />

          <Box p="1rem 0">
            <Typography>Social Profiles</Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="1rem 0"
              textAlign="center"
            >
              <Twitter fontSize="large" />
              <Box>
                <Typography>Twitter</Typography>
                <Typography>Social Network</Typography>
              </Box>
              <Edit
                fontSize="medium"
                sx={{ color: theme.palette.neutral.mediumMain }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              textAlign="center"
            >
              <LinkedIn fontSize="large" />
              <Box>
                <Typography>Linkedin</Typography>
                <Typography>Networking</Typography>
              </Box>
              <Edit
                fontSize="medium"
                sx={{ color: theme.palette.neutral.mediumMain }}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>Loading..</Box>
      )}
    </>
  )
}

export default UserWidget
