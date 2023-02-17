import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: 'light',
  user: null,
  token: null,
  posts: []
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
    },
    setPosts: (state, action) => {
      state.posts = [...action.payload]
    },
    setPost: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) return action.payload
        return post
      })
    }
  }
})

export const { setMode, setLogin, setUser, setLogout, setPosts, setPost } =
  authSlice.actions

export default authSlice.reducer
