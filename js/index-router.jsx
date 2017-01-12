var map = new google.maps.Map(

	document.getElementById('map'),
	{
		center: {lat: 39.8282, lng: -98.5795},
		zoom: 4
	}
);

var infoWindow = new google.maps.InfoWindow({});
var markers = [];
var poiMarkers = [];
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
directionsDisplay.setMap(map);
directionsDisplay.setPanel(document.getElementById('directionsPanel'));

var start = 'Atlanta, GA';
var end;

function calcRoute() {
  var request = 
  	{
		origin: start,
		destination: end,
		travelMode: 'DRIVING'
	};
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
  });
}

function createMarker(city){
	var icon = 'http://i.imgur.com/RJ969om.png'
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
		infoWindow.setContent(`<div><strong>${city.city}</strong></div><div>${city.state}</div><div><p onclick= class="zoom-text">Click to zoom</p>`);
		infoWindow.open(map,marker);
	});
	markers.push(marker);
}

function createPoI(place){
	var infoWindow = new google.maps.InfoWindow({});
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location,
		icon: place.icon
	});
	google.maps.event.addListener(marker, 'click', () =>{
		infoWindow.setContent(place.name);
		infoWindow.open(map, marker);
	});
	poiMarkers.push(marker)
}

// ******* REACT ******* //
var GoogleCity = React.createClass({
	handleClickedCity: function(event){
		google.maps.event.trigger(markers[this.props.cityObject.yearRank-1],"click")
	},
	getDirections: function(){
		end = this.props.cityObject.city;
		markers.map(function(marker, index){
			marker.setMap(null);
		});
		calcRoute();
	},
	zoomIn: function(event){
		var cityLL = new google.maps.LatLng(this.props.cityObject.lat, this.props.cityObject.lon)
		map = new google.maps.Map(
			document.getElementById('map'),
			{
				zoom: 16,
				center: cityLL
			}
		)
		directionsDisplay.setMap(map);
		var service = new google.maps.places.PlacesService(map);
		service.nearbySearch(
			{
				location: cityLL,
				radius: 500,
				type: ['store']
			},
			function(results, status){
				if(status === 'OK'){
					results.map(function(currPlace,index){
						createPoI(currPlace);
					})
				}
			}
		);
		var bounds = new google.maps.LatLngBounds(cityLL);
		poiMarkers.map(function(currMarker,index){
			bounds.extend(currMarker.getPosition());
		})

		runFitBounds();
	},
	runFitBounds: function(){
		map.fitBounds(bounds);
	},
	render: function(){
		return(
			<tr>
				<td className="city-name" onClick={this.handleClickedCity}>{this.props.cityObject.city}</td>
				<td className="city-rank">{this.props.cityObject.yearRank}</td>
				<td><button className="btn btn-default btn-sm" onClick={this.getDirections}>Get directions</button></td>
				<td><button className="btn btn-default btn-sm" onClick={this.zoomIn}>Zoom in</button></td>
			</tr>
		)	
	}
});

var Cities = React.createClass({
	getInitialState: function(){
		return{
			currCities: this.props.routes[1].cities
		}	
	},
	handleInputChange: function(event){
		var newFilterValue = event.target.value;
		var filteredCitiesArray = [];
		this.props.routes[1].cities.map(function(currCity, index){
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
	setStartingLocation: function(event){
		start = event.target.value;
		
	},
	setStartingLocationText: function(event){

		this.setState({
			start: start
		})
	},
	render: function(){
		var cityRows = [];
		this.state.currCities.map(function(currentCity, index){
			createMarker(currentCity);
			cityRows.push(<GoogleCity cityObject={currentCity} key={index} />)
		});
		return(
			<div>
				<div className="form-group form-inline">
					<form onSubmit={this.updateMarkers}>
						<input className="input-items" placeholder="Search for city" type="text" onChange={this.handleInputChange} />
						<input className="btn btn-default btn-sm top-buttons" type="submit" value="Update markers on map"/>
					</form>
				</div>
				<form onSubmit={this.updateMarkers}>
					<input className="input-items" placeholder="Atlanta, GA" type="text" onChange={this.setStartingLocation} />
					<input className="btn btn-default btn-sm top-buttons" type="submit" onClick={this.setStartingLocationText} value="Set starting point"/>
				</form>
				<div className=" starting-location">
					Starting location for directions: <strong>{start}</strong>
				</div>
				<div className="col-xs-12">
					<table className="table table-striped">
						<thead>
							<tr>
								<th>City Name</th>
								<th>City Rank</th>
								<th>&nbsp;</th>
								<th>&nbsp;</th>
							</tr>
						</thead>
						<tbody>
							{cityRows}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
})

function Test(props){
	return(
		<h1>This is the Test route</h1>
	)
}

var App = React.createClass({
	render: function(){
		return(
			<div>
				<BootstrapNavBar />
				{this.props.children}
			</div>
		)
	}
})

var BootstrapNavBar = React.createClass({
	render: function(){
		return(
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href="#">WebSiteName</a>
					</div>
					<ul className="nav navbar-nav">
						<li><ReactRouter.IndexLink activeClassName="active" to="/">Home</ReactRouter.IndexLink></li>
						<li><ReactRouter.Link activeClassName="active" to="cities">Cities</ReactRouter.Link></li>
					</ul>
				</div>
			</nav>
		)
	}
})

ReactDOM.render(
	<ReactRouter.Router>
		<ReactRouter.Route path="/" component={App} >
			<ReactRouter.IndexRoute component={Cities} cities={cities} />
			<ReactRouter.Route path="/cities" component={Test} />
		</ReactRouter.Route>
	</ReactRouter.Router>,
	document.getElementById('cities-container')
)



