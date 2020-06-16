import React, { Component } from 'react';
import { Text, View, StyleSheet, Button} from 'react-native';
import { Constants } from 'expo';
import {styles} from './styles.js'
import {Session} from './Session.js'
import {IntervalInputs} from './IntervalInputs.js'
import {convertToTimeUnits, convertToSeconds} from './timeConversions.js'

//BodyView encompasses everything on the screen aside from the header
export class BodyView extends Component{
	
	constructor(props){
		super(props)//curently doesn't accept any props

		this.state = {
			restInterval: '',//the number of seconds that a rest period will last
			workInterval: '',//the number of seconds that a work period will last
			intervals: '', //how many times to cycle through a work period
			resetSession: 0, 
			showInputForm:true,
		}
	}
	
	//Resets the Session with parameters as the new values (in input form)
	handleReset = (newWorkTime, newRestTime, newIntervals) =>{
		newWorkTime = convertToSeconds(convertToTimeUnits(newWorkTime));
		newRestTime = convertToSeconds(convertToTimeUnits(newRestTime));
		this.setState(prevState=>({
				workInterval: newWorkTime, 
				restInterval: newRestTime,
				intervals: newIntervals,
				resetSession: !prevState.resetSession,
				existingSession:true,
				showInputForm:false,
			}))
	}
	
	showInputForm = ()=>{
		this.setState({showInputForm:true})
	}
	
	render(){
		return(
		<View>
			{this.state.existingSession && 
			<View>
				<Session
					workInterval = {this.state.workInterval}
					restInterval= {this.state.restInterval}
					rounds = {this.state.intervals}
					key = {this.state.resetSession}
				/>
				<Button
					title= "RESTART"
					onPress={()=>this.handleReset(this.state.workInterval, this.state.restInterval, this.state.intervals)}
				/>
				<Button
					title = "SET NEW INTERVALS"
					onPress={this.showInputForm}
				/>

			</View>
			}
			{this.state.showInputForm && 
			<IntervalInputs
			handleReset = {this.handleReset}/>
			}
				

		</View>
			)
	}
}