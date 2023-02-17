import React, { useEffect, useState } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { Favorite, FavoriteBorder, Comment, Share } from '@mui/icons-material'
import Banner from '../../components/Banner'
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from '../../store/store'

const PostsWidget = ({
  description,
  imgUrl,
  likes,
  comments,
  postUserId,
  lastName,
  firstName,
  postId
}) => {
  const theme = useTheme()
  const [isComment, setIsComment] = useState(false)
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch()

  const handleLikes = async () => {
    const res = await fetch(
      `http://localhost:8000/buzzhub/posts/likes/${postId}`,
      {
        method: 'GET',
        headers: { Authorization: `Token ${token}` }
      }
    )
    const data = await res.json()
    dispatch(setPost(data))
  }

  const handleComments = async () => {}

  return (
    <Box
      backgroundColor={theme.palette.neutral.light}
      mt="1.5rem"
      p="1rem"
      borderRadius="5px"
    >
      <Banner
        postUserId={postUserId}
        firstName={firstName}
        lastName={lastName}
      />
      <Box>
        <Typography>{description}</Typography>
        <Box
          display="flex"
          justifyContent="center"
          borderRadius="20px"
          overflow="hidden"
          m="1rem 0"
        >
          <img
            src={`http://localhost:8000${imgUrl}`}
            alt="post"
            width="100%"
            height="100%"
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex">
            <Box display="flex" alignItems="center" mr="1rem">
              {Object.keys(likes)?.length === 0 ? (
                <FavoriteBorder
                  onClick={handleLikes}
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                />
              ) : (
                <Favorite
                  onClick={handleLikes}
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                />
              )}

              <Typography>{Object.keys(likes)?.length}</Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Comment
                onClick={() => setIsComment((isComment) => !isComment)}
              />
              <Typography>{Object.keys(comments)?.length}</Typography>
            </Box>
          </Box>
          <Share />
        </Box>
        {isComment ? (
          <Box maxHeight="300px" mt="1rem">
            {Object.entries(comments).map((commenter, comment) => (
              <Typography>
                {commenter}: {comment}
              </Typography>
            ))}
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  )
}

export default PostsWidget
