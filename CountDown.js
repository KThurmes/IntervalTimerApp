import React, { Component } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { Constants } from 'expo';
import {styles} from './styles.js'
import PropTypes from 'prop-types'
import {secToMin} from './timeConversions.js'

export class CountDown extends Component{
	
	static propTypes = {
		secondsAtStart: PropTypes.number,
		timerOut: PropTypes.func,
		resetFlag: PropTypes.number,
	}
	
	state = {
		count: this.props.secondsAtStart,
		done: 0,
		pause: 0,
	}

	componentDidMount(){
		this.timer = setInterval(this.decrementCount, 1000);
	}
	
	componentWillUnmount(){
		clearInterval(this.timer)
	}
	
	shouldComponentUpdate(){
		console.log(!this.state.pause && this.count > -1);
		return (!this.state.pause && this.count > -1);
	}
	
	restart(){
		this.setState({count:this.props.secondsAtStart, pause:0, resetFlag:0, done:0})
	}
	
	decrementCount = () =>{	
		if(this.state.count > 0){
			this.setState(prevState => ({count: prevState.count - 1}))
		}
		else{
			()=>this.timerOut()
		}
	}
	
	render(){
		
		if(this.props.resetFlag > 0){
			this.restart();
		}
		
		return(
		<View style = {styles.timerBox}>
			<Text>Time remaining:</Text>
			<Text style = {styles.timeView}>{secToMin(this.state.count)}</Text>
		</View>
		)
	}
}
