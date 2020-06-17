import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button} from 'react-native';
import { Constants } from 'expo';
import {styles} from './styles.js'
import PropTypes from 'prop-types'
import {TimeInputField} from './TimeInputField.js'
import {convertInputToDisplayString} from './timeConversions.js'


/* This component allows the user to start a new session by 
inputting the desired work and rest times and the number of 
rounds they want. */
export class IntervalInputs extends Component{

	static propTypes = {
		handleReset: PropTypes.func,//the function to be called when the user submits their values
	} 
	
	constructor(props){
		super(props)
		
		this.state = {
			workTime:'',//in seconds
			restTime:'',//in seconds
			intervals:'',
			isValid:false//###TODO: Add validation checks
		}
	}
	
	componentDidUpdate(prevProps, prevState){
		if(this.state.workTime !== prevState.workTime || this.state.restTime !== prevState.restTime ||this.state.intervals !== prevState.intervals){
			this.validationCheck();
		}
	}
	
	handleWorkTimeChange = (workTime) =>{
		this.setState({workTime:workTime})
	}
	
	handleRestTimeChange = (restTime) =>{
		this.setState({restTime:restTime})
	}
	
	handleIntervalChange = (intervals) =>{
		this.setState({intervals:intervals});
	}
	
	//Are all three fields in the form filled out with numbers?
	validationCheck=()=>{
		if(this.state.workTime.match(/[\d]/)
			&&
		this.state.restTime.match(/[\d]/)
			&&
		this.state.intervals.match(/[\d]/)){
			this.setState({isValid:true});
		}
		else{
			this.setState({isValid:false});
		}
	}
	
	pushResetButton = () =>{
		this.props.handleReset(parseInt(this.state.workTime), parseInt(this.state.restTime), parseInt(this.state.intervals));
	}
	
	render(){
		return (
		<View>
			<Text>Work time: {convertInputToDisplayString(this.state.workTime)}</Text>
			<Text>Rest time: {convertInputToDisplayString(this.state.restTime)}</Text>
			<TimeInputField
				sendInput={this.handleWorkTimeChange}
				placeholderDisplay='work time'
			/>
			<TimeInputField
				sendInput={this.handleRestTimeChange}
				placeholderDisplay='rest time'
			/>
			<TextInput 
				keyboardType = 'numeric'
				placeholder = 'number of intervals'
				onChangeText = {this.handleIntervalChange}
			/>
			<Button 
				title= "START"
				onPress={this.pushResetButton}
				disabled={!this.state.isValid}
			/>
		</View>
		)
	}
}