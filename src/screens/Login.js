import React, { useEffect ,useState } from 'react';
import { View, Text , Button ,Image,StyleSheet,TextInput ,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { userLogin, userProfile } from '../actions/authAction';
import { useDispatch, useSelector } from 'react-redux'
const Stack = createNativeStackNavigator();
function Login({ navigation ,fetchDataAll}) {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch()
  const {accessToken,error} = auth;

  const [email, setEmail] = useState("admin@speedy-tech.co");
  const [password, setPassword] = useState("");
  useEffect(() => {
    // fetchDataAll()
    if(auth?.userInfo?.first_name){
      navigation.navigate('Menu')
      
    }
  },[auth])
  const Login_app_summit = async () => {
    await dispatch(userLogin({ email: email, password: password }))
    if(!error){
      await dispatch(userProfile())
    }
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',textAlign: "left" }}>
    <Image style={styles.image} source = {require("../../assets/icon.png")}/>
      {/* <Text>LoginScreen</Text> */}
      <Text style={{ textAlign : "left",marginBottom : 10 ,width : "70%"}}>รหัสพนักงาน</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View> 
      <Text style={{ textAlign : "left",marginBottom : 10,width : "70%" }}>รหัสผ่าน</Text>
      <View style={styles.inputView}>
      
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={styles.loginBtn}  onPress={() => Login_app_summit()}>
        <Text style={styles.loginText}>LOGIN</Text> 
      </TouchableOpacity>
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
  
  
  export default Login;