import { createSlice } from '@reduxjs/toolkit'
import { tableBilling, tableDetail, tableList } from '../actions/tableAction'


const initialState = {
  loading: false,
  isLoggedIn: false,
  tableState: null, // for user object
  tableDetail : null,
  error: null
}

const tableSlice = createSlice({
  name: 'table',
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
      .addCase(tableList.pending, (state) => {
        state.loading = true
        state.isLoggedIn = false
        state.error = null
        // state.branch = null
      })
      .addCase(tableList.fulfilled, (state, { payload }) => {
        state.loading = false
        state.isLoggedIn = true
        state.tableState = payload
      })
      .addCase(tableList.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      .addCase(tableDetail.pending, (state) => {
        state.loading = true
        state.isLoggedIn = false
        state.error = null
        // state.branch = null
      })
      .addCase(tableDetail.fulfilled, (state, { payload }) => {
        state.loading = false
        state.isLoggedIn = true
        state.tableDetail = payload.data
      })
      .addCase(tableDetail.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      .addCase(tableBilling.pending, (state) => {
        state.loading = true
        state.isLoggedIn = false
        state.error = null
        // state.branch = null
      })
      .addCase(tableBilling.fulfilled, (state, { payload }) => {
        state.loading = false
        state.isLoggedIn = true
        state.tableBilling = payload.data
      })
      .addCase(tableBilling.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      
  },
})
export const { logout } = tableSlice.actions

export default tableSlice.reducer