import React, { useEffect ,useState } from 'react';
import { View , Button ,Image,StyleSheet,TextInput ,TouchableOpacity,SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { fetchDataAll } from '../actions/app';
import TopTabNavigator from '../components/navigation/TopTabNavigator';
import {Ionicons} from '@expo/vector-icons';
import Text from '../components/Text';
const Stack = createNativeStackNavigator();
function Home({ navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  useEffect(() => {
  },[])
  return (
    <SafeAreaView forceInset={{ top: 'never'}} style={{ flex: 1,backgroundColor : "#fff" }}>
      <TopTabNavigator />
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
  
  export default Home;