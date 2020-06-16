import React, { Component } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { Constants } from 'expo';
import {Heading} from './Heading.js'
import {styles} from './styles.js'
import {BodyView} from './BodyView'
import PropTypes from 'prop-types'
import {convertToDisplayString, secToTimeUnits} from './timeConversions.js'


/* //This component displays the duration of a work time interval,
a rest time interval, and which round the timer is currently on */
export class StatsView extends Component{
	static propTypes = {
		currentRound:PropTypes.number,
		totalRounds:PropTypes.number, 
		workInterval:PropTypes.number, //in seconds
		restInterval:PropTypes.number, //in seconds
	}
	
	render(){
		return (
		<View>
			<Text>Round {this.props.currentRound} of {this.props.totalRounds}</Text>
			<Text>Work interval: {convertToDisplayString(secToTimeUnits(this.props.workInterval))}</Text>
			<Text>Rest interval: {convertToDisplayString(secToTimeUnits(this.props.restInterval))}</Text>
		</View>
		)
	}
}
