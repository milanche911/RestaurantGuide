$(document).ready(function(){
  var urlDomain = "localhost";

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
         marker.position.lat(),
         marker.position.lng(),
         $("#locationName").val(),
         $("#locationType").val(),
         $("#telephone").val(),
         $("#working_time-from").val().toString() +"-"+ $("#working_time-until").val().toString()+"h",
         $("#email").val()
       );
       delete newLocation._id;
       console.log(newLocation);

       $.ajax({
         type: "POST",
         url: "http://"+urlDomain+":3000/api/insertLocation",
         data: newLocation,
         success: function(data){
          //  $("#saveBtn").disable();
           $("#saveBtn").html("New location inserted");
         }
       });
     }
  }

});
