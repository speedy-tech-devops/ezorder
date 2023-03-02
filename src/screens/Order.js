import React, { useEffect ,useState } from 'react';
import { View , Button,Alert ,Image,StyleSheet,TextInput ,TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Text from '../components/Text';
import { orderList } from '../actions/orderAction';
import { useDispatch, useSelector } from 'react-redux'
const Stack = createNativeStackNavigator();
function Order({ navigation }) {
  const {order,auth} = useSelector((state) => state);
  const dispatch = useDispatch()

  const [email, setEmail] = useState("");
  const [data , setData] = useState([])
  const [orderLists , setOrderLists] = useState([])
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
  console.log('order',auth)
  useEffect(() => {
    if(order?.orderState?.data){
      setOrderLists(order?.orderState?.data)
    }
    
  },[order])
  useEffect(() => {
    // console.log(auth.userInfo)
    const OrderLoadData = async () => {
      await dispatch(orderList())
      
    }
    OrderLoadData()
  },[auth.userInfo])
  
  return (

    orderLists.length != 0 ? 
    <ScrollView style={{flex : 1 }}>
      {
        orderLists.map((item,i) => {
          return (
            <View style={{ flex: 1,textAlign: "left", backgroundColor : "#fff" , margin : 15 , flexDirection : "row",borderRadius :10,shadowColor: '#F0F0F0',shadowOffset: {width: 0, height: 1},shadowOpacity: 1, shadowRadius: 1, }}>
              <View style={{flex : 1}}>
                <View style={styles.shadowProp}>
                  <View style={{  width : 50, height : 50, alignContent : "center", alignItems : "center" , backgroundColor : "#006FFF", justifyContent : "center" , borderRadius : 5 }}>
                    <Text style={{color: "#fff",fontSize: 16, fontFamily : "Kanit-Bold"}}>1</Text>
                    <Text style={{color: "#fff", fontFamily : "Kanit-Bold"}}>โต๊ะ</Text>
                  </View>
                  <View style={{ flex : 1, paddingLeft : 15 }}>
                    <Text style={{color: "#000",fontWeight : "bold",fontSize : 18, paddingBottom : 5}}> {item.details.length} รายการ</Text>
                    <Text style={{color: "#000",fontSize : 12, color : "#595959"}}>{item.order_no} </Text>
                  </View>
                  <View style={{ flexDirection : "row" }}><Text>13:17 น.</Text></View>
                </View>
                {/* <View style={{ flex: 0,textAlign: "left",padding : 10,paddingLeft : 20, backgroundColor : "#F7F7F7" , flexDirection : "row"}}>
                  <Text>เครื่องดื่ม</Text>
                </View> */}
                {
                  item.details.map((product,i) => {
                    return (
                      <View style={{ flex: 0,textAlign: "left",padding : 15,paddingLeft : 20, backgroundColor : "#fff", borderBottomWidth : 1 , borderBottomColor : "#F0F0F0"}}>
                      <Text style={{fontSize : 16,paddingBottom : 5, fontFamily : "Kanit-Bold"}}>{product.product.name['th']}</Text>
                      <Text style={{fontSize : 14,}}>{product.options.map((opt,i)=>{
                        return opt.option.name['th'] +','
                      })}</Text>
                      {product.note != null && <Text style={{fontSize : 14,color : "red"}}>{product.note}</Text>}
                      <View style={{position : "absolute",top : 12,right : 15,backgroundColor : (product.status == "PENDING" && "#FFA800" || product.status == "PROCESSING" && "#00D42F" || product.status == "REJECTED" && "#FF0000"),padding : 5, borderRadius : 5}}>
                        <Text style={{fontSize : 12, color : "#fff"}}>{product.status}</Text>
                      </View>
                      <View style={{ flexDirection : "row", alignContent : "center", justifyContent : "space-between",paddingTop : 20 ,paddingBottom : 15}}>
                        <Text style={{fontSize : 16,fontWeight : "bold" ,fontFamily : "Kanit-Bold"}}>฿{product.total_amount} x {product.qty}</Text>
                        <TouchableOpacity>
                          <Text>ยกเลิกรายการ</Text>
                        </TouchableOpacity>
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
               
                <View style={{flexDirection : "row",justifyContent : "space-between"}}>
                  <View style={{padding : 15,paddingLeft : 20}}>
                    <Text style={{fontSize : 12}}>รวมค่าอาหาร</Text>
                    <Text  style={{fontSize : 16,fontWeight : "bold" ,fontFamily : "Kanit-Bold" ,color : "red"}}>฿{item.total_amount}.00</Text>
                  </View>
                  <View style={{padding : 15,paddingLeft : 20}}>
                    <TouchableOpacity style={{width : 120 , height : 40 , borderColor : "#16284B" ,borderWidth : 1,alignItems : "center",justifyContent:"center" , borderRadius : 10}}   onPress={() => ApporoveOrder()}>
                      <Text style={{fontSize : 16,fontFamily : "Kanit-Bold" , color : "#16284B"}}>ส่งออเดอร์</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
          </View>
          )
        })
      }
      
    </ScrollView> : 
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',textAlign: "left",borderRadius :10 }}>
        <View style={{paddingBottom : 30}}>
          <Image source={require('../../assets/Notorder.png')}></Image>
        </View>
        <Text style={{fontWeight : "bold",fontSize : 18}}>ไม่พบรายการ</Text>
        <Text style={{color : "#949494"}}>ยังไม่มีรายการใหม่เข้ามา</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    shadowProp: {
      flexDirection : "row",
      padding : 20,
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
  export default Order;