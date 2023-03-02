import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from "react"
import { userTokenMe } from '../src/actions/authAction';
import { useDispatch, useSelector } from 'react-redux'
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch()
    const {accessToken,error} = auth;
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const loadUserFromCookies = async () => {
        const authDataSerialized = await AsyncStorage.getItem('accessToken');
        try {
        const authDataSerialized = await AsyncStorage.getItem('accessToken');
        if (authDataSerialized) {
           await dispatch(userTokenMe(authDataSerialized))
        }else{
            
        }
        }catch(error){
        }
    }
    useEffect( () => {
        loadUserFromCookies()
    }, [])
    return (
        <AuthContext.Provider value={{user}}>
          {children}
        </AuthContext.Provider>
    )
}
// const MyContextProvider = ({children}) => {
//   const [authData, setAuthData] = useState();
//   //the AuthContext start with loading equals true
//   //and stay like this, until the data be load from Async Storage
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadStorageData();
//   }, []);
//   async function loadStorageData() {
//     try {
//       //Try get the data from Async Storage
//       const authDataSerialized = await AsyncStorage.getItem('accessToken');
//       alert(authDataSerialized)
//       if (authDataSerialized) {
//         //If there are data, it's converted to an Object and the state is updated.
        
//         const _authData = JSON.parse(authDataSerialized);
//         setAuthData(_authData);
//       }
//     } catch (error) {
//     } finally {
//       //loading finished
//       setLoading(false);
//     }
//   }
//   return (
//     <MyContext.Provider value={state}>
//       {children}
//     </MyContext.Provider>
//   );
// };