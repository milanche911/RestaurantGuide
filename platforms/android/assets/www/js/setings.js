document.addEventListener('deviceready', function () {

  $('a[href$="about.html"]').css("color","#9AFF9C");

  saveSetings = function(){

    if(typeof(Storage) !== "undefined") {

      var subscription = $("#subscription").is(':checked');

      localStorage.setItem("subscribe",subscription);

      if($("#urlDomain").val()==""){
        localStorage.setItem("urlDomain","localHost");
      }else{
        localStorage.setItem("urlDomain",$("#urlDomain").val());
      }

      //Odjavljivanje ili prijavljivanje na oneSignal
      window.plugins.OneSignal.setSubscription(subscription);

      $("#saveBtn").html("Setings successfuly saved.");
      $("#saveBtn").attr("disabled", true);

      setTimeout(function(){
        $("#saveBtn").html("Save");
        $("#saveBtn").attr("disabled", false);
      }, 2500);

    }else{
      console.log("Sorry your browser doesen't support Local Storage!");
    }


  }
  function setAllSetings(){
    if(typeof(Storage) !== "undefined") {
      
      var subscribe = localStorage.getItem("subscribe");
      if(subscribe==null){
        localStorage.setItem("subscribe",true);
      }

      var subscribe = localStorage.getItem("subscribe");
      var urlDomain = localStorage.getItem("urlDomain");

      if(subscribe=="true"){
        $("#subscription").prop('checked', true);
      }
      if(urlDomain!=null){
        $("#urlDomain").val(urlDomain);
      }
    } else {
        console.log("Sorry your browser doesen't support Local Storage!");
    }
  }

  setAllSetings();//set all setings if exist
}, false);
