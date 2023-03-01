import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect ,useState } from 'react';
import { View , Button ,Image,StyleSheet,TextInput ,TouchableOpacity, SafeAreaView, AppRegistry } from 'react-native';
import Home from '../../screens/Home'
import Order from '../../screens/Order'
import Table from '../../screens/Table'
import History from '../../screens/History';
import Union from "../../../assets/union.svg";
import Tables from "../../../assets/dinner-table.svg";
import Historys from "../../../assets/history.svg";
import Text from '../../components/Text';
import {Ionicons} from '@expo/vector-icons';
import { useSelector } from 'react-redux';
const Tab = createBottomTabNavigator()
function BottomTabNavigator({navigation}) {
    const { auth } = useSelector((state) => state);
    return (
        <SafeAreaView forceInset={{ top: 'never'}} style={{ flex: 1,backgroundColor : "#fff" }}>
        <View style={styles.container}>
            <View style={{flexDirection : "row" , padding: 15 , alignContent : "center" , alignItems : "center"}}>
                <View style={{elevation: 50}}>
                    <TouchableOpacity  onPress={() => navigation.openDrawer()}>
                    <Ionicons name="menu-outline" size={30}></Ionicons>
                    </TouchableOpacity>
                </View>
                <View style={{padding: 10}}>
                    <Image style={styles.image} source={require('../../../assets/icon.png')}></Image>
                </View>
                <View style={{padding: 3}}>
                    <Text>{auth?.userInfo?.first_name} {auth?.userInfo?.last_name}</Text>
                </View>
            </View>
        </View>
        
        <Tab.Navigator initialRouteName="Order" screenOptions={{
            tabBarActiveTintColor: '#16284B',
            tabBarStyle: {fontSize : 12}
        }}>
            <Tab.Screen name="ออเดอร์" component={Home} options={{
                headerShown: false,
                tabBarLabel: () => { return <Text style={{fontSize : 12}}>ออเดอร์</Text>},
                tabBarBadge: "N",
                TabBarIcon: ({ focused, color, size }) => (
                    <Union width={18} height={18} />
                ),
            }} />
            <Tab.Screen name="โต๊ะลูกค้า" component={Table} options={{
                headerShown: false,
                tabBarLabel: () => { return <Text style={{fontSize : 12}}>โต๊ะลูกค้า</Text>},
                TabBarIcon: ({ focused, color, size }) => (
                    <Tables width={18} height={18} />
                ),
            }} />
            <Tab.Screen name="ประวัติออเดอร์" component={History} options={{
                headerShown: false,
                tabBarLabel: () => { return <Text style={{fontSize : 12}}>ประวัติออเดอร์</Text>},
                TabBarIcon: ({ focused, color, size }) => (
                    <Historys width={18} height={18} />
                ),
            }} />
        </Tab.Navigator>
        </SafeAreaView>
        
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 60,
        paddingLeft : 15,
        alignItems : "flex-start",
        justifyContent : "center",
        
       },
       image :{
          width: 30,
          height: 30,
          borderRadius : 30
      }
  });
export default BottomTabNavigator