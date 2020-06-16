
//Time units are JS objects that contain the hours, minutes, and seconds as key-value pairs
//Input times are strings in the form of hhmmss
//Display times are strings in the form of hh:mm:ss

	export function convertToTimeUnits(timeString){
		timeString = "000000" + timeString;
		console.log("time string= "+ timeString);
		let len = timeString.length;
		let timeUnits ={
			hours: parseInt(timeString.substring(len-6, len-4)),
			minutes: parseInt(timeString.substring(len-4,len-2)),
			seconds: parseInt(timeString.substring(len-2, len))
		}
		return timeUnits;
	}
	
	export function convertToSeconds(timeUnits){
		let total = 0;
		total = total + timeUnits.seconds;
		total += (timeUnits.minutes*60);
		total += (timeUnits.hours*60*60);
		return total;
	}

	export function convertToDisplayString(timeUnits){
		let hours = "00" + timeUnits.hours;
		hours = hours.substring(hours.length-2) + ':';
		let minutes = "00" + timeUnits.minutes;
		minutes = minutes.substring(minutes.length-2) + ':';
		let seconds = "00" + timeUnits.seconds;
		seconds = seconds.substring(seconds.length-2);
		
		let displayString = hours + minutes + seconds;

		return displayString;
	}
	
	export function convertInputToDisplayString(input){
		let ans = convertToTimeUnits(input);
		ans = convertToDisplayString(ans);
		return ans;
	}
	
	export function secToTimeUnits(totalSeconds){
		let seconds = totalSeconds % 60;
		let totalMinutes = Math.floor(totalSeconds / 60);
		let minutes = totalMinutes % 60;
		let hours = Math.floor(totalMinutes / 60);
		let timeUnits = {
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		}
		return timeUnits;
	}