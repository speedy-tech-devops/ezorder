import React, { useEffect ,useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { View ,Dimensions, Alert,Button ,Image,StyleSheet,TextInput,ScrollView ,TouchableOpacity,ImageBackground, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { fetchDataAll } from '../actions/app';
import Text from '../components/Text';

let camera = Camera
const Stack = createNativeStackNavigator();
function Camara({ route, navigation }) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [data , setData] = useState([])
  const [previewVisible, setPreviewVisible] = useState(false)
  
  const [capturedImage, setCapturedImage] = useState(null)
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const __takePicture = async () => {
    const photo = await camera.takePictureAsync()
    console.log(photo)
    setPreviewVisible(true)
    setCapturedImage(photo)
  }
  const __startCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync()
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }
  function toggleCameraType() {
    setType(CameraType.back);
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
  useEffect(() => {
    const requestPermissions = async () => {
        const {status} = await Camera.requestCameraPermissionsAsync()
        if(status === 'granted'){
        // do something

        }else{
            Alert.alert("Access denied")
        }
    }
    requestPermissions()
    navigation.setOptions({
        headerShown: false
    });
  },[])
  const __savePhoto = () => {
    navigation.navigate('Home' , { screen : "Bill"})
  }
  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }
  const CameraPreview = ({photo, retakePicture, savePhoto}) => {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '100%'
        }}
      >
        <ImageBackground
          source={{uri: photo && photo.uri}}
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              padding: 15,
              justifyContent: 'flex-end'
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <TouchableOpacity
                onPress={retakePicture}
                style={{
                  width: 130,
                  height: 40,
  
                  alignItems: 'center',
                  borderRadius: 4
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20
                  }}
                >
                  Re-take
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={savePhoto}
                style={{
                  width: 130,
                  height: 40,
  
                  alignItems: 'center',
                  borderRadius: 4
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20
                  }}
                >
                  save photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
  return (
    <View style={{flex : 1 }}>
        {
            previewVisible && capturedImage ? (
                <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
              ) : <Camera style={styles.container} type={type} ref={(r) => {
                camera = r
              }}>
                <View style={styles.buttonContainer}>
                  <View style={styles.alignButton}>
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 30,
                        borderRadius: 50,
                        backgroundColor: '#fff'
                      }}
                    />
                  </View>
                </View>
            
        </Camera>
        }
    </View>
  );
}
const styles = StyleSheet.create({
    alignButton : {
        alignSelf : "center",
        flex : 1,
        alignItems : "center"
    },
    buttonContainer : {
        position : "absolute",
        bottom : 0,
        flexDirection : "row",
        flex: 1,
        width: "100%",
        padding : 20,
        justifyContent : "space-between" 
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
    button : {
        backgroundColor :"#fff"
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
Camara.defaultNavigationOptions = ({navigation}) => {
    return {
      headerBackTitleVisible : true,
        headerBackTitle : <Text>โต๊ะ</Text>,
        headerTintColor : "#000",
        headerBackTitleStyle: {
            fontSize: 14,
        }
  
}}
  export default Camara;