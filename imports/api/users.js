export const Users = Meteor.users;

if(Meteor.isServer){
  Meteor.methods({
    /*'users.update'(idGlobal, puntuacion){
      console.log('me llamaron');
      Places.update({id: idGlobal}, {
        $set: { rating: puntuacion }
      }, function(err){
        if (err) {
          throw new Meteor.Error('Error pppp: ' + err);
        };
      });
    },*/
    'users.update'(id, userNuevo, emailNuevo, permiso){
      Meteor.users.update({_id: id}, {
        $set: { username: userNuevo, email: emailNuevo, roles: permiso}
      }, function(err){
        if (err) {
          throw new Meteor.Error('Error pppp: ' + err);
        };
      });
    }
  });

  Accounts.onCreateUser(function(options, user){
    user.roles = [options.roles];
    return user;
  });

  Meteor.publish(null, function(){
    return Meteor.users.find();
  });
}