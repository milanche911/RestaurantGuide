  // Get geo coordinates
  var map;
  var markers = [];
  var markerCurrentLocation;
  var latitude;
  var longitude;
  function getMapLocation() {
      // getMap(43.319366, 21.898338,false);//default location Nis
      if(map == undefined)//ako mapa nije inicijalizovana a vec je kliknuto dugme za odredjivanje lokacije
        return;
      if(navigator)
          navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, options);
        else{
          console.log("Browser doesen't support geolocation!");
        }
  }
  // Success callback for get geo coordinates
  var onMapSuccess = function (position) {

      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      var latLong = new google.maps.LatLng(latitude, longitude);

      map.setCenter(latLong);
      map.setZoom(19);
      addMarkerForCurrentLocation(latLong);
  };

  //Options
  var options = { enableHighAccuracy: true };

  // Get map by using coordinates
  function getMap(latitude, longitude) {

      var latLong = new google.maps.LatLng(latitude, longitude);
      var mapOptions = {
          center: latLong,
          zoom: 15,
          mapTypeControl: true,
          mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
              position: google.maps.ControlPosition.LEFT_CENTER
          },
          zoomControl: true,
          zoomControlOptions: {
              position: google.maps.ControlPosition.LEFT_CENTER
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

  // Success callback for watching your changing position
  var onMapWatchSuccess = function (position) {

      var updatedLatitude = position.coords.latitude;
      var updatedLongitude = position.coords.longitude;

      if (updatedLatitude != latitude && updatedLongitude != longitude) {

          latitude = updatedLatitude;
          longitude = updatedLongitude;

          addMarkerForCurrentLocation(new google.maps.LatLng(latitude, longitude));
      }
  };

  // Error callback
  function onMapError(error) {
      console.log('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
  }

  // Watch your changing position
  function watchMapPosition() {
      return navigator.geolocation.watchPosition(onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
  }

  //add marker on map on click
  function addMarkerOnClick(){
    google.maps.event.addListener(map, 'click', function(event) {
       addMarker(event.latLng);
    });
  }
  // add marker on map
  function addMarker(latLong) {//ako treba da se prikaze samo jedan marker onda se brisu svi markeri
      var marker = new google.maps.Marker({
          position: latLong,
          draggable:true,
          map: map,
          animation: google.maps.Animation.DROP
      });
      markers.push(marker);
  }
  //set marker for current Location
  function addMarkerForCurrentLocation(latLong){
    if(markerCurrentLocation)
      markerCurrentLocation.setMap(null);

    var image = "img/bluedot.png";
    markerCurrentLocation = new google.maps.Marker({
        position: latLong,
        draggable:false,
        map: map,
        title:"You are here!",
        // animation: google.maps.Animation.DROP
        icon:image
    });
  }
  //work with markers
  function showOnMap(map){
    for(var i =0; i<markers.lenght; i++)
      markers[i].setMap(map);
  }
  function clearMarkers(){
    setMapOnAll(null);
  }
  //show all markers in array on map
  function setMapOnAll(map){
    for(var i = 0;i<markers.lenght;i++)
      markers[i].setMap(map);
  }
  //delete all markers from map and array
  function deleteMarkers(){
    clearMarkers();
    markers = [];
  }

  function prepareAndShowMarkers(listOfLocation){

  }
