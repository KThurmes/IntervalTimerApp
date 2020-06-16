import React, { Component } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { Constants } from 'expo';
import {styles} from './styles.js'
import PropTypes from 'prop-types'
import {Clock} from './Clock.js'
import {StatsView} from './StatsView.js'

//Session contains all the onformation about the current session, including the clock and the stats view
export class Session extends Component{
	
	static propTypes = {
		workInterval: PropTypes.number, //workInterval units: seconds
		restInterval: PropTypes.number, //restInterval units: seconds
		rounds: PropTypes.number, //number of work intervals to be cycled through
	}
	
	constructor(props){
		super(props)
		
		this.incrementCurrentRound = this.incrementCurrentRound.bind(this);
	
		this.state = {
			currentRound: 0,
			intervalType: 1, //keeps track of whether we're in work, rest, or done interval
			finished: 0, 
		};
	}
	
	//Increment current round or set the "done" flag to true
	incrementCurrentRound = () => {
		this.setState(prevState=>({currentRound: prevState.currentRound+1}))
		if (this.state.currentRound > this.props.rounds){
			setFinished(1);
		}	
	}

	render(){
		return(
		<View>
			<StatsView
				currentRound = {this.state.currentRound+1}
				totalRounds = {this.props.rounds}
				workInterval = {this.props.workInterval}
				restInterval = {this.props.restInterval}
			/>
			<Clock 
				numRounds = {this.props.rounds}
				workInterval = {this.props.workInterval}
				restInterval = {this.props.restInterval}
				incrementCurrentRound = {this.incrementCurrentRound}
			/>
			
		</View>
		)
	}
}
