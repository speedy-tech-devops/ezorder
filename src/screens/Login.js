import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { userLogin } from '../redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';
import * as yup from 'yup';
// import iconv from "iconv-lite";
// import { Buffer } from "buffer";

// import {
//   USBPrinter,
//   NetPrinter,
//   BLEPrinter,
// } from "react-native-thermal-receipt-printer";


const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('ที่อยู่อีเมลผิด')
    .required('โปรดกรอกอีเมล'),
  password: yup
    .string('Enter your password')
    .min(6, 'รหัสผ่านควรมีความยาวอย่างน้อย 6 ตัวอักษร')
    .required('โปรดกรอกรหัสผ่าน'),
});

function Login({ navigation }) {
  const { isLoggedIn, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Menu')
    }
  }, [isLoggedIn])

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched } = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema,
      onSubmit: async (values, { setSubmitting, setErrors }) => {
        await dispatch(userLogin({ email: values.email, password: values.password }))
        if (error) {
          setErrors({
            email: "บัญชีผู้ใช้ หรือ รหัสผ่านอาจจะผิด",
            password: null
          })
        }
        setSubmitting(false)
      },
    });

  const password = useRef(null);

  // console.log(ThermalPrinterEncoder);
  // const onPress = async () => {
  //   try {

  //     requestCameraPermission()
  //     NetPrinter.init().then(() => {

  //     })

  //     // BLEPrinter.init().then(() => {
  //     //   BLEPrinter.getDeviceList().then(setPrinters);
  //     // });
  //     console.log('We will invoke the native module here!');
  //     // const test = await BLEPrinter.getDeviceList()
  //     // console.log(test);
  //     NetPrinter.connectPrinter('192.168.1.103', 9100).then(
  //       (printer) => console.log(printer),
  //       error => console.warn(error))

  //     // BLEPrinter.connectPrinter("86:67:7A:83:63:6B").then(
  //     //   setCurrentPrinter,
  //     //   error => console.warn(error))

  //   } catch (err) {
  //     //error handling
  //     console.log(err.message);
  //   }
  // };
  // printTextTest = async () => {
  //   // NetPrinter.printText("<C>SPEEDY-TECH</C>\n");
  //   // iconv.decode(new Buffer(body), "TIS-620");
  //   NetPrinter.printText("\x1B\x74\x13\xD5 500.00 FIVE HUNDRED EUROS");
  //   // BLEPrinter.printBill(TCVN3message);
  //   // BLEPrinter.printBill('<C>sample bill</C>');
  // }

  // printBillTest = () => {

  // // NetPrinter.printBill("<C>sample bill</C>");
  // }

  // const requestCameraPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the camera');
  //     } else {
  //       console.log('Camera permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: "left" }}>
      <Image style={styles.image} source={require("../../assets/icon.png")} />
      {/* <Text>LoginScreen</Text> */}

      <Text style={{ textAlign: "left", marginBottom: 10, width: "70%" }}>อีเมล</Text>
      <View style={styles.inputView}>
        <TextInput
          icon='mail'
          style={styles.TextInput}
          placeholder='กรอกอีเมลของคุณ'
          autoCapitalize='none'
          autoCompleteType='email'
          keyboardType='email-address'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          error={errors.email}
          touched={touched.email}
          onSubmitEditing={() => password.current?.focus()}
        />
      </View>

      {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <Text style={{ textAlign: "left", marginBottom: 10, width: "70%" }}>รหัสผ่าน</Text>
      <View style={styles.inputView}>
        <TextInput
          ref={password}
          style={styles.TextInput}
          icon='key'
          placeholder='กรอกรหัสผ่านของคุณ'
          secureTextEntry
          autoCompleteType='password'
          autoCapitalize='none'
          keyboardAppearance='dark'
          returnKeyType='go'
          returnKeyLabel='go'
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          error={errors.password}
          touched={touched.password}
          onSubmitEditing={() => handleSubmit()}
        />
      </View>
      {touched.password && errors.password && <Text style={{ textAlign: "left", paddingBottom: 20, width: "70%", color: "red" }}>{errors.password}</Text>}
      <TouchableOpacity style={styles.loginBtn} onPress={() => handleSubmit()}>
        <Text style={styles.loginText}>เข้าสู่ระบบ</Text>
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
  image: {
    width: 100,
    height: 100,
    marginBottom: 30
  },
  inputView: {
    backgroundColor: "#eee",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 5,
    alignItems: "flex-start",
  },
  forgotButton: {
    height: 30,
    marginBottom: 10,
  },
  loginBtn: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
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
  },
  errorText: {
    color: "red",
    width: "70%",
    paddingBottom: 20,
    alignItems: "flex-start",
  },
});


export default Login;