import React, { Component } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { Constants } from 'expo';
import {styles} from './styles.js'
import PropTypes from 'prop-types'

export class Heading extends Component{
	static propTypes ={
		hText: PropTypes.string
	}
	
	render(){
		return (<Text style = {styles.heading}>{this.props.hText}</Text>)
	}
}