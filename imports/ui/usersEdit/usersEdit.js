import "./usersEdit.html";
import { Users } from '../../api/users.js';

Template.usersEdit.rendered = function() {
};

Template.usersEdit.helpers({
  users(){
    return Meteor.users.find();
  }
});

Template.usersEdit.events({
  "click #registrarBoton"(event){
    alert(Meteor.users.find());
    alert('fuck');
  },
  "click #editar"(event){
    var emailNuevo, userNuevo;
    var user = Meteor.users.findOne({username: this.username});
    if ($("#usernameEdit").val() == "") {
      userNuevo = user.username;
    }else{
      userNuevo = $("#usernameEdit").val();
    }
    if ($("#emailEdit").val() == "") {
      emailNuevo = user.emails[0].address;
    }else{
      emailNuevo = $("#emailEdit").val();
    }
    alert(userNuevo);
    alert(emailNuevo);
    /*Meteor.users.update({_id: user._id}, {
      $set: { "username": userNuevo, "email": emailNuevo }
    }, function(err){
      if (err) {
        throw new Meteor.Error('Error pppp: ' + err);
      };
    });*/
    Meteor.call('users.update', user._id, userNuevo, emailNuevo, function(err){
      if(err){
        console.log(err);
        Materialize.toast("Error inesperado", 4000);
      }else {
        Materialize.toast("Editado!", 4000);
      }
    });
  }
});