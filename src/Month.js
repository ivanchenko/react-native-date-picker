'use strict';

import React    from 'react';
import {
	View,
	StyleSheet,
	Text
}               from 'react-native';
import Day      from './Day'

export default class Month extends React.Component {
	constructor(props) {
		super(props);

		this.weekDaysLocale = props.weekDaysLocale.slice();

		if (props.startFromMonday) {
			this.weekDaysLocale.push(this.weekDaysLocale.shift());
		}
	}

	render() {
		let {
			days, changeSelection, style, monthsLocale,
			bodyBackColor, bodyTextColor, headerSepColor, width, monthTextColor, showFullYear, weekTextStyles,
			monthHeaderTextStyles, monthHeaderStyles, useCircleMarkers
		} = this.props;

	 	let monthHeader;

		if(showFullYear){
			monthHeader = monthsLocale[days[15].date.getMonth()] + ' ' + days[15].date.getFullYear();
		}else {
			monthHeader = monthsLocale[days[15].date.getMonth()].toUpperCase()
		}

		return (
			<View style={[style, {width: width, backgroundColor: bodyBackColor}]}>
				<View style={monthHeaderStyles}>
					<Text style={[styles.monthHeader, {color: monthTextColor || bodyTextColor}, monthHeaderTextStyles]}>
						{monthHeader}
					</Text>
				</View>
				<View style={styles.monthDays}>
					{this.weekDaysLocale.map((dayName, i) => {
						return (
							<View
								key={i}
								style={[styles.weekDay, {
									borderColor: headerSepColor,
									width: width / 7,
									height: width / 7
								}]}
							>
								<Text style={[{color: bodyTextColor}, weekTextStyles]}>{dayName}</Text>
							</View>
						);
					})}
					{days.map((day, i) => {
						return (
							<Day
								key={i}
								{...this.props}
								disabled={day.disabled}
								status={day.status}
								date={day.date}
								onDayPress={changeSelection}
							/>
						);
					})}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	monthHeader: {
		alignSelf: 'center'
	},
	monthDays: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	weekDay: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});
