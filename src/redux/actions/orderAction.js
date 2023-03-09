import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { baseUrl } from '../../services/endpoint'
import { logout } from '../features/authSlice';

export const orderList = createAsyncThunk('transaction/order',
    async (arg, { getState, rejectWithValue, dispatch }) => {
        try {
            const state = getState();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${state.auth.accessToken}`,
                    'speedy-branch': state.auth.branch
                },
            }
            const { data } = await axios.get(`${baseUrl}/v1/transaction/order`, config)
            return data
        } catch (error) {
            const state = getState();
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                if (error.response.status === 401) dispatch(logout())
                return rejectWithValue(error.response.data.message)
            }
            return rejectWithValue(error.message)

        }
    }
)

export const orderAccept = createAsyncThunk('transaction/accept',
    async (arg, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const config = {
                method: 'post',
                url: `${baseUrl}/v1/transaction/order/accept`,
                headers: {
                    'speedy-branch': state.auth.branch,
                    'Authorization': `Bearer ${state.auth.accessToken}`,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(arg)
            };
            const { data } = await axios(config)
            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                if (error.response.status === 401) dispatch(logout())
                return rejectWithValue(error.response.data.message)
            }
            return rejectWithValue(error.message)

        }
    }
)

export const checkBill = createAsyncThunk('transaction/checkbill',
    async (event, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const config = {
                method: 'post',
                url: `${baseUrl}/v1/transaction/checkbill`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.auth.accessToken}`,
                    'speedy-branch': state.auth.branch
                },
                data: event
            };
            const { data } = await axios(config)
            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                if (error.response.status === 401) dispatch(logout())
                return rejectWithValue(error.response.data.message)
            }
            return rejectWithValue(error.message)

        }
    }
)