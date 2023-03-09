import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';

import Login from './src/screens/Login';
import Checkout from './src/screens/Checkout';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/components/navigation/DrawerNavigator';
import { useFonts } from 'expo-font';
import Text from './src/components/Text';
import TableDetail from './src/screens/TableDetail';
import Qrcode from './src/screens/Qrcode';
import Camera from './src/screens/Camera';
import HistoryBill from './src/screens/HistoryBill';
import { AuthProvider } from './context/AuthProvider';
import messaging from '@react-native-firebase/messaging';
import {
  View,
  ActivityIndicator,
} from 'react-native';

import { userProfile } from './src/redux/actions/authAction';
import { orderList } from './src/redux/actions/orderAction';
import { tableList } from './src/redux/actions/tableAction';
import { changeFcmToken, changeDeviceId, setLoadingToken } from './src/redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import * as Application from 'expo-application';
import { Platform } from 'expo-modules-core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';


function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text>Getting token...</Text> */}
      <ActivityIndicator size="large" />
    </View>
  );
}
const Stack = createStackNavigator();

function App() {
  // const navigation = useNavigation();
  const dispatch = useDispatch()
  const { loadingToken, isLoggedIn, accessToken, error } = useSelector(state => state.auth)

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
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
    }
  }

  const getDeviceId = async () => {
    let deviceId = null
    if (Platform.OS === 'android') {
      deviceId = Application.androidId;
    } else {
      deviceId = await AsyncStorage.getItem('deviceId').catch((err) => console.log(err)) || null;
      if (!deviceId) {
        deviceId = Constants.deviceId; //or generate uuid
        await AsyncStorage.getItem('deviceId', deviceId).catch((err) => console.log(err));
      }
    }
    const payload = { deviceId: deviceId }
    await dispatch(changeDeviceId(payload))
  }

  useEffect(() => {
    if (requestUserPermission()) {
      messaging().getToken().then(token => {
        getDeviceId()
        const payload = { token }
        dispatch(changeFcmToken(payload))
        // console.log('fcm token', token);
      })
    } else {
      console.log(authStatus);
    }

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      dispatch(orderList())
      dispatch(tableList())
      // console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      dispatch(orderList())
      dispatch(tableList())
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, [])

  useEffect(() => {
    const loadProfile = async () => {
      await dispatch(userProfile(accessToken))
      if (!error || error == null) await dispatch(setLoadingToken())
    }
    if (!isLoggedIn && accessToken) loadProfile()
  }, [accessToken])

  if (accessToken && loadingToken) {
    return <SplashScreen />;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator >
          {isLoggedIn ? (
            <>
              <Stack.Screen name='Menu' component={DrawerNavigator} options={{ headerShown: false }} />
              <Stack.Screen name='Checkout' component={Checkout} options={{
                title: <Text>ชำระเงิน</Text>,
                headerBackTitleVisible: true,
                headerBackTitle: <Text>ออเดอร์</Text>,
                headerTintColor: "#000",
                headerBackTitleStyle: {
                  fontSize: 14,
                }
              }} />
              <Stack.Screen name="TableDetail" component={TableDetail} />
              <Stack.Screen name="HistoryBill" component={HistoryBill} />
              <Stack.Screen name="Qrcode" component={Qrcode} />
              <Stack.Screen name="Camera" component={Camera} />
            </>
          ) : (
            <>
              <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar backgroundColor='#000'></StatusBar>
    </AuthProvider>
  );
}

export default App

