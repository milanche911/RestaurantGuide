$(document).ready(function(){
  var locations = new listOfLocation();


      getMap(43.319366, 21.898338,false);//default location Nis

      $("#currentLocation").click(function CurrentPosition(){
        getMapLocation();
      });

      $.ajax({
        type: "GET",
        url: "http://localhost:3000/api/getAllLocations",
        //data: location1,
        success: function(data){
          console.log("Server response: All locations from server:");
          console.log(data);

          locations.setLocationsFromJSON(JSON.stringify(data));
          prepareAndShowLocations(locations);
        }
      });
      addToFavorites = function(index){
        console.log(locations.getLocation(index));
      }
});
