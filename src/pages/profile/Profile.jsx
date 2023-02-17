import React from 'react'
import { Grid } from '@mui/material'
import UserWidget from '../widgets/UserWidget'
import CreatePostWidget from '../widgets/CreatePostWidget'
import PostsWidget from '../widgets/PostsWidget'
import FriendList from '../widgets/FriendList'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector((state) => state.user)

  return (
    <Grid container spacing={2} sx={{ mt: '1rem' }}>
      <Grid item xs={3}>
        <UserWidget userId={user.id} />
        <FriendList userId={user.id} />
      </Grid>
      <Grid item xs={8}>
        <CreatePostWidget />
        <PostsWidget userId={user.id} />
      </Grid>
    </Grid>
  )
}

export default Profile
