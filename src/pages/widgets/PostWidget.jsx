import React, { useState } from 'react'
import {
  Box,
  Typography,
  useTheme,
  Button,
  Divider,
  InputBase
} from '@mui/material'
import { Favorite, FavoriteBorder, Comment, Share } from '@mui/icons-material'
import Banner from '../../components/Banner'
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from '../../store/store'

const PostWidget = ({
  description,
  imgUrl,
  likes,
  comments,
  postId,
  postUserId,
  lastName,
  firstName,
  userPicturePath
}) => {
  const theme = useTheme()
  const [isComment, setIsComment] = useState(false)
  const [comment, setComment] = useState('')
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLikes = async () => {
    const res = await fetch(
      `http://localhost:8000/buzzhub/posts/likes/${postId}`,
      {
        method: 'PATCH',
        headers: { Authorization: `Token ${token}` }
      }
    )
    const data = await res.json()
    dispatch(setPost(data))
  }

  const handleComments = async () => {
    if (comment) {
      const formData = new FormData()
      formData.append('comment', comment)
      const res = await fetch(
        `http://localhost:8000/buzzhub/posts/comment/${postId}`,
        {
          method: 'PATCH',
          headers: { Authorization: `Token ${token}` },
          body: formData
        }
      )
      const data = await res.json()
      dispatch(setPost(data))
      setComment('')
    }
  }

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
        userPicturePath={userPicturePath}
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
              {!likes[user.id] ? (
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
                sx={{ '&:hover': { cursor: 'pointer' } }}
              />
              <Typography>{Object.keys(comments)?.length}</Typography>
            </Box>
          </Box>
          <Share />
        </Box>

        {isComment ? (
          <>
            <Divider sx={{ mt: '1rem' }} />
            <Box maxHeight="300px" mt="1rem">
              {Object.entries(comments).map((comment) => (
                <Typography>{comment[1]}</Typography>
              ))}
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
      <Box display="flex" justifyContent="space-between" mt=".5rem">
        <InputBase
          onChange={(e) => {
            setComment(e.target.value)
          }}
          value={comment}
          sx={{
            border: `1px solid ${theme.palette.neutral.main}`,
            width: '80%',
            pl: '1rem'
          }}
        />
        <Button variant="contained" onClick={handleComments}>
          comment
        </Button>
      </Box>
    </Box>
  )
}

export default PostWidget
