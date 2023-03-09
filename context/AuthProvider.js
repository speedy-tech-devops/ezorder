import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect } from "react"
import { changeToken } from '../src/redux/features/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch()
    const loadUserFromAsyncStorage = async () => {

        const authDataSerialized = await AsyncStorage.getItem('accessToken').catch((err) => console.log(err));
        const resetAuthDataSerialized = await AsyncStorage.getItem('refreshToken').catch((err) => console.log(err));
        const payload = { accessToken: authDataSerialized || null, refreshToken: resetAuthDataSerialized || null }
        await dispatch(changeToken(payload))
    }

    useEffect(() => {
        loadUserFromAsyncStorage()
    }, [])

    // useEffect(() => {
    //     if (accessToken) dispatch(userProfile(accessToken))
    // }, [accessToken])


    return (
        <AuthContext.Provider value={{ user: userInfo }}>
            {children}
        </AuthContext.Provider>
    )
}