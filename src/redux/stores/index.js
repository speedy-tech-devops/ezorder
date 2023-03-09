import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import orderSlice from '../features/orderSlice'
import tableSlice from '../features/tableSlice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        order: orderSlice,
        table: tableSlice
    },
})

export default store