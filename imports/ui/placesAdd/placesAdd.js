import "./placesAdd.html";
import { Places } from '../../api/place.js';

Template.placesAdd.rendered = function() {
};

Template.placesAdd.helpers({
});

Template.placesAdd.events({
  "click #post"(event){
    var comment = [];
    var locationVar = {
      latitud: $("#latitud").val(),
      longitud: $("#longitud").val()
    }
    name = $("#name").val();
    var placeCreated = {
      id: $("#idAdd").val(),
      name: name,
      comments: comment,
      rating: $("#ratingAdd").val(),
      location: locationVar
    }
    Meteor.call('place.create', placeCreated, function(err){
      if(err){
        console.log(err);
        Materialize.toast("Error inesperado", 4000);
      }else {
        Materialize.toast("Libro agregado", 4000);
      }
    });
  }
});