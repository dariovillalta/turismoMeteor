export const Places = new Mongo.Collection('places');

let Schema = {};

Schema.location = new SimpleSchema({
  latitud: {
    type: Number,
    decimal: true
  },
  longitud: {
    type: Number,
    decimal: true
  }
});

Schema.comment = new SimpleSchema({
  commentUser: {
    type: String,
    max: 100
  },
  user: {
    type: String
  }
});

Schema.place = new SimpleSchema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  comments: {
    type: [Schema.comment]
  },
  rating: {
    type: Number
  },
  location: {
    type: Schema.location
  }
});

Places.attachSchema(Schema.place);

if(Meteor.isServer){
  Meteor.methods({
    'place.create'(place){
      Places.insert(place, function(err){
        console.log(place);
        if(err){
          console.log('llegamos2');
          throw new Meteor.Error('Error Mio: ' + err);
        }
      });
    },
      'place.remove'(place){
       Places.remove(place, function(err){
         if(err)
          throw new Meteor.Error('Error removing place: ' + err);
       });
     },
     'place.updateComment'(idGlobal, comentario){
        Places.update({id: idGlobal}, {
          $push: { comments: comentario }
        }, function(err){
          if (err) {
            throw new Meteor.Error('Error pppp: ' + err);
          };
        });
     },
     'place.updateRating'(idGlobal, puntuacion){
      console.log('me llamaron');
        Places.update({id: idGlobal}, {
          $set: { rating: puntuacion }
        }, function(err){
          if (err) {
            throw new Meteor.Error('Error pppp: ' + err);
          };
        });
     }
  });
}