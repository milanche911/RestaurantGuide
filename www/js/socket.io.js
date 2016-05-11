$(document).ready(function(){

  //access to the localStorage and get urlDomain
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
  //end of access to the localStorage and get urlDomain

   socket = io("http://"+urlDomain+":3000");

   emitCurrentLocation = function(position){
     var updatedLatitude = position.coords.latitude;
     var updatedLongitude = position.coords.longitude;

     if (updatedLatitude != latitude && updatedLongitude != longitude) {//ako su se koordinate promenile emituj novu lokacuju

         latitude = updatedLatitude;
         longitude = updatedLongitude;
         socket.emit("myCurrentLocation",{lat:latitude,lng:longitude});
         console.log("Current position emited.");
     }
     console.log("Settimeout is seted");
     setTimeout(function(){getMapLocation(emitCurrentLocation);},10000);//pozovi ovu fun na svake 10s
   }

   socket.on('connect', function(){
    //  alert("Connected");
     $("#status").html("Connected");

     getMapLocation(emitCurrentLocation);//callback when geolocation find currentLocation
   });

   //when new picture added from other user
   socket.on("newPictureAdded",function(data){//set user image after upload is done
     $("#pictureStatus").html("");
     alert("Some user added new photo chack in gallery");
     //console.log("New picture added data from server: "+ data.imgBase64);
     $('#photo').attr('src', "http://"+urlDomain+":3000" + data + "?"+ new Date().getTime());//imageBase64 is picture in base64;
     //+ new Date().getTime() da bi forsirao browser da refresuje sliku zato sto se nalazi na istom url-u
   });
   socket.on("success",function(data){//ista funkcija kao ova gore stim sto ova stize samo onom kome salje (bez alerta)
     $("#pictureStatus").html("Successfuly added.");
     $('#photo').attr('src', "http://"+urlDomain+":3000" + data + "?"+ new Date().getTime());//imageBase64 is picture in base64;
   });

   //On Disconnected
   socket.on('disconnect', function(){
     $("#status").html("Disconnected");
   });
   // add event listenr for error only for socket who sent picture receve error
   socket.on("error",function(data){
     $("#pictureStatus").html(data);
     $("#photo").attr("src","img/sad_smiley.png");
   });
   //helper function
   sendPictureToServer = function(imgUrl){

     $("#photo").attr("src","img/progress.gif");

      toDataUrl(imgUrl, function(base64Img){

        socket.emit("userAddNewPicture",base64Img);
      },"image/jpeg");

   }
   //helper function for converting from url to dataUri [base64]
   function toDataUrl(url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
  }
});
