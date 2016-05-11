$(document).ready(function(){
  $('a[href$="explore.html"]').css("color","#9AFF9C");

  var locations = new listOfLocation();
  var urlDomain = "localHost";

  if(typeof(Storage) !== "undefined") {//ako browser ne podrzava localStorage
  urlDomain = localStorage.getItem("urlDomain");
    if(!urlDomain){//ako browser podrzava localStorage ali se aplikacija pokrece prvi put
      urlDomain = "localHost";
    }
  }else{
    alert("Sorry your browser doesen't support Local Storage!");
    console.log("Sorry your browser doesen't support Local Storage!");
  }
  $('#photo').attr('src', "http://"+urlDomain+":3000/images/temp.jpeg");
  $("#locationForm").submit(function(e){ //prevent default behaviour for Form
      e.preventDefault();
    });

      getMap(43.319366, 21.898338,false);//default location Nis
      $("#currentLocation").click(function CurrentPosition(){
        getMapLocation(onMapSuccess);//onMapSuccess is callback function
      });

      $.ajax({
        type: "GET",
        url: "http://"+urlDomain+":3000/api/getAllLocations",
        //data: location1,
        success: function(data){
          // console.log("Server response: All locations from server:");
          // console.log(data);
          locations.setLocationsFromJSON(JSON.stringify(data));
          prepareAndShowLocations(locations);
        }
      });

      //Favorites -------------------------------------------
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
      //End of Favorites -------------------------------------------
      //DeleteMarker -----------------------------------------------
      setIndexInModal = function(index) {
        $("#deleteMarkerBtn").attr("value",index);
        $("#deleteMarkerBtn").attr("disabled", false);// enable againg delete btn for next delete
        $("#infoLabel").html("");
      };
      deleteMarkerFromDataBase = function(){
        if($("#username").val()==""||$("#password").val()=="")//ne znam zasto form nece da odradi poso da blokira dugme dok se sve ne ispuni
          return;

        var id = locations.getLocation($("#deleteMarkerBtn").attr("value"))._id;//get id for selected location
        var username =  $("#username").val();
        var password = $("#password").val();

        $.ajax({
          type: "GET",
          url: "http://"+urlDomain+":3000/api/deleteLocation",
          data: {"id":id, "username":username, "password":password},//id value and admin info
          success: function(data){
            if(data=="SUCCESS"){
              $("#infoLabel").html("Successfully deleted");
              $("#deleteMarkerBtn").attr("disabled", true);// prevent double delete
              //if delete is ok then show locations again
              var index = $("#deleteMarkerBtn").attr("value");
              locations.removeLocation(index);//remove deleted location from local array
              prepareAndShowLocations(locations);
            }else if(data=="WRONG USERNAME AND PASSWORD"){
              $("#infoLabel").html("Wrong username and password");
            }
          }
        });
      }
      //End of DeleteMarker ----------------------------------------
      //InstantSearch ----------------------------------------------
      showInstantSearch =function(){//poziva se kada se klikne na search input field
        $(".instantSearch").show();
      };
      showSearchedLocationOnMap = function(lat,lng){//poziva se kada se klikne na neki item iz instantSearch
        $(".instantSearch").hide();
        setCenterOnMap(lat,lng);
      };
      searchLocation = function(){
        $(".instantSearch").children().first().click();
      };
      instantSearch = function(){
        if($("#searchImput").val()===""){
          $(".instantSearch").empty();
          return;
        }else{
          var types = getAllSelectedTypes();//get all selected checkBox
          //ajax GET Server
          $.ajax({
            type: "GET",
            url: "http://"+urlDomain+":3000/api/search",
            data: {"query" : $("#searchImput").val(),"type":types},
            success: function(data){
              $(".instantSearch").empty();
              // console.log(data);
              var searchLocation = new listOfLocation();
              searchLocation.setLocationsFromJSON(JSON.stringify(data));
              for(var i=0;i<searchLocation.getLength();i++){
                $(".instantSearch").append(
                '<p class="item" onclick=showSearchedLocationOnMap('+
                searchLocation.getLocation(i).lat +','+ searchLocation.getLocation(i).lng +') >'+
                searchLocation.getLocation(i).name +'</p>');
              }
            }
          });
      }
    };
    //returns all selected checkBox type of locations
    getAllSelectedTypes = function(){
      var types = [];
      if($("#checkboxRestaurant").is(':checked')){
        types.push($("#checkboxRestaurant").val());
      }
      if($("#checkboxCaffe").is(':checked')){
        types.push($("#checkboxCaffe").val());
      }
      if($("#checkboxKafana").is(':checked')){
        types.push($("#checkboxKafana").val());
      }
      if($("#checkboxPub").is(':checked')){
        types.push($("#checkboxPub").val());
      }
      return types;
    };
});
