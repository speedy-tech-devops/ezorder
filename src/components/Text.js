import React from 'react';
import { Text } from 'react-native';

export default props => <Text {...props} style={{fontFamily: 'Kanit-Light',...props.style}}>{props.children}</Text>