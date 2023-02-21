import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import Banner from '../../components/Banner'
import { useSelector } from 'react-redux'
import { useTheme } from '@emotion/react'
import { baseUrl } from '../../services/services'

const FriendList = ({ userId }) => {
  const [friends, setFriends] = useState([])
  const token = useSelector((state) => state.token)
  const theme = useTheme()

  const getFriendListDetail = async () => {
    const res = await fetch(`${baseUrl}/buzzhub/user/${userId}/friends`, {
      method: 'GET',
      headers: { Authorization: `Token ${token}` }
    })

    const data = await res.json()
    setFriends(data)
  }

  useEffect(() => {
    getFriendListDetail()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box backgroundColor={theme.palette.neutral.light} borderRadius="5px">
      <Typography variant="h5" textAlign="center">
        Your Current Friends
      </Typography>
      <Box p="1rem">
        {friends?.map((friend) => (
          <Banner
            key={Math.random()}
            postUserId={friend.id}
            firstName={friend.firstName}
            lastName={friend.lastName}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </Box>
  )
}

export default FriendList
