import { StatusBar } from 'expo-status-bar';
import React ,{ useEffect } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/stores';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Checkout from './src/screens/Checkout';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { name as appName } from "./app.json"; 
import { connect } from 'react-redux';
import Routes from './src/routers';

import DrawerNavigator from './src/components/navigation/DrawerNavigator';
import { useFonts } from 'expo-font';
import Text from './src/components/Text';
import {Ionicons} from '@expo/vector-icons';
import Tabledetail from './src/screens/Tabledetail';
import Qrcode from './src/screens/Qrcode';
import Camera from './src/screens/Camera';
import HistoryBill from './src/screens/HistoryBill';
import {AuthProvider} from './context/AuthProvider';
// import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
// const firebaseConfig = {
//   apiKey: "AIzaSyBFa_3D8d_Dr0M5h5d9ZiOZGAbBbXBrQZM",
//   authDomain: "ezorder-5e592.firebaseapp.com",
//   projectId: "ezorder-5e592",
//   databaseURL : "ezorder-5e592",
//   storageBucket: "ezorder-5e592.appspot.com",
//   messagingSenderId: "197533544935",
//   appId: "1:197533544935:web:539773013080b68cf5cd42",
//   measurementId: "G-7XDYV5YEB9"
// };

// firebase.initializeApp(firebaseConfig);
const Stack = createStackNavigator();
function App({route}) {
  const [loaded] = useFonts({
    'Kanit-Light': require('./assets/fonts/Kanit-Light.ttf'),
    'Kanit-Regular': require('./assets/fonts/Kanit-Regular.ttf'),
    'Kanit-Bold': require('./assets/fonts/Kanit-SemiBold.ttf'),
  });
  // async function requestUserPermission() {
  //   const authStatus = await firebase.messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }
  useEffect(()=>{
    // if (requestUserPermission()) {
    //   firebase.messaging().getToken().then(token => {
    //     console.log(token);
    //   })
    // } else {
    //   console.log(authStatus);
    // }
  },[])
  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='Menu' component={DrawerNavigator} options={{ headerShown: false }}  />
            <Stack.Screen name='Checkout' component={Checkout} options={{
            title: <Text>ชำระเงิน</Text>,
            headerBackTitleVisible : true,
            headerBackTitle : <Text>ออเดอร์</Text>,
            headerTintColor : "#000",
            headerBackTitleStyle: {
              fontSize: 14,
            }
          }}  />
          <Stack.Screen name="TableDetail" component={Tabledetail}  options={Tabledetail.defaultNavigationOptions}/>
          <Stack.Screen name="HistoryBill" component={HistoryBill}  options={HistoryBill.defaultNavigationOptions}/>
          <Stack.Screen name="Qrcode" component={Qrcode}  options={Qrcode.defaultNavigationOptions}/>
          <Stack.Screen name="Camera" component={Camera}  options={Camera.defaultNavigationOptions}/>
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar backgroundColor='#000'></StatusBar>
      </AuthProvider>
    </Provider>
  );
}
AppRegistry.registerComponent(appName, () => App);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App

