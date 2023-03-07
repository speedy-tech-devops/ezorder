import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NewOrder from '../../screens/NewOrder'
import Bill from '../../screens/Bill'
import Service from '../../screens/Service'
import Text from '../../components/Text';
const Tab = createMaterialTopTabNavigator();

function TopTabNavigator() {
    return (

        <Tab.Navigator screenOptions={{
            "tabBarActiveTintColor": "#16284B",
            "tabBarInactiveTintColor": "#989898",
            "tabBarPressColor": "#000",
            "tabBarShowIcon": true,
            "tabBarLabelStyle": {
                "fontSize": 13
            },
            "tabBarIndicatorStyle": {
                "backgroundColor": "#16284B"
            }
        }}>
            <Tab.Screen name="ออเดอร์ใหม่" component={NewOrder} options={{
                tabBarLabel: () => { return <Text>ออเดอร์ใหม่</Text> }
            }} />
            <Tab.Screen name="เรียกรับบริการ" component={Service} options={{
                tabBarLabel: () => { return <Text>เรียกรับบริการ</Text> }
            }} />
            <Tab.Screen name="เช็คบิล" component={Bill} options={{
                tabBarLabel: () => { return <Text>เช็คบิล</Text> }
            }} />
        </Tab.Navigator>
    );
}
export default TopTabNavigator