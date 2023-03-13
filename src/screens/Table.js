import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Text from '../components/Text';
import { tableList } from '../redux/actions/tableAction';
import { useDispatch, useSelector } from 'react-redux'

function Table({ navigation }) {
  const { table, auth } = useSelector((state) => state);
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  useEffect(() => {
    if (table?.tableState?.data) {
      setData(table?.tableState?.data)
    }
  }, [table, table.loading])

  useEffect(() => {
    dispatch(tableList())
  }, [auth.userInfo])

  return (
    <SafeAreaView forceInset={{ top: 'never' }} style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <View style={{ flexDirection: "row", flexWrap: "wrap", margin: 20, justifyContent: "flex-start" }}>
          {
            data.map((item, i) => {
              return (
                <TouchableOpacity key={"to_" + i} onPress={() => {
                  if (item.status == "PROCESSING")
                    navigation.navigate('TableDetail', {
                      tableName: item.name['th'],
                      bookingId: item.booking,
                    })
                }}>
                  <View key={"to_" + i} style={{ padding: 8, height: 110, width: 110, alignContent: "center", alignItems: "center", justifyContent: "center", margin: 2, marginBottom: 15 }}>
                    <Image source={item.status == "" && require('../../assets/table-null.png') || item.status == "WAIT" && require('../../assets/table-yellow.png') || item.status == "PROCESSING" && require('../../assets/table-red.png')} style={{ position: "absolute" }}></Image>
                    <Text style={{ color: "#000", fontSize: 22, fontFamily: "Kanit-Bold", lineHeight: 25, marginTop: 5 }}>{item.name['th']}</Text>
                    {/* <Text style={{color: "#000",fontSize: 16,lineHeight: 20}}>{โต๊ะ}</Text> */}
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </ScrollView>
      <View style={{ height: 56, alignItems: "flex-start", justifyContent: "center", flex: 1, padding: 15, backgroundColor: "transparent" }}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={{ flexDirection: "row", backgroundColor: "#FBFBFE", minWidth: 50, padding: 7, marginRight: 10, borderRadius: 50, borderColor: "#ECECEC", borderWidth: 1 }}>
            <View style={{ backgroundColor: "#EDF1F7", width: 20, height: 20, marginRight: 10, borderRadius: 50 }}></View>
            <Text style={{ fontSize: 15, color: "#16284B" }}>ว่าง</Text>
          </View>
          <View style={{ flexDirection: "row", backgroundColor: "#FBFBFE", minWidth: 50, padding: 7, marginRight: 10, borderRadius: 50, borderColor: "#ECECEC", borderWidth: 1 }}>
            <View style={{ backgroundColor: "#F74137", width: 20, height: 20, marginRight: 10, borderRadius: 50 }}></View>
            <Text style={{ fontSize: 15, color: "#16284B" }}>ไม่ว่าง</Text>
          </View>
          <View style={{ flexDirection: "row", backgroundColor: "#FBFBFE", minWidth: 50, padding: 7, marginRight: 10, borderRadius: 50, borderColor: "#ECECEC", borderWidth: 1 }}>
            <View style={{ backgroundColor: "#FFC500", width: 20, height: 20, marginRight: 10, borderRadius: 50 }}></View>
            <Text style={{ fontSize: 15, color: "#16284B" }}>จองโต๊ะ</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Table;