var map = new google.maps.Map(

	document.getElementById('map'),
	{
		center: {lat: 39.8282, lng: -98.5795},
		zoom: 4
	}
);

var infoWindow = new google.maps.InfoWindow({});
var markers = [];

function createMarker(city){
	var icon = 'http://i.imgur.com/eQ3pSuK.png'
	var cityLL = {
		lat: city.lat,
		lng: city.lon
	}
	var marker = new google.maps.Marker({
		position: cityLL,
		map: map,
		title: city.city,
		icon: icon
	})
	google.maps.event.addListener(marker,'click', function(event){
		infoWindow.setContent(`<h2>${city.city}</h2><div>${city.state}</div>`);
		infoWindow.open(map,marker);
	});
	markers.push(marker);
}

// ******* REACT ******* //
var GoogleCity = React.createClass({
	handleClickedCity: function(event){
		console.log("someone clicked a city");
		google.maps.event.trigger(markers[this.props.cityObject.yearRank-1],"click")
	},
	render: function(){
		return(
			<tr>
				<td className="city-name" onClick={this.handleClickedCity}>{this.props.cityObject.city}</td>
				<td className="city-rank">{this.props.cityObject.yearRank}</td>
			</tr>
		)	
	}
});


var Cities = React.createClass({
	getInitialState: function(){
		return{
			currCities: this.props.cities
		}	
	},
	handleInputChange: function(event){
		var newFilterValue = event.target.value;
		var filteredCitiesArray = [];
		this.props.cities.map(function(currCity, index){
			if(currCity.city.toUpperCase().indexOf(newFilterValue.toUpperCase()) !== -1){
				filteredCitiesArray.push(currCity);
			}
		});
		this.setState({
			currCities: filteredCitiesArray
		})
	},
	updateMarkers: function(event){
		event.preventDefault();
		markers.map(function(marker, index){
			marker.setMap(null);
		});
		this.state.currCities.map(function(city,index){
			createMarker(city)
		});
	},

	render: function(){
		var cityRows = [];
		this.state.currCities.map(function(currentCity, index){
			createMarker(currentCity);
			cityRows.push(<GoogleCity cityObject={currentCity} key={index} />)
		});
		return(
			<div>
				<form onSubmit={this.updateMarkers}>
					<input type="text" onChange={this.handleInputChange} />
					<input type="submit" value="update markers"/>
				</form>
				<table>
					<thead>
						<tr>
							<th>City Name</th>
							<th>City Rank</th>
						</tr>
					</thead>
					<tbody>
						{cityRows}
					</tbody>
				</table>
			</div>
		)
	}
})

ReactDOM.render(
	<Cities cities={cities} />,
	document.getElementById('cities-container')
)