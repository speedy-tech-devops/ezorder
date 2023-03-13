import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Text from '../components/Text';
import { tableBooking, billingList } from '../redux/actions/tableAction';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';

function TableDetail({ route, navigation }) {
  const { tableDetail } = useSelector((state) => state.table);
  const dispatch = useDispatch()
  const { tableName, bookingId } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: tableName,
    });
    dispatch(tableBooking(bookingId))
  }, [])

  const handleLoadBilling = (id) => {
    dispatch(billingList(id))
    navigation.navigate('Checkout', {
      tableName: tableName
    })
  }


  return (
    tableDetail ?
      <>
        <ScrollView style={{ flex: 1 }}>

          <View style={{ flex: 1, textAlign: "left", margin: 0, flexDirection: "row", borderRadius: 10, }}>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 0, justifyContent: "space-between", textAlign: "left", padding: 10, paddingLeft: 15, backgroundColor: "#F7F7F7", flexDirection: "row" }}>
                <Text>หมายเลขบิล: {tableDetail.billing_no}</Text>
                <Text>หมดเวลา: <Text style={{ color: "red" }}>{moment(tableDetail.order_date).format('hh:mm')}</Text></Text>
              </View>
              {
                tableDetail.orders.map((order, i) => {
                  return (
                    <View style={{ marginBottom: 10 }} key={i}>
                      <View style={{ flex: 0, justifyContent: "space-between", textAlign: "left", padding: 10, paddingLeft: 15, backgroundColor: "#16284B", flexDirection: "row" }}>
                        <Text style={{ color: "#fff" }}>{order.order_no}</Text>
                        <Text style={{ color: "#fff" }}>{moment(order.order_date).format('hh:mm')} น.</Text>
                      </View>
                      {/* ItemList */}
                      {
                        order.details.map((detail, i) => {
                          return (
                            <View key={i + detail._id} style={{ flex: 0, textAlign: "left", padding: 15, paddingLeft: 20, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#F0F0F0", flexDirection: 'row' }}>
                              <View style={{ flex: 1, paddingRight: 15 }}>
                                <Text style={{ fontSize: 16, paddingBottom: 5, fontFamily: "Kanit-Bold" }}>{detail.product.name['th']}</Text>
                                <Text style={{ fontSize: 14, }}>{detail.options.map((opt) => { return opt.option.name['th'] + "," })}</Text>
                                {detail.note && <Text style={{ fontSize: 14, color: "red" }}>{detail.note}</Text>}

                                <View style={{ marginTop: 10 }}>
                                  <View style={{ backgroundColor: (detail.status == "PENDING" && "#FFA800" || detail.status == "PROCESSING" || detail.status == "COMPLETE" && "#00D42F" || detail.status == "REJECTED" && "#FF0000"), padding: 5, borderRadius: 5, alignSelf: 'flex-start' }}>
                                    <Text style={{ fontSize: 12, color: "#fff" }}>{detail.status}</Text>
                                  </View>
                                </View>
                              </View>
                              <View style={{ paddingBottom: 15 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Kanit-Bold" }}>฿{detail.amount} x {detail.qty}</Text>
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
              <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Kanit-Bold", color: "red" }}>฿{parseInt(tableDetail.total_amount).toFixed(2)}</Text>
            </View>
            <View style={{ padding: 15, paddingLeft: 20 }}>
              <TouchableOpacity style={{ width: 194, height: 48, borderColor: "#16284B", borderWidth: 1, alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: "#16284B" }} onPress={() => handleLoadBilling(tableDetail._id)}>
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