  // Get geo coordinates
  function getMapLocation() {
      // getMap(43.319366, 21.898338,false);//default location Nis
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
      placeMarker(latLong);
  };

  //Options

  var options = { enableHighAccuracy: true };

  // Get map by using coordinates

  function getMap(latitude, longitude,currentLocation) {

      var latLong = new google.maps.LatLng(latitude, longitude);
      var mapOptions = {
          center: latLong,
          zoom: 15,
          mapTypeControl: true,
          mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: google.maps.ControlPosition.TOP_CENTER
          },
          zoomControl: true,
          zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_CENTER
          },
          scaleControl: true,
          streetViewControl: true,
          streetViewControlOptions: {
              position: google.maps.ControlPosition.LEFT_TOP
          },
          fullscreenControl: false
      };
      map = new google.maps.Map(document.getElementById("map"), mapOptions);


      if(currentLocation){ //ako je trenutna lokacija odredjena onda postavi marker
        var marker = new google.maps.Marker({
            position: latLong
        });
        marker.setMap(map);
      }

      // map.setZoom(15);
      //map.setCenter(marker.getPosition());
  }

  // Success callback for watching your changing position

  var onMapWatchSuccess = function (position) {

      var updatedLatitude = position.coords.latitude;
      var updatedLongitude = position.coords.longitude;

      if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

          Latitude = updatedLatitude;
          Longitude = updatedLongitude;

          getMap(updatedLatitude, updatedLongitude,true);
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
       placeMarker(event.latLng);
    });
  }
  // add marker on map
  function placeMarker(location) {
      var marker = new google.maps.Marker({
          position: location,
          draggable:true,
          map: map
      });
  }
