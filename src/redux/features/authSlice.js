import { createSlice } from '@reduxjs/toolkit'
import { userLogin, userProfile, userFcmToken, userLogout } from '../actions/authAction'
import AsyncStorage from '@react-native-async-storage/async-storage';

const accessToken = null
const refreshToken = null

const initialState = {
  loading: false,
  loadingToken: true,
  isLoggedIn: false,
  refreshExpire: false,
  userInfo: {}, // for user object
  branch: "",
  accessToken,
  refreshToken,
  isLogout: false,
  error: null,
  fcmToken: null,
  deviceId: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: async (state) => {
      console.log('test');
      AsyncStorage.clear();
      state.isLoggedIn = false
      state.isLogout = true
      state.accessToken = null
      state.refreshToken = null
      state.branch = null
    },
    changeToken: (state, action) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    changeFcmToken: (state, action) => {
      state.fcmToken = action.payload.token
    },
    changeDeviceId: (state, action) => {
      state.deviceId = action.payload.deviceId
    },
    setLoadingToken: (state) => {
      state.loadingToken = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true
        state.loadingToken = false
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
        state.isLoggedIn = false
        state.error = payload
      })
      .addCase(userProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(userProfile.fulfilled, (state, { payload }) => {
        state.loading = false
        state.isLoggedIn = true
        state.branch = payload.branch[0]?._id
        state.userInfo = payload
      })
      .addCase(userProfile.rejected, (state, { payload }) => {
        state.loading = false
        state.branch = ""
        state.error = payload
      })
      .addCase(userFcmToken.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(userFcmToken.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(userFcmToken.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.isLoggedIn = false
        state.isLogout = true
        state.accessToken = null
        state.refreshToken = null
        state.branch = null
      })
      .addCase(userLogout.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  },
})
export const { logout, changeToken, changeFcmToken, changeDeviceId, setLoadingToken } = authSlice.actions

export default authSlice.reducer