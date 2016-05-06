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

      function containsObject(obj, list) { // helper function for checkig if object is in the list
          for(var i = 0; i < Object.keys(list).length; i++) {
            if( obj._id === list[i]._id) {
              return true;
            }
          }
          return false;
      }

      addToFavorites = function(index){ //adding distinct favorites into the local storage
        // console.log(locations.getLocation(index));
        var favorites = [];
        favorites = JSON.parse(localStorage.getItem('favorites'));
        if(favorites === null) {
          favorites = [];
        }
        var location = locations.getLocation(index);
        if(containsObject(location, favorites) === false) { //check if it is already in favorites if not then push it
          favorites.push(location);
        }
        localStorage.setItem('favorites',JSON.stringify(favorites)); //saving in local storage
      };
});
