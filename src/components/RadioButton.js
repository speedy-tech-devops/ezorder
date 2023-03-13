import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Text from './Text';
export default class RadioButton extends Component {
	state = {
		value: null,
	};

	componentDidMount() {
		const { defaultValue } = this.props;
		if (defaultValue) {
			this.setState({ value: defaultValue })
		}
	}
	render() {
		const { props, handleSelected } = this.props;
		const { value } = this.state;
		return (
			<View>
				{props.map(item => {
					return (
						<TouchableOpacity key={item.key} onPress={() => {
							this.setState({ value: item.key })
							handleSelected(item.key)
						}}>
							<View style={styles.container} >
								<View
									style={styles.radioCircle}
								>
									{value === item.key && <View style={styles.selectedRb} />}
								</View>
								<Text style={styles.radioText}>{item.text}</Text>
							</View>
						</TouchableOpacity>

					);
				})}
				{/* <Text> Selected: {this.state.value} </Text> */}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flexDirection: 'row',
		paddingTop: 10,
		paddingBottom: 10,
		borderBottomColor: "#F0F0F0",
		borderBottomWidth: 1
	},
	radioText: {
		marginRight: 35,
		fontSize: 16,
		marginLeft: 10,
		color: '#000',
		fontWeight: '700'
	},
	radioCircle: {
		height: 18,
		width: 18,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: '#CBCBCB',
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedRb: {
		width: 10,
		height: 10,
		borderRadius: 50,
		backgroundColor: '#16284B',
	},
	result: {
		marginTop: 20,
		color: 'white',
		fontWeight: '600',
		backgroundColor: '#F3FBFE',
	},
});