import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import TopTabNavigator from '../components/navigation/TopTabNavigator';
import { orderList } from '../redux/actions/orderAction';
import { useDispatch, useSelector } from 'react-redux';

function Home({ navigation }) {
  return (
    <SafeAreaView forceInset={{ top: 'never' }} style={{ flex: 1, backgroundColor: "#ffff" }}>
      <TopTabNavigator />
    </SafeAreaView>
  );
}

export default Home;