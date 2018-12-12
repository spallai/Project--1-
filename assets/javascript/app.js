var map;
var service;
var infoWindow = new google.maps.InfoWindow();
var lat;
var lng;
var markers = [];



initMap();
getLocation();



// Creates initial map that renders as soon as the page loads.
// Los Angeles is the initial center point before the maps/places api's ask to enable current-location services.
// initial zoom level is 13.


function initMap() {

    var myLocation = { lat: 34.0522, lng: -118.2437};

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLocation,
        zoom: 13
    });

}



// getLocation() checks to see if the user allowed us to use the current-location services.
// If they have allowed us to use it it will get the users current position and uses the showPosition 
// function to set the center of the map to the current position cordinates.
// If the user has not allowed us to use their current location, the map will never center itself over the users location.

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



// We use a document.on("click") function in order to capture the value of the input box with the id="search";
// The searchMap() function is then invoked and passed in the newSearch variable which is equal to whatever the user entered into the input box.

$(document).on("click", "#submit", function() {
    var newSearch = $("#search").val();
    searchMap(newSearch);
});



// 
// 

function searchMap(newSearch) {
    event.preventDefault();
    var request = {
        location: new google.maps.LatLng(lat, lng),
        query: newSearch,
        radius: 10,
        type: ['restaurant']
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
}



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



function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        console.log(place);
        var content = {
            name: place.name,
            address: place.formatted_address,
            rating: place.rating
        }

        console.log(content);
        var stringAddress = content.address;
        var stringName = content.name;
        var stringRating = content.rating;
        infoWindow.setContent(stringName +"<br>"+ stringAddress +"<br>"+ stringRating + " Stars");
        infoWindow.open(map, this);
    });

    markers.push(marker);
}



function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
        }
    }
}