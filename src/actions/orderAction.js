import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { baseUrl } from '../services/endpoint'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const orderList = createAsyncThunk('auth/me',
    async (arg, { getState, rejectWithValue, dispatch }) => {
        try {
            const state = getState();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${state.auth.accessToken}`
                },
            }
            const { data } = await axios.get(`${baseUrl}/v1/management/order`, config)
            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                if (error.response.status === 401) dispatch(userRefresh())
                return rejectWithValue(error.response.data.message)
            }
            return rejectWithValue(error.message)

        }
    }
)

export const orderSendOrder = createAsyncThunk('auth/refresh',
    async (arg, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${state.auth.refreshToken}`
                },
            }
            const { data } = await axios.post(`${baseUrl}/v1/auth/refresh`, {}, config)
            AsyncStorage.setItem('accessToken', data.token)
            AsyncStorage.setItem('refreshToken', data.refresh_token)
            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            }
            return rejectWithValue(error.message)

        }
    }
)