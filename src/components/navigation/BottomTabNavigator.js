import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useEffect, useState } from 'react';
import { View, Alert, Image, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, AppRegistry } from 'react-native';
import Home from '../../screens/Home'
import Table from '../../screens/Table'
import History from '../../screens/History';
import Union from "../../../assets/union.svg";
import Tables from "../../../assets/dinner-table.svg";
import Historys from "../../../assets/history.svg";
import Text from '../../components/Text';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { userProfile, userFcmToken } from '../../redux/actions/authAction';

const Tab = createBottomTabNavigator()
function BottomTabNavigator({ navigation }) {
    const { isLogout, userInfo, accessToken, branch, fcmToken, deviceId } = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    // useEffect(() => {
    //     if (isLogout) navigation.navigate('Login')
    // }, [isLogout, dispatch])

    useEffect(() => {
        if (accessToken) dispatch(userProfile(accessToken))
    }, [accessToken])

    useEffect(() => {
        if (branch) dispatch(userFcmToken({ fcm_token: fcmToken, device_id: deviceId }))
    }, [branch])



    return (
        <>
            <SafeAreaView forceInset={{ top: 'never' }} style={styles.AndroidSafeArea}>
                <View style={styles.container}>
                    <View style={{ flexDirection: "row", padding: 15, alignContent: "center", alignItems: "center" }}>
                        <View style={{ elevation: 50 }}>
                            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                                <Ionicons name="menu-outline" size={30}></Ionicons>
                            </TouchableOpacity>
                        </View>
                        <View style={{ padding: 10 }}>
                            <Image style={styles.image} source={require('../../../assets/icon.png')}></Image>
                        </View>
                        <View style={{ padding: 3 }}>
                            <Text>{userInfo?.first_name} {userInfo?.last_name}</Text>
                        </View>
                    </View>
                </View>

                <Tab.Navigator initialRouteName="Order"
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            if (route.name === 'ออเดอร์') {
                                return <Union width={18} height={18} />
                            } else if (route.name === 'โต๊ะลูกค้า') {
                                return <Tables width={18} height={18} />
                            } else {
                                return <Historys width={18} height={18} />
                            }
                        },
                        tabBarActiveTintColor: '#16284B',
                        tabBarInactiveTintColor: 'gray',
                        tabBarStyle: { fontSize: 12, paddingBottom: 5 }
                    })}>
                    <Tab.Screen name="ออเดอร์" component={Home} options={{
                        headerShown: false,
                        tabBarLabel: () => { return <Text style={{ fontSize: 12 }}>ออเดอร์</Text> },
                        tabBarBadge: "N",
                        
                    }} />
                    <Tab.Screen name="โต๊ะลูกค้า" component={Table} options={{
                        headerShown: false,
                        tabBarLabel: () => { return <Text style={{ fontSize: 12 }}>โต๊ะลูกค้า</Text> },
                       
                    }} />
                    <Tab.Screen name="ประวัติออเดอร์" component={History} options={{
                        headerShown: false,
                        tabBarLabel: () => { return <Text style={{ fontSize: 12 }}>ประวัติออเดอร์</Text> },
                    }} />
                </Tab.Navigator>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    container: {
        backgroundColor: '#fff',
        height: 60,
        paddingLeft: 15,
        alignItems: "flex-start",
        justifyContent: "center",

    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 30
    }
});
export default BottomTabNavigator