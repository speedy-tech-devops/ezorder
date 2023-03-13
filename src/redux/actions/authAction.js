import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { baseUrl } from '../../services/endpoint'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../features/authSlice';

export const userLogin = createAsyncThunk('auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const { data } = await axios.post(`${baseUrl}/v1/auth/merchant/login`, { email, password }, config)

            await AsyncStorage.setItem('accessToken', data.token)
            await AsyncStorage.setItem('refreshToken', data.refresh_token)
            return data
        } catch (error) {
            console.log(error);
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            }

            return rejectWithValue(error.message)

        }
    }
)

export const userFcmToken = createAsyncThunk('auth/fcmToken',
    async ({ fcm_token, device_id }, { rejectWithValue, getState, dispatch }) => {
        try {
            const state = getState();

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${state.auth.accessToken}`,
                    'speedy-branch': state.auth.branch,
                    'os-type': 'android'
                },
            }
            const { data } = await axios.post(`${baseUrl}/v1/auth/merchant/fcmToken`, { fcm_token, device_id }, config)
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

export const userProfile = createAsyncThunk('auth/me',
    async (arg, { getState, rejectWithValue, dispatch }) => {
        try {
            const state = getState();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${state.auth.accessToken}`
                },
            }
            const { data } = await axios.get(`${baseUrl}/v1/auth/merchant/me`, config)
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

export const userRefresh = createAsyncThunk('auth/refresh',
    async (arg, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${state.auth.refreshToken}`,
                    'speedy-branch': state.auth.branch,
                },
            }
            const { data } = await axios.post(`${baseUrl}/v1/auth/merchant/refresh`, {}, config)
            await AsyncStorage.setItem('accessToken', data.token)
            await AsyncStorage.setItem('refreshToken', data.refresh_token)
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

export const userLogout = createAsyncThunk('auth/logout',
    async ({ device_id }, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${state.auth.accessToken}`,
                    'speedy-branch': state.auth.branch
                },
            }

            const { data } = await axios.post(`${baseUrl}/v1/auth/merchant/logout`, { device_id }, config)
            await AsyncStorage.clear()
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