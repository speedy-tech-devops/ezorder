import React, { useEffect, useState } from 'react';
import { View, Button, Alert, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Text from '../components/Text';
import { orderList, orderAccept } from '../redux/actions/orderAction';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';

function Order({ navigation }) {
  const { branch } = useSelector((state) => state.auth);
  const { orders, error } = useSelector((state) => state.order);
  const dispatch = useDispatch()
  useEffect(() => {
    if (branch) {
      dispatch(orderList())
    }
  }, [branch])
  const ApproveOrder = (order) =>
    Alert.alert('ยืนยันออเดอร์', 'คุณต้องการส่งออเดอร์นี้ใช่หรือไม่', [
      {
        text: 'ยกเลิก',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'ยืนยัน', onPress: async () => {
          const data = {
            "order": {
              "id": order._id,
              "details": order.details.map((v) => { return v._id })
            }
          }
          await dispatch(orderAccept(data))
          if (!error) {
            dispatch(orderList())
          }
        }
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
  // console.log(orderorder?.table);
  return (
    orders.length > 0 ?
      <ScrollView style={{ flex: 1 }}>
        {
          orders.map((order, i) => {
            return (
              <View key={i} style={{ flex: 1, textAlign: "left", backgroundColor: "#fff", margin: 15, flexDirection: "row", borderRadius: 10, }}>
                <View style={{ flex: 1 }}>
                  <View style={styles.shadowProp}>
                    <View style={{ width: 50, height: 50, alignContent: "center", alignItems: "center", backgroundColor: "#006FFF", justifyContent: "center", borderRadius: 5 }}>
                      <Text style={{ color: "#fff", fontSize: 16, fontFamily: "Kanit-Bold",textAlign:"center" }}>{order.table?.name?.th}</Text>
                      {/* <Text style={{ color: "#fff", fontFamily: "Kanit-Bold" }}>โต๊ะ</Text> */}
                    </View>
                    <View style={{ flex: 1, paddingLeft: 15 }}>
                      <Text style={{ color: "#000", fontWeight: "bold", fontSize: 18, paddingBottom: 5 }}> {order.details.length} รายการ</Text>
                      <View style={{ flexDirection: "row", alignContent: "space-around", alignItems: "flex-end", justifyContent: "space-between" }}>
                        <Text style={{ color: "#000", fontSize: 12, color: "#595959" }}>{order.order_no} </Text>
                        {/* <TouchableOpacity>
                          <Text style={{ color: "#000", fontSize: 12, color: "red" }}>ยกเลิกรายการ </Text>
                        </TouchableOpacity> */}
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", }}>
                      <Text>{moment(order.order_date).format('hh:mm a')}</Text>
                    </View>
                  </View>
                  {/* <View style={{ flex: 0,textAlign: "left",padding : 10,paddingLeft : 20, backgroundColor : "#F7F7F7" , flexDirection : "row"}}>
                  <Text>เครื่องดื่ม</Text>
                </View> */}
                  {
                    order.details.map((product, i) => {
                      return (
                        <View key={"detail_" + i} style={{ flex: 0, textAlign: "left", paddingTop: 10, paddingLeft: 20, paddingRight: 20, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#F0F0F0" }}>
                          <Text style={{ fontSize: 16, paddingBottom: 5, fontFamily: "Kanit-Bold" }}>{product.product.name['th']}</Text>
                          {
                            product.options.length != 0 && <Text style={{ fontSize: 14, }}>{product.options.map((opt, i) => {
                              return opt.option.name['th'] + ', '
                            }
                            )}</Text>}
                          {product.note != null && <Text style={{ fontSize: 14, color: "red" }}>{product.note}</Text>}
                          {/* <View style={{ position: "absolute", top: 12, right: 15, backgroundColor: (product.status == "PENDING" && "#FFA800" || product.status == "PROCESSING" && "#00D42F" || product.status == "REJECTED" && "#FF0000"), padding: 5, borderRadius: 5 }}>
                            <Text style={{ fontSize: 12, color: "#fff" }}>{product.status}</Text>
                          </View> */}
                          <View style={{ flexDirection: "row", alignContent: "center", justifyContent: "space-between", paddingTop: 0, paddingBottom: 15 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Kanit-Bold" }}>฿{product.total_amount} x {product.qty}</Text>

                          </View>
                        </View>
                      )
                    })
                  }
                  {/* ItemList */}
                  {/* <View style={{ flex: 0,textAlign: "left",padding : 15,paddingLeft : 20, backgroundColor : "#fff",opacity : 0.4, borderBottomWidth : 1 , borderBottomColor : "#F0F0F0" }}>
                  <Text style={{fontSize : 16,paddingBottom : 5, fontFamily : "Kanit-Bold"}}>นมถั่วเหลืองสูตร(เจ)</Text>
                  <Text style={{fontSize : 14,}}>ไข่มุกดำ, แปะก๊วย, ฟรุ๊ตสลัด, เยลลี่, ไม่ใส่น้ำเชื่อม หรือน้ำตาล</Text>
                  <Text style={{fontSize : 14,}}>ขอใส่แก้วกลับบ้านด้วยค่ะ</Text>
                  <View style={{ flexDirection : "row"}}>
                    <Text style={{fontSize : 16,fontWeight : "bold" ,fontFamily : "Kanit-Bold"}}>฿180 x 2</Text>
                  </View>
                </View> */}

                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ padding: 15, paddingLeft: 20 }}>
                      <Text style={{ fontSize: 12 }}>รวมค่าอาหาร</Text>
                      <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Kanit-Bold", color: "red" }}>฿{order.total_amount}.00</Text>
                    </View>
                    <View style={{ padding: 15, paddingLeft: 20 }}>
                      <TouchableOpacity style={{ width: 120, height: 40, borderColor: "#16284B", borderWidth: 1, alignItems: "center", justifyContent: "center", borderRadius: 10 }} onPress={() => ApproveOrder(order)}>
                        <Text style={{ fontSize: 16, fontFamily: "Kanit-Bold", color: "#16284B" }}>รับออเดอร์</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )
          })
        }

      </ScrollView> :
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: "left", borderRadius: 10 }}>
        <View style={{ paddingBottom: 30 }}>
          <Image source={require('../../assets/Notorder.png')}></Image>
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>ไม่พบรายการ</Text>
        <Text style={{ color: "#949494" }}>ยังไม่มีรายการใหม่เข้ามา</Text>
       
      </View>
  );
}

const styles = StyleSheet.create({
  shadowProp: {
    flexDirection: "row",
    padding: 20,
    flex: 1,
  },
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
  forgotButton: {
    height: 30,
    marginBottom: 10,
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
export default Order;