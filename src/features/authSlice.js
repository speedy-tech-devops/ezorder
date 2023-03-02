import { createSlice } from '@reduxjs/toolkit'
import { userLogin, userProfile, userRefresh, userTokenMe } from '../actions/authAction'
import AsyncStorage from '@react-native-async-storage/async-storage';
const accessToken = null
const refreshToken = null

const initialState = {
  loading: false,
  isLoggedIn: false,
  refreshExpire: false,
  userInfo: {}, // for user object
  branch: "",
  accessToken,
  refreshToken,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear() // deletes token from storage
      state.isLoggedIn = false
      state.accessToken = null
      state.refreshToken = null
      // state.branch = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true
        state.isLoggedIn = false
        state.error = null
        // state.branch = null
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false
        state.isLoggedIn = true
        state.accessToken = payload.token
        state.refreshToken = payload.refresh_token
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      .addCase(userProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(userProfile.fulfilled, (state, { payload }) => {
        state.loading = false
        state.branch = payload.branch[0]?._id
        state.userInfo = payload
      })
      .addCase(userProfile.rejected, (state, { payload }) => {
        state.loading = false
        state.branch = ""
        state.error = payload
      })
      .addCase(userTokenMe.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(userTokenMe.fulfilled, (state, { payload }) => {
        state.loading = false
        state.branch = payload.branch[0]?._id
        state.userInfo = payload
      })
      .addCase(userTokenMe.rejected, (state, { payload }) => {
        state.loading = false
        state.branch = ""
        state.error = payload
      })
  },
})
export const { logout } = authSlice.actions

export default authSlice.reducer