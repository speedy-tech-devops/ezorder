import { createSlice } from '@reduxjs/toolkit'
import { billingList, tableBooking, tableList } from '../actions/tableAction'

const initialState = {
  loading: false,
  tableState: null,
  tableDetail: null,
  billing: null,
  error: null
}

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tableList.pending, (state) => {
        state.loading = true
        state.error = null
        // state.branch = null
      })
      .addCase(tableList.fulfilled, (state, { payload }) => {
        state.loading = false
        state.tableState = payload
      })
      .addCase(tableList.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      .addCase(tableBooking.pending, (state) => {
        state.loading = true
        state.error = null
        // state.branch = null
      })
      .addCase(tableBooking.fulfilled, (state, { payload }) => {
        state.loading = false
        state.tableDetail = payload.data
      })
      .addCase(tableBooking.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      .addCase(billingList.pending, (state) => {
        state.loading = true
        state.error = null
        // state.branch = null
      })
      .addCase(billingList.fulfilled, (state, { payload }) => {
        state.loading = false
        state.isLoggedIn = true
        state.billing = payload.data
      })
      .addCase(billingList.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })

  },
})
export const { logout } = tableSlice.actions

export default tableSlice.reducer