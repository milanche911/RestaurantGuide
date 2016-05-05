function location(id,long,lat,name,type,tel,working_time){ //class marker
    this.id = id;
    this.long = long;
    this.lat = lat;
    this.name = name;
    this.tel = tel;
    this.working_time = working_time;

    this.proba = function(){
      console.log(this.name);
    }
}
function listOfLocation(){
  var locations = [];

  this.addLocation = function(newLocation){//dodaje novi marker
    locations.push(newLocation);
  }
  this.getLocation = function(index) {//vraca marker sa indexom
    return locations[index];
  }
  this.getLength = function(){//vraca trenutni broj indexa
    console.log(locations.length);
     return locations.length;
  }
  this.removeLocation = function(index){//uklanja marker
    locations.splice(index,1);
  }
}
