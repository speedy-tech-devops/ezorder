import React, { useEffect, useState } from 'react';
import { View, Alert, Button, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Text from '../components/Text';
import RadioButton from '../components/RadioButton';
const Stack = createNativeStackNavigator();
function HistoryBill({ route, navigation }) {
  const [data, setData] = useState([])
  const { itemId, otherParam } = route.params;

  const PROP = [
    {
      key: 'เงินสด',
      text: 'เงินสด',
    },
    {
      key: 'คิวอาร์โค้ด',
      text: 'คิวอาร์โค้ด',
    },
    {
      key: 'บัตรเครดิต',
      text: 'บัตรเครดิต',
    }
  ];
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
  useEffect(() => {
    navigation.setOptions({
      title: 'โต๊ะ ' + itemId,
    });
  }, [])
  return (
    data.length != 0 ?
      <>

        <View style={{ flex: 1, textAlign: "left", backgroundColor: "", margin: 0, flexDirection: "row", borderRadius: 10, }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 0, justifyContent: "space-between", textAlign: "left", padding: 10, paddingLeft: 15, backgroundColor: "#F7F7F7", flexDirection: "row" }}>
              <Text>หมายเลขบิล: AL0029904930</Text>
              {/* <Text>หมดเวลา: <Text style={{ color: "red" }}>16:02</Text></Text> */}
            </View>
            <View style={{ flex: 0, justifyContent: "space-between", textAlign: "left", padding: 10, paddingLeft: 15, backgroundColor: "#16284B", flexDirection: "row" }}>
              <Text style={{ color: "#fff" }}>สรุปคำสั่งซื้อ</Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
              {/* ItemList */}
              <View style={{ flex: 0, textAlign: "left", padding: 15, paddingLeft: 20, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#F0F0F0", flexDirection: 'row' }}>
                <View style={{ flex: 1, paddingRight: 15 }}>
                  <Text style={{ fontSize: 16, paddingBottom: 5, fontFamily: "Kanit-Bold" }}>นมถั่วเหลืองสูตร(เจ)</Text>
                  <Text style={{ fontSize: 14, }}>เยลลี่, ฟรุ๊ตสลัด, หวานน้อย เยลลี่, ฟรุ๊ตสลัด, หวานน้อย เยลลี่, ฟรุ๊ตสลัด, หวานน้อย.0</Text>
                  <Text style={{ fontSize: 14, color: "red" }}>ขอใส่แก้วกลับบ้านด้วยค่ะ</Text>
                </View>
                <View style={{ paddingBottom: 15 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Kanit-Bold" }}>฿80 x 1</Text>
                </View>
              </View>
              <View style={{ flex: 0, textAlign: "left", padding: 15, paddingLeft: 20, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#F0F0F0", flexDirection: 'row' }}>
                <View style={{ flex: 1, paddingRight: 15 }}>
                  <Text style={{ fontSize: 16, paddingBottom: 5, fontFamily: "Kanit-Bold" }}>ชาเขียวมะลิรสพีช</Text>
                  <Text style={{ fontSize: 14, }}>Golden Bubble, หวานปกติ</Text>
                </View>
                <View style={{ paddingBottom: 15 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Kanit-Bold" }}>฿80 x 1</Text>
                </View>
              </View>
              <View style={{ flex: 0, textAlign: "left", padding: 15, paddingLeft: 20, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#F0F0F0", flexDirection: 'row' }}>
                <View style={{ flex: 1, paddingRight: 15 }}>
                  <Text style={{ fontSize: 16, paddingBottom: 5, fontFamily: "Kanit-Bold" }}>Iced Green tea latte</Text>
                  <Text style={{ fontSize: 14, }}>หวานปกติ</Text>
                </View>
                <View style={{ paddingBottom: 15 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Kanit-Bold" }}>฿65 x 1</Text>
                </View>
              </View>
              <View style={{ backgroundColor: "#fff", marginTop: 15, padding: 15 }}>
                <Text style={{ fontSize: 16, fontFamily: "Kanit-Bold", paddingBottom: 10 }}>เลือกวิธีชำระเงิน</Text>
                {/* <View style={{flexDirection : "row"}}>
                    <Image source={require('../../assets/bath.png')}></Image>
                    <Text style={{marginLeft : 15,fontSize : 16}}>เงินสด</Text>
                </View> */}
                <View style={{ flexDirection: "row" }}>
                  <Image source={require('../../assets/credit.png')}></Image>
                  <Text style={{ marginLeft: 15, fontSize: 16 }}>บัตรเครดิต</Text>
                </View>
                {/* <View style={{flexDirection : "row"}}>
                    <Image source={require('../../assets/qr.png')}></Image>
                    <Text style={{marginLeft : 15,fontSize : 16,flex : 1}}>คิวอาร์โค้ด</Text>
                    <Image source={require('../../assets/qr.png')}  style={{flex : "auto", width : 32 ,height : 32}}></Image>
                </View> */}
              </View>
            </ScrollView>


            {/* <View style={{flexDirection : "row",justifyContent : "space-between"}}>
              <View style={{padding : 15,paddingLeft : 20}}>
                <Text style={{fontSize : 12}}>รวมค่าอาหาร</Text>
                <Text  style={{fontSize : 16,fontWeight : "bold" ,fontFamily : "Kanit-Bold" ,color : "red"}}>฿569.00</Text>
              </View>
              <View style={{padding : 15,paddingLeft : 20}}>
                <TouchableOpacity style={{width : 120 , height : 40 , borderColor : "#16284B" ,borderWidth : 1,alignItems : "center",justifyContent:"center" , borderRadius : 10}}   onPress={() => ApporoveOrder()}>
                  <Text style={{fontSize : 16,fontFamily : "Kanit-Bold" , color : "#16284B"}}>ส่งออเดอร์</Text>
                </TouchableOpacity>
              </View>
            </View> */}
          </View>
        </View>

        <SafeAreaView style={{ backgroundColor: "#fff", borderTopColor: "#eee", borderTopWidth: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15, paddingBottom: 5, paddingTop: 15 }}>
            <View style={{ margin: 0 }}>
              <Text style={{ fontSize: 14, color: "#717171" }}>รวมค่าอาหาร</Text>
            </View>
            <View style={{ margin: 0 }}>
              <Text style={{ fontSize: 16, fontFamily: "Kanit-Bold", color: "#000" }}>330.00</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15, paddingBottom: 5, paddingTop: 5 }}>
            <View style={{ margin: 0 }}>
              <Text style={{ fontSize: 14, color: "#717171" }}>VAT 7%</Text>
            </View>
            <View style={{ margin: 0 }}>
              <Text style={{ fontSize: 16, fontFamily: "Kanit-Bold", color: "#000" }}>23.10</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15, paddingBottom: 15, paddingTop: 5 }}>
            <View style={{ margin: 0 }}>
              <Text style={{ fontSize: 14, color: "#717171" }}>Service charge 10%</Text>
            </View>
            <View style={{ margin: 0 }}>
              <Text style={{ fontSize: 16, fontFamily: "Kanit-Bold", color: "#000" }}>33.00</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15, paddingBottom: 15, paddingTop: 5 }}>
            <View style={{ margin: 0 }}>
              <Text style={{ fontSize: 14, color: "#717171" }}>ยอดรวมสุทธิ</Text>
            </View>
            <View style={{ margin: 0 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Kanit-Bold", color: "red" }}>฿569.00</Text>
            </View>
          </View>
          {/* <View style={{flexDirection : "row",justifyContent : "space-between"}}>
            <View style={{padding : 15,paddingLeft : 20}}>
              <Text style={{fontSize : 12}}>ยอดรวมสุทธิ</Text>
              <Text  style={{fontSize : 16,fontWeight : "bold" ,fontFamily : "Kanit-Bold" ,color : "red"}}>฿569.00</Text>
            </View>
            <View style={{padding : 15,paddingLeft : 20}}>
              <TouchableOpacity style={{width : 194 , height : 48 , borderColor : "#16284B" ,borderWidth : 1,alignItems : "center",justifyContent:"center" , borderRadius : 10 , backgroundColor : "#16284B" }}   onPress={() => navigation.navigate('Qrcode')}>
                  <Text style={{fontSize : 16,fontFamily : "Kanit-Bold" , color : "#fff"}}>ดำเนินการต่อ</Text>
              </TouchableOpacity>
            </View>
        </View> */}
        </SafeAreaView>
      </>
      :
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: "left" }}>
        <View style={{ paddingBottom: 30 }}>
          <Image source={require('../../assets/Notbill.png')}></Image>
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Checkout</Text>
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
HistoryBill.defaultNavigationOptions = ({ navigation }) => {
  return {
    headerBackTitleVisible: true,
    headerBackTitle: <Text>ประวัติออเดอร์</Text>,
    headerTintColor: "#000",
    headerBackTitleStyle: {
      fontSize: 14,
    }

  }
}
export default HistoryBill;