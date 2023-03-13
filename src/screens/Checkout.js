import React, { useState } from 'react';
import { View, Alert, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Text from '../components/Text';
import RadioButton from '../components/RadioButton';
import { tableList } from '../redux/actions/tableAction';
import { useDispatch, useSelector } from 'react-redux'
import { checkBill } from '../redux/actions/orderAction';

function Checkout({ navigation }) {
  const { billing } = useSelector((state) => state.table);
  const { error } = useSelector((state) => state.order);
  const dispatch = useDispatch()

  const props = [
    {
      key: 'เงินสด',
      text: 'เงินสด',
      selected: true
    },
    {
      key: 'คิวอาร์โค้ด',
      text: 'คิวอาร์โค้ด',
      selected: false
    },
    // {
    //   key: 'บัตรเครดิต',
    //   text: 'บัตรเครดิต',
    // }
  ];

  const handleAlertConfirm = () =>
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
            "payment_type": "CASH",
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



  const handleSubmit = () => {
    if (paymentType == "เงินสด") {
      handleAlertConfirm()
    } else {
      navigation.navigate('Qrcode')
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
    await dispatch(tableBilling(table.tableDetail._id))
  //   const config = {
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'authorization': `Bearer ${auth.accessToken}`,
  //         'speedy-branch' : auth.branch
  //     },
  // }
  
  // const res = await axios.get(`${baseUrl}/v1/transaction/billing/summary/${table.tableDetail._id}`, config)
  // setBilling(res.data.data)
    // await dispatch(tableDetail(otherParam))
  }
  useEffect(() => {
    TableLoadDetail()
  },[])
  useEffect(() => {
    if(table?.tableBilling){
      console.log(table?.tableBilling)
      setBilling(table?.tableBilling)
    }
  }
  const [paymentType, setPaymentType] = useState("เงินสด")
  const handleSelected = (value) => {
    setPaymentType(value)
  }

  return (
    billing ?
      <>
        <View style={{ flex: 1, textAlign: "left", backgroundColor: "", margin: 0, flexDirection: "row", borderRadius: 10, }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 0, justifyContent: "space-between", textAlign: "left", padding: 10, paddingLeft: 15, backgroundColor: "#F7F7F7", flexDirection: "row" }}>
              <Text>หมายเลขบิล: {billing.billing_no}</Text>
            </View>
            <View style={{ flex: 0, justifyContent: "space-between", textAlign: "left", padding: 10, paddingLeft: 15, backgroundColor: "#16284B", flexDirection: "row" }}>
              <Text style={{ color: "#fff" }}>สรุปคำสั่งซื้อ</Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
              {/* ItemList */}
              {
                billing.orders.map((item, i) => {
                  return (
                    <View key={i} style={{ flex: 0, textAlign: "left", padding: 15, paddingLeft: 20, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#F0F0F0", flexDirection: 'row' }}>
                      <View style={{ flex: 1, paddingRight: 15 }}>
                        <Text style={{ fontSize: 16, paddingBottom: 5, fontFamily: "Kanit-Bold" }}>{item.product.name['th']}</Text>
                        <Text style={{ fontSize: 14, }}>{item.options.map((opt) => { return opt.option.name['th'] + "," })}</Text>
                        {/* <Text style={{fontSize : 14,color: "red"}}>ขอใส่แก้วกลับบ้านด้วยค่ะ</Text> */}
                      </View>
                      <View style={{ paddingBottom: 15 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Kanit-Bold" }}>฿{item.total_amount == null ? item.unit_price : item.total_amount} x {item.qty}</Text>
                      </View>
                    </View>
                  )
                })
              }
              {/* <View style={{ flex: 0,textAlign: "left",padding : 15,paddingLeft : 20, backgroundColor : "#fff", borderBottomWidth : 1 , borderBottomColor : "#F0F0F0",flexDirection:'row' }}>
                <View style={{flex : 1,paddingRight : 15}}>
                    <Text style={{fontSize : 16,paddingBottom : 5, fontFamily : "Kanit-Bold"}}>นมถั่วเหลืองสูตร(เจ)</Text>
                    <Text style={{fontSize : 14,}}>เยลลี่, ฟรุ๊ตสลัด, หวานน้อย เยลลี่, ฟรุ๊ตสลัด, หวานน้อย เยลลี่, ฟรุ๊ตสลัด, หวานน้อย.0</Text>
                    <Text style={{fontSize : 14,color: "red"}}>ขอใส่แก้วกลับบ้านด้วยค่ะ</Text>
                </View>
                <View style={{paddingBottom : 15}}>
                    <Text style={{fontSize : 16,fontWeight : "bold" ,fontFamily : "Kanit-Bold"}}>฿80 x 1</Text>
                </View>
              </View>
              <View style={{ flex: 0,textAlign: "left",padding : 15,paddingLeft : 20, backgroundColor : "#fff", borderBottomWidth : 1 , borderBottomColor : "#F0F0F0",flexDirection:'row' }}>
                <View style={{flex : 1,paddingRight : 15}}>
                    <Text style={{fontSize : 16,paddingBottom : 5, fontFamily : "Kanit-Bold"}}>ชาเขียวมะลิรสพีช</Text>
                    <Text style={{fontSize : 14,}}>Golden Bubble, หวานปกติ</Text>
                </View>
                <View style={{paddingBottom : 15}}>
                    <Text style={{fontSize : 16,fontWeight : "bold" ,fontFamily : "Kanit-Bold"}}>฿80 x 1</Text>
                </View>
              </View>
              <View style={{ flex: 0,textAlign: "left",padding : 15,paddingLeft : 20, backgroundColor : "#fff", borderBottomWidth : 1 , borderBottomColor : "#F0F0F0",flexDirection:'row' }}>
                <View style={{flex : 1,paddingRight : 15}}>
                    <Text style={{fontSize : 16,paddingBottom : 5, fontFamily : "Kanit-Bold"}}>Iced Green tea latte</Text>
                    <Text style={{fontSize : 14,}}>หวานปกติ</Text>
                </View>
                <View style={{paddingBottom : 15}}>
                    <Text style={{fontSize : 16,fontWeight : "bold" ,fontFamily : "Kanit-Bold"}}>฿65 x 1</Text>
                </View>
              </View> */}
              <View style={{ backgroundColor: "#fff", marginTop: 15, padding: 15 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Kanit-Bold" }}>เลือกวิธีชำระเงิน</Text>
                <RadioButton props={props} defaultValue={paymentType} handleSelected={handleSelected} />
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
              <Text style={{ fontSize: 16, fontFamily: "Kanit-Bold", color: "#000" }}>{billing.total_amount}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15, paddingBottom: 5, paddingTop: 5 }}>
            <View style={{ margin: 0 }}>
              <Text style={{ fontSize: 14, color: "#717171" }}>VAT 7%</Text>
            </View>
            <View style={{ margin: 0 }}>
              <Text style={{ fontSize: 16, fontFamily: "Kanit-Bold", color: "#000" }}>{parseInt(billing.vat_amount).toFixed(2)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15, paddingBottom: 15, paddingTop: 5, borderBottomWidth: 1, borderBottomColor: "#F0F0F0" }}>
            <View style={{ margin: 0 }}>
              <Text style={{ fontSize: 14, color: "#717171" }}>Service charge 10%</Text>
            </View>
            <View style={{ margin: 0 }}>
              <Text style={{ fontSize: 16, fontFamily: "Kanit-Bold", color: "#000" }}>33.00</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ padding: 15, paddingLeft: 20 }}>
              <Text style={{ fontSize: 12 }}>ยอดรวมสุทธิ</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Kanit-Bold", color: "red" }}>฿{billing.total_amount}</Text>
            </View>
            <View style={{ padding: 15, paddingLeft: 20 }}>
              <TouchableOpacity style={{ width: 194, height: 48, borderColor: "#16284B", borderWidth: 1, alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: "#16284B" }} onPress={() => 
              
              
              
              
              
              
              
              
              
              
              ()}>
                <Text style={{ fontSize: 16, fontFamily: "Kanit-Bold", color: "#fff" }}>ดำเนินการต่อ</Text>
              </TouchableOpacity>
            </View>
          </View>
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

export default Checkout;