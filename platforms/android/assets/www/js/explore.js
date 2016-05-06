$(document).ready(function(){
  var locations = new listOfLocation();
  var urlDomain = "192.168.0.101";

      getMap(43.319366, 21.898338,false);//default location Nis

      $("#currentLocation").click(function CurrentPosition(){
        getMapLocation();
      });

      $.ajax({
        type: "GET",
        url: "http://"+urlDomain+":3000/api/getAllLocations",
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

      //instantSearch -------------------------------------------
      showInstantSearch =function(){//poziva se kada se klikne na search input field
        $(".instantSearch").show();
      }
      showSearchedLocationOnMap = function(long,lat){//poziva se kada se klikne na neki item iz instantSearch
        $(".instantSearch").hide();
        setCenterOnMap(long,lat);
      }
      searchLocation = function(){
        $(".instantSearch:firist-child").click();
      }
      instantSearch = function(){
        if($("#searchImput").val()==""){
          console.log("val==0");
          $(".instantSearch").empty();
          return;
        }else{
          // console.log($("#searchImput").val());
          $.ajax({
            type: "GET",
            url: "http://"+urlDomain+":3000/api/getLocationByName",
            data: {"query" : $("#searchImput").val()},
            success: function(data){
              $(".instantSearch").empty();
              // console.log(data);
              var searchLocation = new listOfLocation();
              searchLocation.setLocationsFromJSON(JSON.stringify(data));
              for(var i=0;i<searchLocation.getLength();i++){
                $(".instantSearch").append(
                '<p class="item" onclick=showSearchedLocationOnMap('+
                searchLocation.getLocation(i).long +','+ searchLocation.getLocation(i).lat +') >'+
                searchLocation.getLocation(i).name +'</p>');
              }
            }
          });
      }
    }
    //instantSearch -------------------------------------------


});
