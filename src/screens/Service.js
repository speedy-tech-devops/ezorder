import React, { useEffect ,useState } from 'react';
import { View ,Alert, Button ,Image,StyleSheet,TextInput ,TouchableOpacity,ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { fetchDataAll } from '../actions/app';
import Text from '../components/Text';
const Stack = createNativeStackNavigator();
function Service({ navigation}) {
  const [email, setEmail] = useState("");
  const [data , setData] = useState([])
  const [password, setPassword] = useState("");
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
  useEffect(() => {
  },[])
  return (
    data.length != 0 ? 
    <ScrollView style={{flex : 1 }}>
      <View style={{ flex: 1,textAlign: "left", backgroundColor : "#fff" , margin : 15 , marginBottom : 0, flexDirection : "row",borderRadius :10,shadowColor: '#F0F0F0',shadowOffset: {width: 0, height: 1},shadowOpacity: 1, shadowRadius: 1, }}>
          <View style={{flex : 1,flexDirection : "row",justifyContent : "center", alignContent : "center" , alignItems : "center"}}>
            <View style={styles.shadowProp}>
              <View style={{ flex : "auto", width : 50, height : 50, alignContent : "center", alignItems : "center" , backgroundColor : "#006FFF", justifyContent : "center" , borderRadius : 5 }}>
                <Text style={{color: "#fff",fontSize: 20, fontFamily : "Kanit-Bold" ,lineHeight : 24}}>1</Text>
                <Text style={{color: "#fff", fontFamily : "Kanit-Bold",lineHeight : 16}}>โต๊ะ</Text>
              </View>
              <View style={{ flex : 1, paddingLeft : 15 }}>
                <Text style={{color: "#000",fontWeight : "bold",fontSize : 16, paddingBottom : 5,fontFamily : "Kanit-Bold"}}>เรียกรับบริการ</Text>
                <Text  style={{color: "#000",fontSize : 14, color : "#595959"}}>13:53 น.</Text>
              </View>
              
            </View>
            <View style={{padding : 15,paddingLeft : 20}}>
                <TouchableOpacity style={{width : 100 , height : 40 , borderColor : "#16284B" ,borderWidth : 1,alignItems : "center",justifyContent:"center" , borderRadius : 10}}   onPress={() => ApporoveOrder()}>
                  <Text style={{fontSize : 16,fontFamily : "Kanit-Bold" , color : "#16284B"}}>ยืนยัน</Text>
                </TouchableOpacity>
            </View>
          </View>
      </View>
      <View style={{ flex: 1,textAlign: "left", backgroundColor : "#fff" , margin : 15 , marginBottom : 0, flexDirection : "row",borderRadius :10,shadowColor: '#F0F0F0',shadowOffset: {width: 0, height: 1},shadowOpacity: 1, shadowRadius: 1, }}>
          <View style={{flex : 1,flexDirection : "row",justifyContent : "center", alignContent : "center" , alignItems : "center"}}>
            <View style={styles.shadowProp}>
              <View style={{ flex : "auto", width : 50, height : 50, alignContent : "center", alignItems : "center" , backgroundColor : "#006FFF", justifyContent : "center" , borderRadius : 5 }}>
                <Text style={{color: "#fff",fontSize: 20, fontFamily : "Kanit-Bold" ,lineHeight : 24}}>1</Text>
                <Text style={{color: "#fff", fontFamily : "Kanit-Bold",lineHeight : 16}}>โต๊ะ</Text>
              </View>
              <View style={{ flex : 1, paddingLeft : 15 }}>
                <Text style={{color: "#000",fontWeight : "bold",fontSize : 16, paddingBottom : 5,fontFamily : "Kanit-Bold"}}>เรียกรับบริการ</Text>
                <Text  style={{color: "#000",fontSize : 14, color : "#595959"}}>13:53 น.</Text>
              </View>
              
            </View>
            <View style={{padding : 15,paddingLeft : 20}}>
                <TouchableOpacity style={{width : 100 , height : 40 , borderColor : "#16284B" ,borderWidth : 1,alignItems : "center",justifyContent:"center" , borderRadius : 10}}   onPress={() => ApporoveOrder()}>
                  <Text style={{fontSize : 16,fontFamily : "Kanit-Bold" , color : "#16284B"}}>ยืนยัน</Text>
                </TouchableOpacity>
            </View>
          </View>
      </View>
      <View style={{ flex: 1,textAlign: "left", backgroundColor : "#fff" , margin : 15 , marginBottom : 0, flexDirection : "row",borderRadius :10,shadowColor: '#F0F0F0',shadowOffset: {width: 0, height: 1},shadowOpacity: 1, shadowRadius: 1, }}>
          <View style={{flex : 1,flexDirection : "row",justifyContent : "center", alignContent : "center" , alignItems : "center"}}>
            <View style={styles.shadowProp}>
              <View style={{ flex : "auto", width : 50, height : 50, alignContent : "center", alignItems : "center" , backgroundColor : "#006FFF", justifyContent : "center" , borderRadius : 5 }}>
                <Text style={{color: "#fff",fontSize: 20, fontFamily : "Kanit-Bold" ,lineHeight : 24}}>1</Text>
                <Text style={{color: "#fff", fontFamily : "Kanit-Bold",lineHeight : 16}}>โต๊ะ</Text>
              </View>
              <View style={{ flex : 1, paddingLeft : 15 }}>
                <Text style={{color: "#000",fontWeight : "bold",fontSize : 16, paddingBottom : 5,fontFamily : "Kanit-Bold"}}>เรียกรับบริการ</Text>
                <Text  style={{color: "#000",fontSize : 14, color : "#595959"}}>13:53 น.</Text>
              </View>
              
            </View>
            <View style={{padding : 15,paddingLeft : 20}}>
                <TouchableOpacity style={{width : 100 , height : 40 , borderColor : "#16284B" ,borderWidth : 1,alignItems : "center",justifyContent:"center" , borderRadius : 10}}   onPress={() => ApporoveOrder()}>
                  <Text style={{fontSize : 16,fontFamily : "Kanit-Bold" , color : "#16284B"}}>ยืนยัน</Text>
                </TouchableOpacity>
            </View>
          </View>
      </View>
    </ScrollView> : 
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',textAlign: "left" }}>
        <View style={{paddingBottom : 30}}>
          <Image source={require('../../assets/Notservice.png')}></Image>
        </View>
        <Text style={{fontWeight : "bold",fontSize : 18}}>ไม่พบรายการ</Text>
        <Text style={{color : "#949494"}}>ยังไม่มีรายการใหม่เข้ามา</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    shadowProp: {
      flexDirection : "row",
      padding : 15,
      flex : 1,
    },
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
  
  export default Service;