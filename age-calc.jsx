function calculate(){

}

function Year(props){
	return(
		<p>{props.age}</p>
	)
}

var Calculater = React.createClass({
	getInitialState: function(){
		return{
			value: 2016
		}
	},

	handleChange: function(event){
		this.setState({
			value: (2016 - event.target.value)
		})
	},

	render: function(){
		var age = calculate();
		return(
			<div>
				<form>
					<input type="text" placeholder="Birth year" onChange={this.handleChange} />
					<input type="submit" value="click me" onChange={this.handleChange} />
					<Year age={this.state.value} />
				</form>
			</div>
		)
	}
})

ReactDOM.render(
	<Calculater />,
	document.getElementById('age-calc')
)