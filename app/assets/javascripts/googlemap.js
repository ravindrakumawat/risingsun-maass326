function google_maps_initialize(map_div,map_markers) {
  var stylez = [
                  {
                    featureType: "road",
                    elementType: "labels",
                    stylers: [
                      { visibility: "off" }
                    ]
                  },{
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [
                      { saturation: -100 },
                      { lightness: 40 },
                      { visibility: "simplified" }
                    ]
                  },{
                    featureType: "road.arterial",
                    elementType: "geometry",
                    stylers: [
                      { saturation: -100 },
                      { lightness: 70 },
                      { gamma: 0.4 },
                      { visibility: "simplified" }
                    ]
                  },{
                    featureType: "road.local",
                    elementType: "geometry",
                    stylers: [
                      { saturation: -100 },
                      { lightness: 20 },
                      { gamma: 0.8 },
                      { visibility: "simplified" }
                    ]
                  },{
                    featureType: "administrative",
                    elementType: "labels",
                    stylers: [
                      { lightness: -2 }
                    ]
                  },{
                    featureType: "landscape",
                    elementType: "labels",
                    stylers: [
                      { lightness: -2 }
                    ]
                  },{
                    featureType: "poi",
                    elementType: "all",
                    stylers: [
                      { lightness: -2 }
                    ]
                  },{
                    featureType: "water",
                    elementType: "labels",
                    stylers: [
                      { lightness: -2 }
                    ]
                  },{
                    featureType: "transit",
                    elementType: "all",
                    stylers: [
                      { visibility: "off" }
                    ]
                  }
                ];

  var myOptions = {
          center: new google.maps.LatLng(21.861,82.792),
          zoom: 6,
          mapTypeControl: false,
          navigationControl: true,
          navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
          mapTypeId: google.maps.MapTypeId.ROADMAP

  };
  var map = new google.maps.Map(document.getElementById(map_div), myOptions);
  var styledMapOptions = {
    map: map,
    name: "dfa"
  }


  var testmap = new google.maps.StyledMapType(stylez,styledMapOptions);
  map.mapTypes.set('dfa', testmap);
  map.setMapTypeId('dfa');
  var bounds = new google.maps.LatLngBounds();

  for (var i = 0; i < map_markers.length; i++) {
    var mloc = map_markers[i].marker;
    var mLatLng = new google.maps.LatLng(mloc['lat'], mloc['lng']);
    create_marker(map,mLatLng, mloc);
    bounds.extend(mLatLng);
  }
  if (map_markers.length == 1) {
    map.setZoom(9);
    map.setCenter(bounds.getCenter());
  }
  else { map.fitBounds(bounds); }


}

var infowindow = new google.maps.InfoWindow({});

/* Moved to a separate function so multiple info windows can be created */
function create_marker(map,latlng, mloc) {
    var marker = new google.maps.Marker({
      position: latlng,
      map: map
//      shadow: getMarkerShadow(mloc['icon']),
//      icon: getMarkerIcon(mloc['icon']),
//      title: mloc['title']
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(mloc["info_window_content"]);
      infowindow.open(map,marker);
    });
}

var icons = new Array();
function getMarkerIcon(iconColor) {
   if ((typeof(iconColor)=="undefined") || (iconColor==null)) { iconColor = "red"; }

   if (!icons[iconColor]) {
      icons[iconColor] = new google.maps.MarkerImage("/assets/"+iconColor +"-marker.png",
      new google.maps.Size(20, 20),
      new google.maps.Point(0,0),
      new google.maps.Point(6, 20));
   }

   return icons[iconColor];
}
function getMarkerShadow(iconColor) {
  var shadow = new google.maps.MarkerImage('/assets/shadow-marker.png',
    new google.maps.Size(22, 20),
    new google.maps.Point(0,0),
    new google.maps.Point(6, 20));
  return shadow;
}

if (typeof window.onload != 'function') {
  window.onload = google_maps_initialize('map_div',map_markers);
} else {
  old_before_google_map = window.onload;
  window.onload = function() {
    old_before_google_map();
    google_maps_initialize('map_div',map_markers);
  }
}