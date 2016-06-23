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
    'users.update'(id, userNuevo, emailNuevo){
      Meteor.users.update({_id: id}, {
        $set: { username: userNuevo, email: emailNuevo }
      }, function(err){
        if (err) {
          throw new Meteor.Error('Error pppp: ' + err);
        };
      });
    }
  });
}