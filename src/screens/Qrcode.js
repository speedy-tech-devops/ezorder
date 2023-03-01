import React, { useEffect ,useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { View ,Dimensions, Alert,Button ,Image,StyleSheet,TextInput,ScrollView ,TouchableOpacity, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { fetchDataAll } from '../actions/app';
import Text from '../components/Text';
const Stack = createNativeStackNavigator();
function Qrcode({ route, navigation ,fetchDataAll,data}) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
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
        title: 'คิวอาร์โค้ด',
    });
    fetchDataAll()
  },[])
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 9 / 16);
  const imageWidth = dimensions.width;
  const scaleHeight = ({ source, desiredWidth }) => {
    const { width, height } = Image.resolveAssetSource(source)

    return desiredWidth / width * height
}
  return (
    data.length != 0 ? 
    <>
    <SafeAreaView forceInset={{ top: 'never'}} style={{flex: 1,backgroundColor : "#EFF0F5"}}>
        <View style={{ alignItems: 'center',textAlign: "left",backgroundColor : "#fff" ,margin : 15 , borderRadius : 5 }} onLayout={(event) => { 
              setWidth(event.nativeEvent.layout.width)
              setHeight(scaleHeight({
                source: require('../../assets/promtpay.png'),
                desiredWidth: event.nativeEvent.layout.width
            }))
          }}>
          <Image source={require('../../assets/promtpay.png')} style={{width : width, height : height, borderRadius : 5 }} ></Image>
          <Text  style={{fontSize : 16,paddingBottom : 5, fontFamily : "Kanit-Bold"}}>สแกนคิวอาร์เพื่อโอนเงินเข้าบัญชี</Text> 
          <Text  style={{fontSize : 16,paddingBottom : 5}}>The Coffee Club</Text>
          <Text  style={{fontSize : 16,paddingBottom : 30}}>รหัสร้านค้า: 382779008716264</Text>
        </View>
        <View style={{padding : 15,paddingLeft : 20}}>
            <TouchableOpacity style={{height : 48 , borderColor : "#16284B" ,borderWidth : 1,alignItems : "center",justifyContent:"center" , borderRadius : 10}}   onPress={() =>  navigation.navigate('Camera')}>
              <Text style={{fontSize : 16,fontFamily : "Kanit-Bold" , color : "#16284B"}}>ถ่ายสลิปการโอนเงิน</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    </> : 
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',textAlign: "left" }}>
        <View style={{paddingBottom : 30}}>
          <Image source={require('../../assets/Notbill.png')}></Image>
        </View>
        <Text style={{fontWeight : "bold",fontSize : 18}}>Qrcode</Text>
        <Text style={{color : "#949494"}}>ยังไม่มีรายการใหม่เข้ามา</Text>
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
     image :{
        width: 100,
        height: 100,
        marginBottom : 30
    },
    inputView: {
        backgroundColor: "#eee",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "flex-start",
      },
      forgot_button: {
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
  const mapStateToProps = state => {
    return{
      data: state.app.data,
    }
  }
  
  const mapDispatchToProps = {
    fetchDataAll
  }
Qrcode.defaultNavigationOptions = ({navigation}) => {
    return {
      title: 'My home',
      headerBackTitleVisible : true,
        headerBackTitle : <Text>โต๊ะ</Text>,
        headerTintColor : "#000",
        headerBackTitleStyle: {
            fontSize: 14,
        }
  
}}
  export default connect(mapStateToProps, mapDispatchToProps)(Qrcode);