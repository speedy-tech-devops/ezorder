import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/stores';
import App from './App';
import 'react-native-gesture-handler';

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent('main', () => Root);
