import React, { useEffect ,useState } from 'react';
import { View , Button ,Image,StyleSheet,TextInput ,TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { fetchDataAll } from '../actions/app';
import Text from '../components/Text';
import SearchBar from '../components/SearchBar';
const Stack = createNativeStackNavigator();
function History({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data , setData] = useState([])
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();
  useEffect(() => {
    
    const getData = async () => {
      let dataFake = fetchDataAll()
      setFakeData(dataFake)
    };
  },[])
  return (
    <SafeAreaView style={{flex : 1}}>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {
        data.length != 0 ? 
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection : "row" , alignItems: 'center', justifyContent: 'center',textAlign: "left",marginBottom : 10  }}>
            <TouchableOpacity style={{ flex : 1}}  onPress={ () => { navigation.navigate('HistoryBill', {
                  itemId: 1,
                })}}>
              <View style={styles.shadowProp}>
                <View style={{ flex : "auto", width : 50, height : 50, alignContent : "center", alignItems : "center" , backgroundColor : "#006FFF", justifyContent : "center" , borderRadius : 5 }}>
                  <Text style={{color: "#fff",fontSize: 16, fontFamily : "Kanit-Bold"}}>1</Text>
                  <Text style={{color: "#fff", fontFamily : "Kanit-Bold"}}>โต๊ะ</Text>
                </View>
                <View style={{ flex : 1, paddingLeft : 15 }}>
                  <Text style={{color: "#000",fontWeight : "bold",fontSize : 18, paddingBottom : 0}}>4 รายการ</Text>
                  <Text style={{color: "#000",fontSize : 14, color : "red" , fontFamily : "Kanit-Bold"}}>฿178.50 <Text style={{color: "#595959"}}>• เงินสด</Text></Text>
                </View>
                <View style={{ flexDirection : "row" }}><Text style={{fontSize : 16, color: "#707070"}}>13:17 น.</Text></View>
              </View>
            </TouchableOpacity>
          </View>
          
        </ScrollView>
        : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',textAlign: "left" }}>
        <View style={{paddingBottom : 30}}>
          <Image source={require('../../assets/Notbill.png')}></Image>
        </View>
        <Text style={{fontWeight : "bold",fontSize : 18}}>ไม่พบรายการ</Text>
        <Text style={{color : "#949494"}}>ยังไม่มีประวัติการทำรายการ</Text>
    </View>
      }
      
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    shadowProp: {
      flexDirection : "row",
      padding : 13,
      flex : 1,
      backgroundColor : "#fff",
      marginLeft : 15,
      marginRight : 15,
      borderRadius : 10
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
  
  export default History;