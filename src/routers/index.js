import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { connect } from 'react-redux';
import Login from '../screens/Login';
import Home from '../screens/Home';



const AuthStack = createStackNavigator(
    {
        Login: Login,
    },
    {
        initialRouteName: 'Login',
        defaultNavigationOptions: {
            headerShown: false,
        },
    },
);

const AppStack = createStackNavigator({
    Home: Home
}, {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
        headerShown: true,
    },
})
const RouteContainer = createAppContainer(
    createSwitchNavigator(
        {
            Auth: AuthStack,
            App: AppStack,
        },
        {
            initialRouteName: 'Auth',
        },
    ),
);

export default connect(null, null)(RouteContainer);