import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Text from '../components/Text';

function Bill({ navigation }) {
  const [data, setData] = useState([])
  return (
    data.length != 0 ?
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, textAlign: "left", backgroundColor: "#fff", margin: 15, flexDirection: "row", borderRadius: 10, }}>
          <View style={{ flex: 1 }}>
            <View style={styles.shadowProp}>
              <View style={{ flex: "auto", width: 50, height: 50, alignContent: "center", alignItems: "center", backgroundColor: "#006FFF", justifyContent: "center", borderRadius: 5 }}>
                <Text style={{ color: "#fff", fontSize: 16, fontFamily: "Kanit-Bold" }}>1</Text>
                <Text style={{ color: "#fff", fontFamily: "Kanit-Bold" }}>โต๊ะ</Text>
              </View>
              <View style={{ flex: 1, paddingLeft: 15 }}>
                <Text style={{ color: "#000", fontWeight: "bold", fontSize: 18, paddingBottom: 5 }}>4 รายการ</Text>
                <Text style={{ color: "#000", fontSize: 12, color: "#595959" }}>INV0029388902</Text>
              </View>
              <View style={{ flexDirection: "row" }}><Text>13:17 น.</Text></View>
            </View>
            {/* ItemList */}
            <View style={{ flex: 0, textAlign: "left", padding: 15, paddingLeft: 20, backgroundColor: "#fff", opacity: 0.4, borderBottomWidth: 1, borderBottomColor: "#F0F0F0" }}>
              <Text style={{ fontSize: 16, paddingBottom: 5, fontFamily: "Kanit-Bold" }}>นมถั่วเหลืองสูตร(เจ)</Text>
              <Text style={{ fontSize: 14, }}>ไข่มุกดำ, แปะก๊วย, ฟรุ๊ตสลัด, เยลลี่, ไม่ใส่น้ำเชื่อม หรือน้ำตาล</Text>
              <Text style={{ fontSize: 14, }}>ขอใส่แก้วกลับบ้านด้วยค่ะ</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Kanit-Bold" }}>฿180 x 2</Text>
              </View>
            </View>
            <View style={{ flex: 0, textAlign: "left", padding: 15, paddingLeft: 20, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#F0F0F0" }}>
              <Text style={{ fontSize: 16, paddingBottom: 5, fontFamily: "Kanit-Bold" }}>ชาเขียวมะลิรสพีช</Text>
              <Text style={{ fontSize: 14, }}>Golden Bubble, หวานปกติ</Text>
              <Text style={{ fontSize: 14, }}>ขอใส่แก้วกลับบ้านด้วยค่ะ</Text>
              <View style={{ flexDirection: "row", alignContent: "center", justifyContent: "space-between", paddingTop: 20, paddingBottom: 15 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Kanit-Bold" }}>฿80 x 1</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ padding: 15, paddingLeft: 20 }}>
                <Text style={{ fontSize: 12 }}>ยอดรวมสุทธิ</Text>
                <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Kanit-Bold", color: "red" }}>฿569.00</Text>
              </View>
              <View style={{ padding: 15, paddingLeft: 20 }}>
                <TouchableOpacity style={{ width: 120, height: 40, borderColor: "#16284B", borderWidth: 1, alignItems: "center", justifyContent: "center", borderRadius: 10 }} onPress={() => navigation.navigate('Checkout')}>
                  <Text style={{ fontSize: 16, fontFamily: "Kanit-Bold", color: "#16284B" }}>เช็คบิล</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

      </ScrollView> :
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: "left" }}>
        <View style={{ paddingBottom: 30 }}>
          <Image source={require('../../assets/Notbill.png')}></Image>
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

export default Bill;