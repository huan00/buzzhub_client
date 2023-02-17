import React, { useState } from 'react'
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import {
  AddPhotoAlternateOutlined,
  Gif,
  AttachFile,
  Mic,
  Edit
} from '@mui/icons-material'
import Dropzone from 'react-dropzone'

import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../store/store'

const CreatePostWidget = () => {
  const [imageToggle, setImageToggle] = useState(false)
  const [post, setPost] = useState('')
  const [postImage, setPostImage] = useState('')
  const theme = useTheme()
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch()

  const handlePost = async () => {
    const formData = new FormData()

    formData.append('userId', user.id)
    formData.append('description', post.description)
    formData.append('image', postImage)

    const res = await fetch('http://localhost:8000/buzzhub/posts/create', {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`
      },
      body: formData
    })

    const data = await res.json()

    dispatch(setPosts(data))
    setPost('')
    setPostImage(null)
  }

  return (
    <Box
      width="100%"
      height="fit-content"
      p="1rem 3rem"
      backgroundColor={theme.palette.neutral.light}
      borderRadius="5px"
      alignItems="center"
    >
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        pb="1rem"
      >
        <Box
          width="75px"
          height="75px"
          border={`1px solid ${theme.palette.neutral.medium}`}
          borderRadius="50%"
          display="flex"
          justifyContent="center"
          alignItems={'center'}
          overflow="hidden"
        >
          <img
            src={`http://localhost:8000${user.picturePath}`}
            alt="profile"
            width="100%"
            height="100%"
          />
        </Box>
        <TextField
          placeholder="What's on your mind?"
          name="description"
          value={post}
          onChange={(e) => setPost({ [e.target.name]: e.target.value })}
          sx={{ width: '80%', ml: '1rem' }}
        />
      </Box>
      {imageToggle && (
        <Box>
          <Dropzone
            acceptedFile=".jpg,.jepg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setPostImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <Box
                border={`1px solid ${theme.palette.neutral.dark}`}
                sx={{ '&:hover': { cursor: 'pointer' }, borderRadius: '50px' }}
                p="0 1rem"
                mb="1rem"
              >
                <Box {...getRootProps()}>
                  <input {...getInputProps()} />
                  {!postImage ? (
                    <p>Drop your image here</p>
                  ) : (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <p>{postImage.name}</p>
                      <Edit />
                    </Box>
                  )}
                </Box>
              </Box>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider />

      <Box display="flex" justifyContent="space-between" pt="1rem">
        <Box
          display="flex"
          onClick={() => setImageToggle((imageToggle) => !imageToggle)}
          sx={{ '&:hover': { cursor: 'pointer' } }}
        >
          <AddPhotoAlternateOutlined />
          <Typography>Image</Typography>
        </Box>
        <Box display="flex">
          <Gif />
          <Typography>Gif</Typography>
        </Box>
        <Box display="flex">
          <AttachFile />
          <Typography>Attachment</Typography>
        </Box>
        <Box display="flex">
          <Mic />
          <Typography>Voice</Typography>
        </Box>
        <Button
          variant="contained"
          sx={{ borderRadius: '2rem', p: '0 2rem' }}
          onClick={handlePost}
        >
          Post
        </Button>
      </Box>
    </Box>
  )
}

export default CreatePostWidget
