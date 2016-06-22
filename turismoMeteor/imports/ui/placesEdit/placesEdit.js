import "./placesEdit.html";
import { Places } from '../../api/place.js';

Template.placesEdit.rendered = function() {
};

Template.placesEdit.helpers({
  places(){
    return Places.find({});
  }
});

Template.placesEdit.events({
  "click #registrarBoton"(event){
      var Profile = {
        firstname: $("#firstnameInput").val(),
        lastname: $("#lastnameInput").val()
      }
      var User = {
        username: $("#emailInput").val(),
        email: $("#emailInput").val(),
        password: $("#passwordInput").val(),
        profile: Profile
      }
      Accounts.createUser(User, function(err){
        if(err){
          Materialize.toast('User already exists', 4000);
        }else{
          Materialize.toast('Registrado Correctamente', 4000);
          Router.go('/');
        }
      });
  }
});