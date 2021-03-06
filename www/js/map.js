  // Get geo coordinates
  var map;
  var markers = [];
  var markerCurrentLocation;
  var latitude;
  var longitude;

  //Options
  var options = { enableHighAccuracy: true };
  //get current location
  function getMapLocation(callback) {
      // getMap(43.319366, 21.898338,false);//default location Nis
      if(map === undefined)//ako mapa nije inicijalizovana a vec je kliknuto dugme za odredjivanje lokacije
        return;
      if(navigator)
          navigator.geolocation.getCurrentPosition(callback, onMapError, options);
        else{
          console.log("Browser doesen't support geolocation!");
        }
  }
  // Success callback for get geo coordinates
  var onMapSuccess = function (position) {

      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      var latLng = new google.maps.LatLng(latitude, longitude);

      map.setCenter(latLng);
      map.setZoom(19);
      addMarkerForCurrentLocation(latLng);
  };

  // Get map by using coordinates
  function getMap(latitude, longitude) {

      var latLng = new google.maps.LatLng(latitude, longitude);
      var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeControl: false,
          // mapTypeControlOptions: {
          //     style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          //     position: google.maps.ControlPosition.LEFT_CENTER
          // },
          zoomControl: true,
          zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_CENTER
          },
          scaleControl: true,
          streetViewControl: false,
          // streetViewControlOptions: {
          //     position: google.maps.ControlPosition.LEFT_TOP
          // },
          fullscreenControl: false
      };
      map = new google.maps.Map(document.getElementById("map"), mapOptions);
  }
  // Error callback
  function onMapError(error) {
      console.log('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
  }
  // add marker on map
  function addMarker(latLng,location,index) {//ako treba da se prikaze samo jedan marker onda se brisu svi markeri

    switch (location.type) {
      case "Restaurant":
        image = "img/restaurant.png";
      break;
      case "Kafana":
        image = "img/kafana.png";
      break;
      case "Pub":
        image = "img/pub.png";
      break;
      case "Caffe":
        image = "img/caffe.png";
      break;
    }

    var contentString = '<div id="info-window"><div><span class="info-label">Name: </span><span>' + location.name + '</span></div>'+
                        '<div><span class="info-label">Type: </span><span>' + location.type + '</span></div>'+
                        '<div><span class="info-label">Telephone: </span><span>' + location.tel + '</span></div>'+
                        '<div><span class="info-label">email: </span><span>' + location.email + '</span></div>'+
                        '<div><span class="info-label">Working time: </span><span>' + location.working_time + '</span></div>'+
                        '<div class="btns"><button type="button" onclick="addToFavorites(' + index + ');" class="btn btn-primary btn-xs">Favorite <i class="glyphicon glyphicon-heart"></i></button>'+
                        '<button type="button" onclick="setIndexInModal(' + index + ');" class="btn btn-danger btn-xs" data-toggle="modal" data-target="#myModal">Delete <i class="glyphicon glyphicon-trash"></i></button></div></div>';

    var infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

      var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          animation: google.maps.Animation.DROP,
          icon:image
      });

      marker.addListener("click", function() {
        infoWindow.open(map, marker);
      });

      markers.push(marker);
  }
  //set marker for current Location
  function addMarkerForCurrentLocation(latLng){
    if(markerCurrentLocation)
      markerCurrentLocation.setMap(null);

    var image = "img/bluedot.png";
    markerCurrentLocation = new google.maps.Marker({
        position: latLng,
        draggable:false,
        map: map,
        title:"You are here!",
        // animation: google.maps.Animation.DROP
        icon:image
    });
  }
  //delete markers from map only
  function clearMarkers(){
    setMapOnAll(null);
  }
  //show all markers in array on map
  function setMapOnAll(map){
    for(var i = 0;i<markers.length;i++)
      markers[i].setMap(map);
  }
  //delete all markers from map and array
  function deleteMarkers(){
    clearMarkers();
    markers = [];
  }
  //show locations from server on map
  function prepareAndShowLocations(listOfLocation){
      deleteMarkers();
      for(var i=0;i<listOfLocation.getLength();i++){
        addMarker(new google.maps.LatLng(listOfLocation.getLocation(i).lat, listOfLocation.getLocation(i).lng),listOfLocation.getLocation(i),i);
      }
  }
  //set center on map
  function setCenterOnMap(lat,lng){
    map.setCenter(new google.maps.LatLng(lat,lng));
    map.setZoom(19);
  }



//Stvari koje se ne koriste ali sluze kao podsetnik
  // // Watch your changing position
  // function watchMapPosition() {
  //     return navigator.geolocation.watchPosition(onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
  // }
  // Success callback for watching your changing position
  // var onMapWatchSuccess = function (position) {
  //
  //     var updatedLatitude = position.coords.latitude;
  //     var updatedLongitude = position.coords.longitude;
  //
  //     if (updatedLatitude != latitude && updatedLongitude != longitude) {
  //
  //         latitude = updatedLatitude;
  //         longitude = updatedLongitude;
  //
  //         addMarkerForCurrentLocation(new google.maps.LatLng(latitude, longitude));
  //     }
  // };

  //Funkcija namenjena za add formu ali nije zazivela
  // //add marker on map on click
  // function addMarkerOnClick(){
  //   google.maps.event.addListener(map, 'click', function(event) {
  //     var location = new Location();
  //     location.type = "Restaurant";
  //      addMarker(event.latLng,location);
  //   });
  // }
