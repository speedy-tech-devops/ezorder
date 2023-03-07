import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Table from '../../screens/Table'
import BottomTabNavigator from './BottomTabNavigator';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/authSlice';

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => dispatch(logout())} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();
function DrawerNavigator({ navigation }) {
  return (
    <>
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}  >
        <Drawer.Screen name="Home" component={BottomTabNavigator} options={{
          headerShown:
            false
        }} />
        <Drawer.Screen name="Table" component={Table} />
      </Drawer.Navigator>
    </>
  );
}

export default DrawerNavigator