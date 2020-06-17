import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button} from 'react-native';
import { Constants } from 'expo';
import PropTypes from 'prop-types'
import {styles} from './styles.js'
import {convertInputToDisplayString} from './timeConversions.js'

export class TimeInputField extends Component{

	static propTypes = {
		placeholderDisplay: PropTypes.string, //what the form field should display before the user types anythign in
		sendInput: PropTypes.func,//function for sending input to another component
	} 
	
	constructor(props){
		super(props)
		
		this.state = {
			time:'000000',//a string containing the time that a user inputs in the form of hhmmss
			isValid:'true', //validation checks
		}
	}
	
	//a funtion to be called when the user changes the value in the form field. This updates state values.
	handleTimeChange = (time) =>{
		if(time.match(/[\d]/)){
			time = '000000' + time;
			time = time.substring(time.length-6);
			this.setState({time:time});
			this.setState({isValid:true});
			this.props.sendInput(time);
		}
		else{
			console.log("invalid")
			this.setState({isValid:false});
		}
	}
	
	render(){
			return(
			<View>
				<TextInput 
					keyboardType = 'numeric'
					onChangeText = {this.handleTimeChange}
					placeholder = {this.props.placeholderDisplay}
				/>
				{!this.state.isValid && <Text>Please enter a valid time.</Text>}
			</View>
			)
	}
}