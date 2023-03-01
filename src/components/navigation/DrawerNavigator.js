import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../../screens/Home'
import Order from '../../screens/Order'
import Table from '../../screens/Table'
import History from '../../screens/History';
import { useEffect } from 'react';
import { DrawerActions } from 'react-navigation';
import BottomTabNavigator from './BottomTabNavigator';
import { SafeAreaView, View } from 'react-native';
import TopTabNavigator from './TopTabNavigator';
const Drawer = createDrawerNavigator();

function DrawerNavigator({navigation}) {
  return (
    <>
        <Drawer.Navigator initialRouteName="Home"  >
            <Drawer.Screen name="Home" component={BottomTabNavigator} options={{
                headerShown: 
                false
            }}/>
            <Drawer.Screen name="Table" component={Table} />
        </Drawer.Navigator>
    </>
  );
}

export default DrawerNavigator