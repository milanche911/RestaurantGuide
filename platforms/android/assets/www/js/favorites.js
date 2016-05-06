$(document).ready(function(){

    var html = "";

    var favorites = JSON.parse(localStorage.getItem('favorites'));
    console.log(favorites);

    for(var i = 0; i < favorites.length; i++) {

      var image;

      switch (favorites[i].type) {
        case "Restaurant":
          image = "img/restaurant.png";
        break;
        case "Kafana":
          image = "img/kafana.png";
        break;
        case "Pub":
          image = "img/pub.png";
        break;
        case "Caffe":
          image = "img/caffe.png";
        break;
      }

      html+=    '<div class="media">'+
                '<div class="media-left">'+
                '<a href="#">'+
                '<img class="media-object" src="' + image + '" alt="...">'+
                '</a>'+
                '</div>'+
                '<div class="media-body">'+
                '<h4 class="media-heading">' + favorites[i].name + '</h4>'+
                '<div><span class="info-label">Type: </span><span>' + favorites[i].type + '</span></div>'+
                '<div><span class="info-label">Telephone: </span><span>' + favorites[i].tel + '</span></div>'+
                '<div><span class="info-label">email: </span><span>' + favorites[i].email + '</span></div>'+
                '<div><span class="info-label">Working time: </span><span>' + favorites[i].working_time + '</span></div>'+
                '</div>'+
                '</div><hr>';
    }

    var dom = $.parseHTML(html);

    $("#favorites").html(dom);
});
