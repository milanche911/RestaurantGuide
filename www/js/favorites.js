$(document).ready(function(){
    getMap(43.319366, 21.898338,false);//default location Nis

    addMarkerOnClick();//add event Listener on google map

    $("#currentLocation").click(function CurrentPosition(){
      getMapLocation();
  });
});
