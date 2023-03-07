import React, { useEffect, useState } from 'react';
import { View, Alert, Button, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Text from '../components/Text';
import { tableDetail, tableList } from '../redux/actions/tableAction';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
const Stack = createNativeStackNavigator();
function TableDetail({ route, navigation }) {
  const { table, auth } = useSelector((state) => state);
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const { itemId, otherParam } = route.params;
  const ApporoveOrder = () =>
    Alert.alert('ยืนยันออเดอร์', 'คุณต้องการส่งออเดอร์นี้ใช่หรือไม่', [
      {
        text: 'ยกเลิก',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'ยืนยัน', onPress: () => console.log('OK Pressed')
      },
    ]);
  const ApporoveServeOrders
    = () =>
      Alert.alert('เสิร์ฟออเดอร์', 'คุณเสิร์ฟออเดอร์นี้เรียบร้อยแล้วใช่หรือไม่', [
        {
          text: 'ยกเลิก',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'ยืนยัน', onPress: () => console.log('OK Pressed')
        },
      ]);
  const CancelServeOrders = () =>
    Alert.alert('ยกเลิกออเดอร์', 'คุณต้องการยกเลิกเมนูนี้ใช่หรือไม่', [
      {
        text: 'ยกเลิก',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'ยืนยัน', onPress: () => console.log('OK Pressed')
      },
    ]);
  const TableLoadDetail = async () => {
    await dispatch(tableDetail(otherParam))
  }
  useEffect(() => {
    if (table?.tableDetail) {
      setData(table?.tableDetail)
    }
  }, [table])
  useEffect(() => {
    navigation.setOptions({
      title: itemId,
    });
    TableLoadDetail()
  }, [])

  return (
    data.length != 0 ?
      <>
        <ScrollView style={{ flex: 1 }}>

          <View style={{ flex: 1, textAlign: "left", margin: 0, flexDirection: "row", borderRadius: 10, }}>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 0, justifyContent: "space-between", textAlign: "left", padding: 10, paddingLeft: 15, backgroundColor: "#F7F7F7", flexDirection: "row" }}>
                <Text>หมายเลขบิล: {data.billing_no}</Text>
                <Text>หมดเวลา: <Text style={{ color: "red" }}>{moment(data.order_date).format('hh:mm')}</Text></Text>
              </View>
              {
                data.orders.map((order, i) => {
                  return (
                    <View style={{ marginBottom: 10 }} key={i}>
                      <View style={{ flex: 0, justifyContent: "space-between", textAlign: "left", padding: 10, paddingLeft: 15, backgroundColor: "#16284B", flexDirection: "row" }}>
                        <Text style={{ color: "#fff" }}>{order.order_no}</Text>
                        <Text style={{ color: "#fff" }}>{moment(order.order_date).format('hh:mm')} น.</Text>
                      </View>
                      {/* ItemList */}
                      {
                        order.details.map((orderdetail, i) => {
                          return (
                            <View key={i + orderdetail._id} style={{ flex: 0, textAlign: "left", padding: 15, paddingLeft: 20, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#F0F0F0", flexDirection: 'row' }}>
                              <View style={{ flex: 1, paddingRight: 15 }}>
                                <Text style={{ fontSize: 16, paddingBottom: 5, fontFamily: "Kanit-Bold" }}>{orderdetail.product.name['th']}</Text>
                                <Text style={{ fontSize: 14, }}>{orderdetail.options.map((opt) => { return opt.option.name['th'] + "," })}</Text>
                                {orderdetail.note && <Text style={{ fontSize: 14, color: "red" }}>{orderdetail.note}</Text>}

                                <View style={{ marginTop: 10 }}>
                                  <View style={{ backgroundColor: (orderdetail.status == "PENDING" && "#FFA800" || orderdetail.status == "PROCESSING" || orderdetail.status == "COMPLETE" && "#00D42F" || orderdetail.status == "REJECTED" && "#FF0000"), padding: 5, borderRadius: 5, alignSelf: 'flex-start' }}>
                                    <Text style={{ fontSize: 12, color: "#fff" }}>{orderdetail.status}</Text>
                                  </View>
                                </View>
                              </View>
                              <View style={{ paddingBottom: 15 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Kanit-Bold" }}>฿{orderdetail.amount} x {orderdetail.qty}</Text>
                              </View>
                            </View>
                          )
                        })
                      }
                    </View>
                  )
                })
              }
            </View>
          </View>
        </ScrollView>
        <SafeAreaView style={{ backgroundColor: "#fff" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ padding: 15, paddingLeft: 20 }}>
              <Text style={{ fontSize: 12 }}>รวมค่าอาหาร</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Kanit-Bold", color: "red" }}>฿{parseInt(data.total_amount).toFixed(2)}</Text>
            </View>
            <View style={{ padding: 15, paddingLeft: 20 }}>
              <TouchableOpacity style={{ width: 194, height: 48, borderColor: "#16284B", borderWidth: 1, alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: "#16284B" }} onPress={() => navigation.navigate('Checkout', {
                itemId: itemId
              })}>
                <Text style={{ fontSize: 16, fontFamily: "Kanit-Bold", color: "#fff" }}>เช็คบิล</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>

      </> :
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: "left" }}>
        <View style={{ paddingBottom: 30 }}>
          <Image source={require('../../assets/Notbill.png')}></Image>
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>TableDetail</Text>
        <Text style={{ color: "#949494" }}>ยังไม่มีรายการใหม่เข้ามา</Text>
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 30
  },
  inputView: {
    backgroundColor: "#eee",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "flex-start",
  },
  loginBtn: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    backgroundColor: "#16284B",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  loginText: {
    color: "#fff"
  }

});
TableDetail.defaultNavigationOptions = ({ navigation }) => {
  return {
    title: 'My home',
    headerBackTitleVisible: true,
    headerBackTitle: <Text>โต๊ะ</Text>,
    headerTintColor: "#000",
    headerBackTitleStyle: {
      fontSize: 14,
    }

  }
}
export default TableDetail;