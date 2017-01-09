function GoogleCity(props){
	return(
		<div className="city-name">
			{props.cityObject.city}
		</div>
	)
}

var Cities = React.createClass({
	render: function(){
		var cityRows = [];
		this.props.cities.map(function(currentCity,index){
			cityRows.push(<GoogleCity cityObject={currentCity} key={index} />)
		})
		return(
			<div>
				{cityRows}
			</div>
		)
	}
})


ReactDOM.render(
	<Cities cities={cities} />,
	document.getElementById('cities-container')
)