import React, { Component } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { Constants } from 'expo';
import {Heading} from './Heading.js'
import {styles} from './styles.js'
import {BodyView} from './BodyView'
import PropTypes from 'prop-types'


/* //This app implements a timer that switches between two 
different lengths of time: a "work" time and a "rest" time. 
This can be used for timing pomodoro sessions or workout 
sessions, among other uses. Users are able to customize the 
durations of the "work" and "rest" periods and to specify 
the number of work sessions to be completed.
*/
export default class App extends Component{
	render(){
		return (
		<View style = {styles.container}>
		<Heading hText = "Interval Timer"/>
		<BodyView/>
		</View>
		);
	}
}
