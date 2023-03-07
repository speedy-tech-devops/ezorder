import React, { useEffect, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { View, Dimensions, Alert, Button, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Text from '../components/Text';
import { useDispatch, useSelector } from 'react-redux'
import SvgQRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import { baseUrl } from '../services/endpoint';
function Qrcode({ navigation }) {
  const { table, auth } = useSelector((state) => state);
  const dispatch = useDispatch()
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const ApporoveOrder = () =>
    Alert.alert('ยืนยันการชำระเงิน', 'คุณต้องการชำระเงินนี้ใช่หรือไม่', [
      {
        text: 'ยกเลิก',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'ยืนยัน', onPress: async () => {
          var data = JSON.stringify({
            "billing": table.tableBilling._id,
            "payment_type": "QR",
            "payment_total": parseInt(table.tableBilling.total_amount)
          });
          var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/v1/transaction/checkbill`,
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${auth.accessToken}`,
              'speedy-branch': auth.branch
            },
            data: data
          }
          axios(config)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
              Alert.alert('ทำการชำระเงินเรียบร้อย')
              navigation.navigate('Menu')
            })
            .catch(function (error) {
              console.log(error);
            });

        }
      },
    ]);

  useEffect(() => {
    navigation.setOptions({
      title: 'คิวอาร์โค้ด',
    });
  }, [])

  function PromptPay() {
    return <SvgQRCode value={table.tableBilling.promptPayState} size={width - 100} />;
  }
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 9 / 16);
  const imageWidth = dimensions.width;

  const scaleHeight = ({ source, desiredWidth }) => {
    const { width, height } = Image.resolveAssetSource(source)
    return desiredWidth / width * height
  }
  return (
    <SafeAreaView forceInset={{ top: 'never' }} style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ alignItems: 'center', textAlign: "left", backgroundColor: "#fff", margin: 0, borderRadius: 5 }} onLayout={(event) => {
        setWidth(event.nativeEvent.layout.width)
        setHeight(scaleHeight({
          source: require('../../assets/promtpay.png'),
          desiredWidth: event.nativeEvent.layout.width
        }))
      }}>
        <View style={{ paddingBottom: 10, paddingTop: 0, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <Image  source={require('../../assets/prompt-pay-logo.png')} resizeMode="contain" style={{ width: 150, height: 150 ,padding: 0 }}></Image>
          <PromptPay />
        </View>

        <Text style={{ fontSize: 16, paddingBottom: 5, fontFamily: "Kanit-Bold" }}>สแกนคิวอาร์เพื่อโอนเงินเข้าบัญชี</Text>
        <Text style={{ fontSize: 16, paddingBottom: 5 }}>{auth.userInfo.first_name} {auth.userInfo.first_name}</Text>
        <Text style={{ fontSize: 16, paddingBottom: 5 }}>รหัสร้านค้า: 382779008716264</Text>
      </View>
      <View style={{ padding: 15, paddingLeft: 20 }}>
        <TouchableOpacity style={{ height: 48, borderColor: "#16284B", borderWidth: 1, alignItems: "center", justifyContent: "center", borderRadius: 10 }} onPress={() => ApporoveOrder()}>
          <Text style={{ fontSize: 16, fontFamily: "Kanit-Bold", color: "#16284B" }}>เช็ดบิล</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

Qrcode.defaultNavigationOptions = ({ navigation }) => {
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
export default Qrcode;