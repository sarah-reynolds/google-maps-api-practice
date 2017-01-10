function toCelcius(f){
	return (f-32) * 5/9;
}

function toFahrenheit(c){
	return (c*9/5) + 32;
}

// checks to see if can be converted (make sure user entered numbers)
function tryConvert(value, tUnit){
	var tryNumber = Number(value);
	if(isNaN(tryNumber)){
		// this is not a number
		return '';
	}else{
		// this is a valid number. we can converte
		if(tUnit == 'c'){
			var convertedNumber = toFahrenheit(tryNumber);
		}else{
			var convertedNumber = toCelcius(tryNumber);
		}
		return convertedNumber;

	}
}
// console.log('100 deg fahrenheit is ' +tryConvert(100,'f')+' celcius');
// console.log('0 deg celcius is '+tryConvert(0,'c')+' fahrenheit');

function BoilingVerdict(props){

	if(props.celcius >= 100){
		return(
			<p>The water would boil at {props.celcius}&deg; celsius / {props.fahrenheit}&deg; fahrenheit</p>
		)
	}else{
		return(
			<p>The water would NOT boil at {props.celcius}&deg; celsius / {props.fahrenheit}&deg; fahrenheit</p>
		)
	}
}

var TemperatureInput = React.createClass({

	handleChange: function(event){
		// this.setState({
		// 	value: event.target.value
		// })
		this.props.onChange(event.target.value)
	},
	render: function(){
		var value = this.props.value;
		var tUnits = this.props.tUnits;
		return(
				<div>
					<label>Enter temperature in question in {tUnits}:</label>
					<input placeholder="Temp" value={value} onChange={this.handleChange} />
				</div>
		)
	}
})

var Calculater = React.createClass({
	getInitialState: function(){
		return{
			value: 0,
			scale: 'c'
		}
	},
	handleCelciusChange: function(value){
		this.setState({
			scale: 'c',
			value: value
		})
	},
	handleFahrenheitChange: function(value){
		this.setState({
			scale: 'f',
			value: value
		})
	},
	render: function(){

		var scale = this.state.scale;
		var value = this.state.value;
		if(this.state.scale == 'c'){
			var fTemp = tryConvert(value,'c');
			var cTemp = value;
		} else if(this.state.scale == 'f'){
			var fTemp = value;
			var cTemp = tryConvert(value,'f');
		}

		return(
				<div>
					<TemperatureInput tUnits="Celcius" value={cTemp} onChange={this.handleCelciusChange} />
					<TemperatureInput tUnits="Fahrenheit" value={fTemp} onChange={this.handleFahrenheitChange} />
					<BoilingVerdict celcius={Number(cTemp)} fahrenheit={Number(fTemp)} />
				</div>
		)
	} 
})


ReactDOM.render(
	<Calculater />,
	document.getElementById('boiling')
)