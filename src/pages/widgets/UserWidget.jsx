import { Box, Divider, Typography, useTheme } from '@mui/material'
import {
  ManageAccounts,
  Place,
  Interests,
  Twitter,
  LinkedIn,
  Edit
} from '@mui/icons-material'
import { useSelector } from 'react-redux'

const UserWidget = () => {
  const user = useSelector((state) => state.user)
  const theme = useTheme()

  return (
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
          <Typography>{Object.keys(user.friends).length} Friends</Typography>
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
          <Edit fontSize="medium" />
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
          <Edit fontSize="medium" />
        </Box>
      </Box>
    </Box>
  )
}

export default UserWidget
