$(document).ready(function(){

  // Get geo coordinates

  function getMapLocation() {

      navigator.geolocation.getCurrentPosition
      (onMapSuccess, onMapError, options);
  }

  // Success callback for get geo coordinates

  var onMapSuccess = function (position) {

      Latitude = position.coords.latitude;
      Longitude = position.coords.longitude;

      getMap(Latitude, Longitude);

  };

  //Options

  var options = { enableHighAccuracy: true };

  // Get map by using coordinates

  function getMap(latitude, longitude) {

    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 6,
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

      map = new google.maps.Map
      (document.getElementById("map"), mapOptions);

      //add marker on map on click
      google.maps.event.addListener(map, 'click', function(event) {
         placeMarker(event.latLng);
      });

      var latLong = new google.maps.LatLng(latitude, longitude);

      var marker = new google.maps.Marker({
          position: latLong
      });

      marker.setMap(map);
      map.setZoom(15);
      map.setCenter(marker.getPosition());
  }

  // Success callback for watching your changing position

  var onMapWatchSuccess = function (position) {

      var updatedLatitude = position.coords.latitude;
      var updatedLongitude = position.coords.longitude;

      if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

          Latitude = updatedLatitude;
          Longitude = updatedLongitude;

          getMap(updatedLatitude, updatedLongitude);
      }
  };

  // Error callback

  function onMapError(error) {
      console.log('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
  }

  // Watch your changing position

  function watchMapPosition() {

      return navigator.geolocation.watchPosition
      (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
  }

getMapLocation();

function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        draggable:true,
        map: map
    });
}

});
