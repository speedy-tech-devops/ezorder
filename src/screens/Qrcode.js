import React, { useEffect, useState } from 'react';
import { View, Dimensions, Alert, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Text from '../components/Text';
import { useDispatch, useSelector } from 'react-redux'
import SvgQRCode from 'react-native-qrcode-svg';
import { checkBill } from '../redux/actions/orderAction';
import { tableList } from '../redux/actions/tableAction';

function Qrcode({ navigation }) {
  const { userInfo } = useSelector((state) => state.auth);
  const { billing } = useSelector((state) => state.table);
  const { error } = useSelector((state) => state.order);
  const dispatch = useDispatch()
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const ApporoveOrder = () =>
    Alert.alert('ยืนยันการชำระเงิน', 'คุณต้องการชำระเงินนี้ใช่หรือไม่', [
      {
        text: 'ยกเลิก',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'ยืนยัน', onPress: async () => {
          const data = JSON.stringify({
            "billing": billing._id,
            "payment_type": "QR",
            "payment_total": parseInt(billing.total_amount)
          });

          await dispatch(checkBill(data));
          if (error) return Alert.alert('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง');
          dispatch(tableList());
          Alert.alert('ทำการชำระเงินเรียบร้อย');
          navigation.navigate('Menu');
        }
      },
    ]);

  useEffect(() => {
    navigation.setOptions({
      title: 'คิวอาร์โค้ด',
    });
  }, [])


  function PromptPayQr() {
    return <SvgQRCode value={billing.promptPayState} size={width - 100} />;
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
          <Image source={require('../../assets/prompt-pay-logo.png')} resizeMode="contain" style={{ width: 150, height: 150, padding: 0 }}></Image>
          {billing.promptPayState && <PromptPayQr />}
        </View>

        <Text style={{ fontSize: 16, paddingBottom: 5, fontFamily: "Kanit-Bold" }}>สแกนคิวอาร์เพื่อโอนเงินเข้าบัญชี</Text>
        <Text style={{ fontSize: 16, paddingBottom: 5 }}>{userInfo?.first_name} {userInfo?.last_name}</Text>
        {/* <Text style={{ fontSize: 16, paddingBottom: 5 }}>รหัสร้านค้า: 382779008716264</Text> */}
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