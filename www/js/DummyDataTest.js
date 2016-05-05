$(document).ready(function(){
  var markers = new listOfLocation();
//dummy data
  var location1 = new location(0,46.2,32.3,"Restoran1","Restaurant","018/561663","8-21h");
  var location2 = new location(1,45.2,31.3,"Restoran2","Restaurant","018/561663","8-21h");
  var location3 = new location(2,44.2,32.3,"Caffe1","Caffe","018/561663","8-21h");
  var location4 = new location(3,43.2,31.3,"Caffe2","Caffe","018/561663","8-21h");
  var location5 = new location(4,44.5,33.3,"Kafana1","Kafana","018/561663","8-21h");


  markers.addLocation(location1);
  markers.addLocation(location2);
  markers.addLocation(location3);
  markers.addLocation(location4);
  markers.addLocation(location5);

  markers.removeLocation(3);

  for(var i=0;i<markers.getLength();i++)
    markers.getLocation(i).proba();

    prepareAndShowLocations(markers);

});
