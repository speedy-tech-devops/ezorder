import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';

import Login from './src/screens/Login';
import Checkout from './src/screens/Checkout';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import DrawerNavigator from './src/components/navigation/DrawerNavigator';
import { useFonts } from 'expo-font';
import Text from './src/components/Text';
import TableDetail from './src/screens/TableDetail';
import Qrcode from './src/screens/Qrcode';
import Camera from './src/screens/Camera';
import HistoryBill from './src/screens/HistoryBill';
import { AuthProvider } from './context/AuthProvider';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { orderList } from './src/redux/actions/orderAction';
import { changeFcmToken } from './src/redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
//import DeviceInfo which will help us to get UniqueId
const Stack = createStackNavigator();

function App() {
  // const navigation = useNavigation();
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth)

  const [loaded] = useFonts({
    'Kanit-Light': require('./assets/fonts/Kanit-Light.ttf'),
    'Kanit-Regular': require('./assets/fonts/Kanit-Regular.ttf'),
    'Kanit-Bold': require('./assets/fonts/Kanit-SemiBold.ttf'),
  });
  const [loading, setLoading] = useState()
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    if (requestUserPermission()) {
      messaging().getToken().then(token => {
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
        setLoading(false);
      });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      dispatch(orderList())
      // console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      dispatch(orderList())
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, [])


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

