import React, { useEffect ,useState } from 'react';
import { View , Button ,Image,StyleSheet,TextInput ,TouchableOpacity,SafeAreaView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { fetchDataAll } from '../actions/app';
import {Ionicons} from '@expo/vector-icons';
import Text from '../components/Text';
import { tableList } from '../actions/tableAction';
import { useDispatch, useSelector } from 'react-redux'
const Stack = createNativeStackNavigator();
function Table({ navigation }) {
  const {table,auth} = useSelector((state) => state);
  const dispatch = useDispatch()
  const [data , setData] = useState([])
  const [password, setPassword] = useState("");
  // console.log(table)
  useEffect(() => {
    if(table?.tableState?.data){
      setData(table?.tableState?.data)
    }
    
  },[table,table.loading])
  useEffect(() => {
    // console.log(auth.userInfo)
    const tableLoadData = async () => {
      await dispatch(tableList())
      
    }
    tableLoadData()
  },[auth.userInfo])
  return (
    <SafeAreaView forceInset={{ top: 'never'}} style={{ flex: 1,backgroundColor : "#fff" }}>
      <ScrollView>
        <View style={{flexDirection : "row", flexWrap : "wrap",margin : 20,justifyContent : "flex-start"}}>
        {
          data.map((item,i) => {
            return (
              <TouchableOpacity onPress={ () => { 
                if(item.status == "PROCESSING")
                navigation.navigate('TableDetail', {
                itemId: item.name['th'],
                otherParam: item.booking,
              })}}>
                <View style={{padding : 8,height : 110 ,width : 110,alignContent:"center",alignItems: "center" , justifyContent : "center",margin : 2,marginBottom : 15}}>
                  <Image source={ item.status == "" && require('../../assets/table-null.png') || item.status == "WAIT" && require('../../assets/table-yellow.png') || item.status == "PROCESSING" && require('../../assets/table-red.png')} style={{position : "absolute"}}></Image>
                  <Text style={{color: "#000",fontSize: 22, fontFamily : "Kanit-Bold",lineHeight: 25,marginTop : 5}}>{item.name['th']}</Text>
                  {/* <Text style={{color: "#000",fontSize: 16,lineHeight: 20}}>{โต๊ะ}</Text> */}
                </View>
              </TouchableOpacity>
            ) 
          })
        }
        {/* <TouchableOpacity>
          <View style={{padding : 8,height : 125 ,width : 125,alignContent:"center",alignItems: "center" , justifyContent : "center",margin : 2,marginBottom : 15}}>
            <Image source={  require('../../assets/table-null.png') } style={{position : "absolute"}}></Image>
            <Text style={{color: "#000",fontSize: 24, fontFamily : "Kanit-Bold",lineHeight: 25,marginTop : 5}}>{11}</Text>
            <Text style={{color: "#000",fontSize: 16,lineHeight: 20}}>โต๊ะ</Text>
          </View>
        </TouchableOpacity> */}
        
        </View>
      </ScrollView>
      <View style={{height : 56,alignItems : "flex-start" , justifyContent : "center", flex : 1 , padding : 15, backgroundColor : "transparent"}}>
        <View style={{flexDirection : "row",justifyContent : "center"}}>
          <View style={{flexDirection : "row", backgroundColor : "#FBFBFE" , minWidth : 50,padding : 7,marginRight : 10, borderRadius : 50,borderColor : "#ECECEC" , borderWidth : 1}}>
            <View style={{ backgroundColor : "#EDF1F7" ,width :20 , height : 20, marginRight : 10 , borderRadius : 50}}></View>
            <Text style={{fontSize : 15, color : "#16284B"}}>ว่าง</Text>
          </View>
          <View style={{flexDirection : "row", backgroundColor : "#FBFBFE" , minWidth : 50,padding : 7,marginRight : 10, borderRadius : 50,borderColor : "#ECECEC" , borderWidth : 1}}>
            <View style={{ backgroundColor : "#F74137" ,width :20 , height : 20, marginRight : 10 , borderRadius : 50}}></View>
            <Text style={{fontSize : 15, color : "#16284B"}}>ไม่ว่าง</Text>
          </View>
          <View style={{flexDirection : "row", backgroundColor : "#FBFBFE" , minWidth : 50,padding : 7,marginRight : 10, borderRadius : 50,borderColor : "#ECECEC" , borderWidth : 1}}>
            <View style={{ backgroundColor : "#FFC500" ,width :20 , height : 20, marginRight : 10 , borderRadius : 50}}></View>
            <Text style={{fontSize : 15, color : "#16284B"}}>จองโต๊ะ</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 60,
    paddingLeft : 15,
    alignItems : "flex-start",
    justifyContent : "center",
    
   },
   image :{
      width: 30,
      height: 30,
      borderRadius : 30
  }
    
});
  export default Table;