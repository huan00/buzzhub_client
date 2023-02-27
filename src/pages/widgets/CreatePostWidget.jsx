import React, { useState } from 'react'
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import { AddPhotoAlternateOutlined, Edit, YouTube } from '@mui/icons-material'
import Dropzone from 'react-dropzone'

import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../store/store'
import { baseUrl } from '../../services/services'

const CreatePostWidget = () => {
  const [imageToggle, setImageToggle] = useState(false)
  const [post, setPost] = useState('')
  const [postImage, setPostImage] = useState('')
  const [postVideo, setPostVideo] = useState('')
  const theme = useTheme()
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch()

  const handlePost = async () => {
    const formData = new FormData()

    formData.append('userId', user.id)
    formData.append('description', post)
    formData.append('image', postImage)
    formData.append('video', postVideo)

    const res = await fetch(`${baseUrl}/buzzhub/posts/create`, {
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
  console.log(postVideo.name)

  const handleVideo = (video) => {
    setPostVideo(video)
    setPostImage('')
  }
  const handleImage = (image) => {
    setPostImage(image)
    setPostVideo('')
  }
  return (
    <Box
      width="100%"
      height="fit-content"
      p="1rem 3rem"
      backgroundColor={theme.palette.neutral.light}
      borderRadius="5px"
      alignItems="center"
      position="sticky"
      top="0"
      zIndex="2"
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
            src={`${baseUrl}${user.picturePath}`}
            alt="profile"
            width="100%"
            height="100%"
          />
        </Box>
        <TextField
          placeholder="What's on your mind?"
          name="description"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          sx={{ width: '80%', ml: '1rem' }}
        />
      </Box>
      {(imageToggle || post) && (
        <Box>
          <Dropzone
            acceptedFile=".jpg,.jepg,.png,.gif,.mp4"
            multiple={false}
            onDrop={(acceptedFiles) =>
              acceptedFiles[0].name.split('.')[1] === 'mp4'
                ? handleVideo(acceptedFiles[0])
                : handleImage(acceptedFiles[0])
            }
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
                  {!postImage && !postVideo ? (
                    <p>Drop your image/Video here</p>
                  ) : (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <p>{postImage ? postImage.name : postVideo.name}</p>
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
          <AddPhotoAlternateOutlined
            sx={{ color: theme.palette.primary.main }}
          />
          <Typography sx={{ color: theme.palette.primary.main }}>
            Image/Gif
          </Typography>
        </Box>

        <Box display="flex">
          {/* <Dropzone
            acceptedFile=".mp4"
            multiple={false}
            onDrop={(acceptedFile) => setPostVideo(acceptedFile[0])}
          >

          </Dropzone> */}
          <YouTube sx={{ color: theme.palette.neutral.mediumMain }} />
          <Typography sx={{ color: theme.palette.neutral.mediumMain }}>
            Video
          </Typography>
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
