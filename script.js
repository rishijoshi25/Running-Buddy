function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  
  const map = new google.maps.Map(document.getElementById('map'),{
    center: {lat: 42.8864, lng: -78.8784},
    zoom: 14,
    mapId: '2de7f355f243a55b'
  });
  directionsRenderer.setMap(map);
  
  const onChangeHandler = function() {
    console.log("onChangeHandler");
    calcRoute(directionsService, directionsRenderer);
  };
  document.getElementById("from").addEventListener("change", onChangeHandler);
  document.getElementById("to").addEventListener("change", onChangeHandler);

  calcRoute(from, to)
}

// Direction service
function calcRoute(directionsService, directionsRenderer, status) {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
    
  directionsService
  .route({
    origin: from,
    destination: to,
    travelMode: google.maps.TravelMode.WALKING,
  })
  .then((response) => {
    console.log(response);

    directionsRenderer.setDirections(response);
  })
  .catch((e) => window.alert("Directions request failed due to " + status));
}

window.initMap = initMap;

// Distance Matrix API
function calcDistance(){
  var from = new google.maps.LatLng(46.5610058, 26.9098054);
  var fromName = 'Buffalo, NY, USA';
  var dest = new google.maps.LatLng(44.391403, 26.1157184);
  var destName = 'Rochester, NY, USA';

  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [fromName],
      destinations: [destName],
      travelMode: 'DRIVING',
      avoidHighways: false,
      avoidTolls: false
    }, callback);

  function callback(response, status) {
    if(status != 'OK'){
      alert("Error");
    }
    if (status == 'OK') {
      var origins = response.originAddresses[0];
      var destinations = response.destinationAddresses[0];

      for (var i = 0; i < origins.length; i++) {
        var results = response.rows[i].elements;
        //console.log(results);
        for (var j = 0; j < results.length; j++) {
          var element = results[j];
          var distance = element.distance.text;
          var duration = element.duration.text;
          var from = origins[i];
          var to = destinations[j];
        }
        document.getElementById("demo").innerHTML = distance;
        document.getElementById("demo").innerHTML = duration;
      }
    }
  }
}