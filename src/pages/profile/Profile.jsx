import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import UserWidget from '../widgets/UserWidget'
import CreatePostWidget from '../widgets/CreatePostWidget'
import PostsWidget from '../widgets/PostsWidget'
import FriendList from '../widgets/FriendList'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../../services/services'

const Profile = () => {
  const [user, setUser] = useState(null)
  const token = useSelector((state) => state.token)
  const { id } = useParams()

  const getProfileUser = async () => {
    const res = await fetch(`${baseUrl}/buzzhub/user/${id}`, {
      method: 'GET',
      headers: { Authorization: `Token ${token}` }
    })
    const data = await res.json()
    setUser(data)
  }

  useEffect(() => {
    getProfileUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {user ? (
        <Grid container spacing={2} sx={{ mt: '1rem' }}>
          <Grid item xs={3}>
            <UserWidget userId={user.id} />
            <FriendList userId={user.id} />
          </Grid>
          <Grid item xs={8}>
            <CreatePostWidget />
            <PostsWidget userId={user.id} isProfile={true} />
          </Grid>
        </Grid>
      ) : (
        <Box>Loading</Box>
      )}
    </>
  )
}

export default Profile
