import "./usersEdit.html";
import { Users } from '../../api/users.js';

Template.usersEdit.onRendered(function(){
  Meteor.subscribe('Users');
});

Template.usersEdit.helpers({
  users(){
    return Meteor.users.find({});
  }
});

Template.usersEdit.events({
  "click #registrarBoton"(event){
    var placesArregloFixed = Meteor.users.find().fetch();
    for (var i = 0; i < placesArregloFixed.length; i++) {
        console.log(placesArregloFixed[i].username);
        console.log(placesArregloFixed[i]);
    }
    alert(Meteor.users.find());
    alert('fuck');
  },
  "click #editar"(event){
    var emailNuevo, userNuevo;
    if ($("#usernameEdit").val() == "") {
      userNuevo = this.username;
    }else{
      userNuevo = $("#usernameEdit").val();
    }
    if ($("#emailEdit").val() == "") {
      emailNuevo = this.emails[0].address;
    }else{
      emailNuevo = $("#emailEdit").val();
    }
    var permiso = $('input[name=groupRol]:checked', '#radios').val();
    var hola = Roles.getAllRoles().fetch();
    if($("#usernameEdit").val() != "" || $("#emailEdit").val() != "" || permiso)
      Meteor.call('users.update', this._id, userNuevo, emailNuevo, permiso, function(err){
        if(err){
          console.log(err);
          Materialize.toast("Error inesperado", 4000);
        }else {
          Materialize.toast("Editado!", 4000);
        }
      });
  }
});