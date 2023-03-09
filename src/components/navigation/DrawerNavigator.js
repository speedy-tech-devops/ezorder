import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Table from '../../screens/Table'
import BottomTabNavigator from './BottomTabNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../redux/actions/authAction';

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const { deviceId } = useSelector(state => state.auth)
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => dispatch(userLogout({ device_id: deviceId }))} />
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