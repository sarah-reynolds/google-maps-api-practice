
var buttonHTML = "";
buildButtons();
var map; 

function buildButtons(){
  for(let i = 0; i < cities.length; i++){
    buttonHTML += '<button class="btn btn-default" id="'+[i]+'" onclick="addMarker('+[i]+')">'+cities[i].city+'</button>';
  }
  document.getElementById('city-buttons').innerHTML = buttonHTML;
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: 39.0286, lng: -96.8314}
  });
}

function addMarker(num){
  console.log(num)
  var marker = new google.maps.Marker({
  position: {lat: cities[num].lat, lng: cities[num].lon},
  map: map
  });
}

