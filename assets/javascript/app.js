
createMap();


var map;
var infoWindow;

$(document).on("click", "#submit", function () {

    event.preventDefault();
    var newSearch = $("#search").val();
    console.log(newSearch);

    infoWindow = new google.maps.infoWindow();
    
    var service = new google.maps.places.PlacesService(map);



});


function createMap() {


    var losAngeles = { lat: 34.0349571, lng: -118.4708208 };
    console.log(google);

    map = new google.maps.Map(document.getElementById('map'), {

        center: losAngeles,
        zoom: 7

    });
    
}

// function callBack(results, status) {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//             createMarker(results[i]);
//         }
//     }
// }

// function createMarker(place) {
//     var placeLoc = place.geometry.location;
//     var marker = new google.maps.Marker({
//         map: map,
//         position: place.geometry.location

//     });

//     google.maps.event.addListener(marker, 'click', function () {
//         infoWindow.setContent(place.name);
//         infowindow.open(map, this);
//     });

// }