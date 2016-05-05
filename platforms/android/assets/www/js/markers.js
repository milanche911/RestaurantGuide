function marker(id,long,lat,name,type,tel,working_time){ //class marker
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
function listOfMarkers(){
  var count = 0;
  var markers = new Array();

  this.add = function(marker){//dodaje novi marker
    markers[marker.id] = marker;
    count++;
  }
  this.getMarker = function(index) {//vraca marker sa indexom
    return markers[index];
  }
  this.getCount = function(){//vraca trenutni broj indexa
     return count;
  }
  this.removeMarker = function(index){//uklanja marker
    marker.splice();
  }
}

$(document).ready(function(){
  var markers = new listOfMarkers();
//dummy data
  var marker1 = new marker(0,46.2,32.3,"Restoran1","Restaurant","018/561663","8-21h");
  var marker2 = new marker(1,45.2,31.3,"Restoran2","Restaurant","018/561663","8-21h");
  var marker3 = new marker(2,44.2,32.3,"Caffe1","Caffe","018/561663","8-21h");
  var marker4 = new marker(3,43.2,31.3,"Caffe2","Caffe","018/561663","8-21h");
  var marker5 = new marker(4,44.5,33.3,"Kafana1","Kafana","018/561663","8-21h");

  markers.add(marker1);
  markers.add(marker2);
  markers.add(marker3);
  markers.add(marker4);
  markers.add(marker5);

  for(i=0;i<markers.getCount();i++)
    markers.getMarker(i).proba();
});
