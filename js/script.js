var bandIs = function (){
    var bandQuery = "run river north"
    var queryURL = "https://rest.bandsintown.com/artists/" + bandQuery + "/events?app_id=bandit"
    //  band is in town api
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(resultsEvent){
        // console.log(resultsEvent)
        for ( var i =0; i<resultsEvent.length; i++){
            console.log(resultsEvent[i])
            var venue = resultsEvent[i].venue;
            var div = $("<div>");
            var city = $("<p>").text(venue.city);
            var lat = venue.latitude;
            var long = venue.longitude;
            var name = $("<p>").text(venue.name).attr({
                "class": "venue",
                "data-lat": lat,
                "data-long": long
            });

            div.append(city, name);
            $("body").append(div);
        }
    })
}
var yelpfunction= function(){
  // function that occurs when the user pick a single venue
  $(".venue").on("click", function(){
    var lati = $(this).attr("data-lat")
    var longi = $(this).attr("data-long")
    var userSelects="bar, restaurant"; //have user select which catagory to select in html so they can choose what stores

    var newSearchRequest= {
      categories: userSelects,
      latitude: lati,
      longitude: longi
    }
    $.post("/yelp", newSearchRequest, function(data){
      // console loging all the data as array and json object
      console.log(data);
      // use this to get google map intergration and info we want to give out as output for all the store info
    });
  })
}
bandIs();
$(document).on("click", ".venue", function(){
    var lati = $(this).attr("data-lat")
    var longi = $(this).attr("data-long")
    console.log(lati)
    console.log(longi)
})

//* Google Maps JS *//

// get goole map function with marker set desired location
function initMap() {
  var capitalGrill = {lat: 38.89331, lng: -77.0205} // replace capitalGrill with venue lati and longi
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: '', // zoom in to neighborboods near the venue
    center: capitalGrill
  });
  var image = 'https://png.icons8.com/color/50/000000/music.png'
  var musicmarker = new google.maps.Marker({
    position: capitalGrill,
    map: map,
    icon: image
  })
  map.setZoom(14)
  map.panTo(marker.position)
}
initMap()

//
