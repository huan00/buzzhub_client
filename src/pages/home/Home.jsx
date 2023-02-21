import React, { useEffect } from 'react'
import { Grid } from '@mui/material'

import UserWidget from '../widgets/UserWidget'
import CreatePostWidget from '../widgets/CreatePostWidget'

import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../store/store'
import Weather from '../widgets/Weather'
import FriendList from '../widgets/FriendList'
import PostsWidget from '../widgets/PostsWidget'
import { baseUrl } from '../../services/services'

const Home = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const token = useSelector((state) => state.token)
  const getPost = async () => {
    const res = await fetch(`${baseUrl}/buzzhub/posts`, {
      method: 'GET',
      headers: { Authorization: `Token ${token}` }
    })

    const data = await res.json()
    if (data) {
      dispatch(setPosts(data))
    }
  }

  useEffect(() => {
    getPost()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Grid container columnSpacing={2} mt="1rem" sx={{ paddingTop: '0' }}>
      <Grid item xs={3}>
        <UserWidget userId={user.id} />
      </Grid>
      <Grid item xs={6} sx={{ height: '90vh', overflow: 'auto' }}>
        <CreatePostWidget />
        <PostsWidget userId={user.id} />
      </Grid>
      <Grid item xs={3}>
        <Weather />
        <FriendList userId={user.id} />
      </Grid>
    </Grid>
  )
}

export default Home
