$(document).ready(function(){
  $('a[href$="add.html"]').css("color","#9AFF9C");
  getMap(43.319366, 21.898338,false);//default location Nis

  var marker;

  function placeMarker(location) {
    console.log(marker);
    if (marker) {
      marker.setPosition(location);
    } else {
       marker = new google.maps.Marker({
          position: location,
          draggable:true,
          map: map,
          animation: google.maps.Animation.DROP,
      });
    }
  }

  google.maps.event.addListener(map, 'click', function(event) {
      placeMarker(event.latLng);
  });
});
