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


$(document).on("click", "#submit", function() {
    var newSearch = $("#search").val(); //read text from input box #search
    searchMap(newSearch); //pass search term to search map
});


//turned searchMap into a function that can be used in recipeLogic
function searchMap(newSearch) {
    event.preventDefault();
    //var newSearch = $("#search").val();
    console.log(newSearch);

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