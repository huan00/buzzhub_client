import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import Navbar from '../navbar/Navbar'
import UserWidget from '../widgets/UserWidget'
import CreatePostWidget from '../widgets/CreatePostWidget'
import PostsWidget from '../widgets/PostsWidget'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../store/store'
import Weather from '../widgets/Weather'
import FriendList from '../widgets/FriendList'

const Home = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(useSelector((state) => state.user))
  const posts = useSelector((state) => state.posts)

  const token = useSelector((state) => state.token)
  const getPost = async () => {
    const res = await fetch(`http://localhost:8000/buzzhub/posts`, {
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
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Navbar />
      </Grid>
      <Grid container xs={12} spacing={2} mt="1rem" p="0 2rem">
        <Grid item xs={3}>
          <UserWidget xs={3} />
        </Grid>
        <Grid item xs={6}>
          <CreatePostWidget />
          {posts.map((post) => (
            <PostsWidget
              description={post.description}
              likes={post.likes}
              imgUrl={post.image}
              comments={post.comments}
              postUserId={post.userId}
              firstName={post.firstName}
              lastName={post.lastName}
              key={post.id}
              postId={post.id}
            />
          ))}
        </Grid>
        <Grid item xs={3}>
          <Weather />
          <FriendList />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Home
