function location(id,long,lat,name,type,tel,working_time,email){ //class marker
    this._id = id;
    this.long = long;
    this.lat = lat;
    this.name = name;
    this.type = type;
    this.tel = tel;
    this.working_time = working_time;
    this.email = email;
}
function listOfLocation(){
  var locations = [];

  this.addLocation = function(newLocation){//dodaje novi marker
    locations.push(newLocation);
  };
  this.getLocation = function(index) {//vraca marker sa indexom
    return locations[index];
  };
  this.getLength = function(){//vraca trenutni broj indexa
     return locations.length;
  };
  this.removeLocation = function(index){//uklanja marker
    locations.splice(index,1);
  };
  this.getAllLocations = function(){
    return locations;
  };
  this.getLocationsInJSON = function(){
    return JSON.stringify(locations);
  };
  this.setLocationsFromJSON = function(locationsInJSON){
    locations = JSON.parse(locationsInJSON);
  };
}
