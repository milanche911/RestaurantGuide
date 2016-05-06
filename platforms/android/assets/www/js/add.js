$(document).ready(function(){
  $('a[href$="add.html"]').css("color","#9AFF9C");

  $("#locationForm").submit(function(e){ //prevent default behaviour for Form
      e.preventDefault();
    });

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

  saveLocation = function(){
     if(!marker){
       $("#saveBtn").html("Select location on map");
        setTimeout(function(){
          $("#saveBtn").html("Save");
        }, 2000);
     }else{
       var newLocation = new location(
         0,
         marker.position.lng(),
         marker.position.lat(),
         $("#locationName").val(),
         $("#locationType").val(),
         $("#telephone").val(),
         $("#working_time-from").val() +" "+ $("#working_time-until").val(),
         $("#email").val()
       );
       console.log(newLocation);
     }
  };
});
