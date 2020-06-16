import React, { Component } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { Constants } from 'expo';
import {styles} from './styles.js'
import PropTypes from 'prop-types'
import {secToTimeUnits, convertToDisplayString} from './timeConversions.js'
import {CountDown} from './CountDown.js'

export class Clock extends Component{
	
	static propTypes = {
		numRounds: PropTypes.number, //the number of rounds to be simulated
		workInterval: PropTypes.number, //the length of time (in seconds) for the work phase of the timer
		restInterval: PropTypes.number, //the length of time (in seconds) for the rest phase of the timer
		incrementCurrentRound: PropTypes.func //the function the clock performs when it has finished a round
	}
	
	state = {
		count: this.props.workInterval, //the number of seconds left on the timer
		repsLeft: this.props.numRounds-1, //number of rounds left after the current one finishes
		intervalType: 1 //see intervalTypeText for values
	};
	
	componentDidMount(){
		//Set an interval of 1 second
		this.timer = setInterval(this.decrementCount, 1000);
	}
	
	componentWillUnmount(){
		clearInterval(this.timer)
	}
	
	
	shouldComponentUpdate(){
		//Don't update if timer is at 0
		return (this.state.intervalType);
	}
	
	//Picker for displaying the state of the timer
	intervalTypeText(){
		if (this.state.intervalType == 1){
			return 'WORK';
		}
		
		if (this.state.intervalType == 2){
			return 'REST';
		}
		
		if (this.state.intervalType == 0){
			return 'DONE';
		}
	}
	
	//Decrease the count by 1 every 1 second
	decrementCount = () =>{
		if(this.state.count > 0){
			this.setState(prevState => ({count: prevState.count - 1}))
		}
		
		//If the timer is out, do something about it
		else{
			this.timerOut()
		}
	}
	
	//timerOut determines what to do when the timer reaches0, depending on what state it is currently in
	timerOut =() =>{
		if (this.state.repsLeft < 1){
			this.setState({intervalType: 0});
		}
		else if(this.state.intervalType == 1){
			this.switchToRest()
		}
		else if(this.state.intervalType == 2){
			this.startNewRep();
		}
	}
	
	//switchToRest will switch the state from "work" to "rest"
	switchToRest = () =>{
		this.setState({intervalType: 2});
		this.setState({count: this.props.restInterval});
	}
	
	//startNewRep switches from a rest period to a new work period
	startNewRep = () =>{
		this.setState(prevState =>({repsLeft: prevState.repsLeft - 1}))
		this.setState(prevState =>({intervalType: 1}))
		this.setState(prevState =>({count: this.props.workInterval}))
		this.props.incrementCurrentRound();
	}

	render(){
		return(
		<View style = {styles.timerBox}>
			<Text>{this.intervalTypeText()}</Text>
			<Text>Time remaining:</Text>
			<Text style = {styles.timeView}>{convertToDisplayString(secToTimeUnits(this.state.count))}</Text>
		</View>)
	}
}
