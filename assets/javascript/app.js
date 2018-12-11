var map;
var service;
var infoWindow = new google.maps.InfoWindow();
var lat;
var lng;
var markers = [];


initMap();
getLocation();

function initMap() {

    var myLocation = { lat: 34, lng: -118 };
    console.log(myLocation);

    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(34.0522, -118.2437),
        zoom: 13
    });

}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    map.setCenter(new google.maps.LatLng(lat, lng));
}


$(document).on("click", "#submit", function () {
    event.preventDefault();
    var newSearch = $("#search").val();
    console.log(newSearch);

    var request = {
        location: new google.maps.LatLng(lat, lng),
        radius: '1000',
        query: newSearch,
        type: ['restaurant']
    };
    console.log(google);

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);

})

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function deleteMarkers() {
    for (var i = 0; i < markers.length; i++) {
        setMapOnAll(null);
    }
    markers = [];
}

$(document).on("click", "#search", function () {

    deleteMarkers();
    

})
$("#leftCol").empty();

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(place.name);
        infoWindow.open(map, this);
    });

    markers.push(marker);
    console.log(markers);
}



function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);

        }
    }
}