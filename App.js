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
import {AuthProvider} from './src/context/AuthProvider';
import messaging from '@react-native-firebase/messaging';
const Stack = createStackNavigator();
function App({route}) {
  const [loaded] = useFonts({
    'Kanit-Light': require('./assets/fonts/Kanit-Light.ttf'),
    'Kanit-Regular': require('./assets/fonts/Kanit-Regular.ttf'),
    'Kanit-Bold': require('./assets/fonts/Kanit-SemiBold.ttf'),
  });
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  useEffect(()=>{
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
              fontSize: "14px",
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

