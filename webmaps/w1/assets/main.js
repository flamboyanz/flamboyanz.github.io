// Map Init
// Map Initiation
var map = L.map('mapid').setView([40.712775, -74.005973], 11);

// Layer tile: openstreetmap
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {}).addTo(map);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    center: [40.712775, -74.005973],
    maxZoom: 13,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicGFydmV6ayIsImEiOiJjamJnMDJ2cmEyeHZxMzRwZXJsOG16N3JsIn0.UrrntK0_M0WHR1t8NYW-aA'
}).addTo(map);

// Create Popup
function createPopup(name, latlng) {

    var latlng = L.latLng(latlng[0], latlng[1]);
    var nj_name = name;

    var popupContent = L.popup({
        maxWidth: 150,
        className: 'popup'
    })
        .setLatLng(latlng)
        .setContent(name);
    
    return popupContent;
}

// City: Newark airport
var newark_data = L.marker([40.735657, -74.172367]).addTo(map);

newark_data
.bindPopup(createPopup(
    "<p>Newark Liberty International Airport (EWR)</p>", 
    [50.5, 30.5])
)
.openPopup()
.bindTooltip('Air Delta Terminal', {
    direction: 'bottom',
    opacity: 0.7,
    className: 'tooltip',
    sticky: true
    }).openTooltip();

// City: JFK airport
var jfk_data = L.marker([40.641312, -73.778150]).addTo(map);

jfk_data
.bindPopup(createPopup(
    "<p>John F. Kennedy International Airport</p>", 
    [150.5, 130.5])
)
.openPopup()
.bindTooltip('Queens, NY 11430', {
    direction: 'right',
    opacity: 0.7,
    className: 'tooltip',
    sticky: true
});

// aGuardia airport
var lag_data = L.marker([40.776934, -73.873980]).addTo(map);

lag_data
.bindPopup(createPopup(
    "<span>LaGuardia Domestic Airport</span>", 
    [20.5, 30.5]))

.openPopup()
.bindTooltip('United Airlines Terminal', {
    direction: 'right',
    opacity: 0.7,
    className: 'tooltip',
    sticky: true
}).openTooltip();

// New York Skyports Inc-6n7
var skyports_data = L.marker([40.735356, -73.973912]).addTo(map);

skyports_data
.bindPopup(createPopup(
    "<span>New York Skyports Inc-6n7</span>", 
    [20.5, 30.5]));

// Teterboro Airport
var teterboro_data = L.marker([40.84, -74.061497]).addTo(map);

teterboro_data
.bindPopup(createPopup(
    "<span>Teterboro Airport</span>", 
    [20.5, 30.5]));

// Buttons
var wdc = document.querySelector('#wdc');
wdc.addEventListener('click', function(){
    var latlng1 = L.latLng(38.907192, -77.036871);
    map.panTo(latlng1);
});

var nyc = document.querySelector('#nyc');
nyc.addEventListener('click', function(){
    var latlng2 = L.latLng(40.712775, -74.005973);
    map.panTo(latlng2);
});

var nyc = document.querySelector('#pd');
nyc.addEventListener('click', function(){
    var latlng3 = L.latLng(39.952584, -75.165222);
    map.panTo(latlng3);
});

