$(document).ready(function(){
      getMap(43.319366, 21.898338,false);//default location Nis
      watchMapPosition();
      $("#currentLocation").click(function CurrentPosition(){
        getMapLocation();
      });
});
