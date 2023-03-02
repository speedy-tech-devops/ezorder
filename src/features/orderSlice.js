import { createSlice } from '@reduxjs/toolkit'
import { orderAccept, orderList } from '../actions/orderAction'


const initialState = {
  loading: false,
  isLoggedIn: false,
  orderState: {}, // for user object
  error: null
}

const orderSlice = createSlice({
  name: 'order',
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
      .addCase(orderList.pending, (state) => {
        state.loading = true
        state.isLoggedIn = false
        state.error = null
        // state.branch = null
      })
      .addCase(orderList.fulfilled, (state, { payload }) => {
        state.loading = false
        state.isLoggedIn = true
        state.orderState = payload
      })
      .addCase(orderList.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      .addCase(orderAccept.pending, (state) => {
        state.loading = true
        state.isLoggedIn = false
        state.error = null
        // state.branch = null
      })
      .addCase(orderAccept.fulfilled, (state, { payload }) => {
        state.loading = false
        state.isLoggedIn = true
        state.orderState = payload
      })
      .addCase(orderAccept.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  },
})
export const { logout } = orderSlice.actions

export default orderSlice.reducer