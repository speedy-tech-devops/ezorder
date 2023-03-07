import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../services/endpoint';
import { logout } from '../features/authSlice';

export const tableList = createAsyncThunk('transaction/table',
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
            const { data } = await axios.get(`${baseUrl}/v1/transaction/table`, config)
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

export const tableDetail = createAsyncThunk('transaction/table/booking',
    async (bookingId, { getState, rejectWithValue, dispatch }) => {
        try {
            const state = getState();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${state.auth.accessToken}`,
                    'speedy-branch': state.auth.branch
                },
            }
            const { data } = await axios.get(`${baseUrl}/v1/transaction/table/${bookingId}`, config)
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
export const tableBilling = createAsyncThunk('transaction/table/billing',
    async (billingId, { getState, rejectWithValue, dispatch }) => {
        try {
            const state = getState();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${state.auth.accessToken}`,
                    'speedy-branch': state.auth.branch
                },
            }
            const { data } = await axios.get(`${baseUrl}/v1/transaction/billing/summary/${billingId}`, config)
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