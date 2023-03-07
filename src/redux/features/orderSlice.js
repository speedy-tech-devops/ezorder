import { createSlice } from '@reduxjs/toolkit'
import { orderAccept, orderList } from '../actions/orderAction'

const initialState = {
  loading: false,
  orders: [],
  error: null
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(orderList.pending, (state) => {
        state.loading = true
        state.error = null
        // state.branch = null
      })
      .addCase(orderList.fulfilled, (state, { payload }) => {
        state.loading = false
        state.isLoggedIn = true
        state.orders = payload.data
      })
      .addCase(orderList.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      .addCase(orderAccept.pending, (state) => {
        state.loading = true
        state.error = null
        // state.branch = null
      })
      .addCase(orderAccept.fulfilled, (state, { payload }) => {
        state.loading = false
        // state.orders = payload
      })
      .addCase(orderAccept.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  },
})
export const { logout } = orderSlice.actions

export default orderSlice.reducer