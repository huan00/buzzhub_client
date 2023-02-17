import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../store/store'
import PostWidget from './PostWidget'

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const posts = useSelector((state) => state.posts)

  const getUserPost = async () => {
    const res = await fetch(`http://localhost:8000/buzzhub/posts/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Token ${token}` }
    })

    const data = await res.json()
    dispatch(setPosts(data))
  }

  const getPosts = async () => {
    const res = await fetch(`http://localhost:8000/buzzhub/posts`, {
      method: 'GET'
    })

    const data = await res.json()
    dispatch(setPosts(data))
  }

  useEffect(() => {
    if (isProfile) {
      getUserPost()
    } else {
      getPosts()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      {posts.map(
        ({
          comments,
          description,
          firstName,
          id,
          image,
          lastName,
          likes,
          location,
          userId,
          userPicturePath
        }) => (
          <PostWidget
            comments={comments}
            description={description}
            firstName={firstName}
            postId={id}
            imgUrl={image}
            lastName={lastName}
            likes={likes}
            location={location}
            postUserId={userId}
            key={id + Math.random()}
            userPicturePath={userPicturePath}
          />
        )
      )}
    </Box>
  )
}

export default PostsWidget
