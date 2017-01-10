function tryConvert(tempUnit, temperature){
	

	if(tempUnit == "celsius"){
		var convertedNum = (temperature*9/5) + 32;
	}else{
		var convertedNum = (temperature-32) * 5/9;
	}
	return convertedNum
}

function BoilingVerdict(props){
	if(props.celcius > 100){
		return(
			<p>it is boiling</p>
		)
	}else{
		return(
			<p>NOT boiling</p>
		)
	}
}

var DisplayTempInput = React.createClass({
	handleChange: function(event){
		this.props.onChange(event.target.value)
	},

	render: function(){
	var value = this.props.value
		return(
			<div>
				<label>Enter temperature in {this.props.unitType}</label>
				<input type="text" placeholder="enter temp" value={value} onChange={this.handleChange} />
			</div>
		)
	}
})


var Calculator = React.createClass({
	getInitialState: function(){
		return{
			temperature: 0,
			tempUnit: 'celsius'
		}
	},

	handleCelsiusChange: function(value){
		this.setState({
			tempUnit: 'celsius',
			temperature: value
		})
	},

	handleFahrenheitChange: function(value){
		this.setState({
			tempUnit: 'fahrenheit',
			temperature: value
		})
	},

	render: function(){
		var tempUnit = this.state.tempUnit;
		var temperature = this.state.temperature;
		if(tempUnit == 'celcius'){
			var cTemp = temperature;
			var fTemp = tryConvert(tempUnit, temperature);
		}else{
			var fTemp = temperature;
			var cTemp = tryConvert(tempUnit, temperature);
		}
		return(
			<div>
				<DisplayTempInput unitType="celsius" onChange={this.handleCelsiusChange} value={cTemp} />
				<DisplayTempInput unitType="fahrenheit" onChange={this.handleFahrenheitChange} value={fTemp} />
				<BoilingVerdict celsius={Number(cTemp)} fahrenheit={Number(fTemp)} />
			</div>
		)
	}
})


ReactDOM.render(
	<Calculator />,
	document.getElementById('boiling')

)