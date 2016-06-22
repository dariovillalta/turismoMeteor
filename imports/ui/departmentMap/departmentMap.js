import "./departmentMap.html";
import { Places } from '../../api/place.js';

if (Meteor.isClient) {
  var MAP_ZOOM = 15;
  var placesArray;

  Meteor.startup(function() {
    placesArray = Places.find();
    if (placesArray.count() == 0) {
      //
    };
  });

  Template.departmentMap.onCreated(function() {


    /*var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          // If the request succeeds, draw the place location on
          // the map as a marker, and register an event to handle a
          // click on the marker.
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
        }
      }
    });*/

  });

  Template.departmentMap.helpers({
  });
}
