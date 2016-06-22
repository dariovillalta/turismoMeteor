import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Places } from '../imports/api/place.js';

import "../imports/routes/router.js";
import './main.html';

var placesArray = Places.find();
var idGlobal;

Template.departmentMap.onRendered(function() {
	alert(placesArray.count());

    var map;
    placesArray = Places.find();
    initMap();
    function initMap() {
    	var myLatlng = new google.maps.LatLng(14.1, -87.21666666670001);

    	var myOptions = {
	        mapType: 'styledMap',
	        center: myLatlng,
	        zoom: 8,
	        disableDefaultUI: true,
	        disableDoubleClickZoom: false,
	        //scrollwheel: false,
	        scaleControl: false,
	        center: myLatlng
	    };
	    var styles = [ 
	    	{featureType: 'poi.attraction',
            	elementType: 'labels',
            	stylers: [{color: '#fce8b2'}]
          	},
          	{featureType: 'road.highway',
            	stylers: [{hue: '#0277bd'}, {saturation: -50}]
          	},
          	{featureType: 'road.highway',
            	elementType: 'labels.icon',
            	stylers: [{hue: '#000'}, {saturation: 100}, {lightness: 50}]
          	},
          	{featureType: 'landscape',
            	stylers: [{hue: '#259b24'}, {saturation: 10}, {lightness: -22}]
          	},
          	{featureType: 'road',
            	elementType: 'all',
            	stylers: [{visibility: 'off'}]
          	},
          	{featureType: 'adminstrative.country',
           		elementType: 'labels',
           		stylers: [{visibility: 'off'}]
          	},
          	{featureType: 'adminstrative.province',
           		elementType: 'geometry.stroke',
           		stylers: [{visibility: 'off'}]
          	}
      	]

      	map = new google.maps.Map(document.getElementById('googleMap'),myOptions);

      	map.setOptions({styles: styles});

      	// Bounds for North America
	    var strictBounds = new google.maps.LatLngBounds(
	    	new google.maps.LatLng(13.7306433, -87.6238812), 
	        new google.maps.LatLng(14.9848379, -86.6860951)
	    );

	    /*console.log('antes');
	    google.maps.event.addListener(map, 'dragend', function() {
	    	console.log('entra drag');
	        if (strictBounds.contains(map.getCenter())) {
	        	console.log('cumple');
	        	console.log('x = ' + map.getCenter().lng() + '	y = ' + map.getCenter().lat());
	        	console.log(strictBounds.contains(map.getCenter()))
	        	alert(map.getCenter());
	        	return;
	        }
	        // We're out of bounds - Move the map back within the bounds
	        var c = map.getCenter(),
	        	x = c.lng(),
	            y = c.lat(),
	            maxX = strictBounds.getNorthEast().lng(),
	            maxY = strictBounds.getNorthEast().lat(),
	            minX = strictBounds.getSouthWest().lng(),
	            minY = strictBounds.getSouthWest().lat();
	            console.log('drag');
	        if (x < minX) {
	          console.log('minX='+minX+'	X='+x);
	          console.log(x < minX);
	          console.log(x < maxX);
	          x = minX;          
	        }
	        if (x > maxX) {
	          console.log('maxX='+maxX+'	X='+x);
	          x = maxX;
	        }
	        if (y < minY) {
	          console.log('minY='+minY+'	Y='+y);
	          y = minY;
	        }
	        if (y > maxY) {
	          console.log('maxY='+maxY+'	Y='+y);
	          y = maxY;
	        }

	        map.setCenter(new google.maps.LatLng(y, x));
	    });*/
		
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map
		});
		var ctaLayer = new google.maps.KmlLayer('http://www.worldmapfinder.com/KMZ/HND_Francisco_Morazan_Department.kmz');
		ctaLayer.setMap(map);

		var infoWindow = new google.maps.InfoWindow();
  	  	var service = new google.maps.places.PlacesService(map);


  	  	var urlLugar, iteradorLugar = 0, cargo = 0;
  	  	var arregloLugares =  ["restaurant", "gas station", "zoo", "taxi stand", "bus station", "clothing store", "department store", "cafe", "atm", "bank", "bar", "casino", "liquor store", "movie theater", "amusement park", "aquarium", "art gallery", "museum", "airport","stadium"];

  	  	map.addListener('idle', performSearch);

      	function performSearch() {
      		if(cargo ==  0){
      			cargo = 1;
	      		iteradorLugar = 0
	      		for (var i = 0; i < 4; i++) {
		  	  		urlLugar = arregloLugares[i];
		  	  		//console.log('i = ' + i + '	Lugar = ' + arregloLugares[i]);
		  	  		var request = {
				    	bounds: map.getBounds(),
				    	keyword: urlLugar
					};
					service.radarSearch(request, callback);
		  		};
			}	  
	  	}

		function callback(results, status) {
			if (status !== google.maps.places.PlacesServiceStatus.OK) {
		    console.error(status);
		    return;
		  }
		  //console.log('key = ' + results[0].keyword);
		  alert('count' + placesArray.count());
		  if(placesArray.count() == 0){
			for (var i = 0, result; result = results[i]; i++) {
			    addMarker(result);
			    //console.log('1'+result+'	i=' + i);
			    var comment = [];
			    var locationVar = {
			    	latitud: result.geometry.location.lat(),
			    	longitud: result.geometry.location.lng()
			    }
			    var placeCreated = {
					id: result.id,
					comments: comment,
					rating: 0,
					location: locationVar
				}
				console.log('LLego antes');
				Meteor.call('place.create', placeCreated, function(err){
					console.log('LLego entro');
					if(err){
						console.log(err);
						Materialize.toast("Error inesperado", 4000);
					}else {
						Materialize.toast("Libro agregado", 4000);
					}
				});
			}
		  }/*else{
		  	var placesArregloFixed = placesArray.fetch();
			for (var i = 0; i < placesArregloFixed.length; i++) {
			    addMarkerCreada(placesArregloFixed[i]);
			}
		  }*/
		  else{
			for (var i = 0, result; result = results[i]; i++) {
		  		addMarker(result);
		  		var lugar = Places.findOne({id: result.id});
				if( lugar ){
				}else{
					var comment = [];
				    var locationVar = {
				    	latitud: result.geometry.location.lat(),
				    	longitud: result.geometry.location.lng()
				    }
				    var placeCreated = {
						id: result.id,
						comments: comment,
						rating: 0,
						location: locationVar
					}
					Meteor.call('place.create', placeCreated, function(err){
						console.log('LLego entro');
						if(err){
							console.log(err);
							Materialize.toast("Error inesperado", 4000);
						}else {
							Materialize.toast("Libro agregado", 4000);
						}
					});
				}
		  	}
		  	var placesArregloFixed = placesArray.fetch();
			for (var i = 0; i < placesArregloFixed.length; i++) {
			    addMarkerCreada(placesArregloFixed[i]);
			}
		}
		iteradorLugar++;
		}

		function addMarker(place) {
			var urlLugar;

			if(iteradorLugar == 0){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/icon_greenR.png";
			} else if (iteradorLugar == 1){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/icon_greenG.png";
			} else if (iteradorLugar == 2){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/icon_greenZ.png";
			} else if (iteradorLugar == 3 || iteradorLugar == 4){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/icon_greenT.png";
			} else if (iteradorLugar == 5 || iteradorLugar == 6){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/icon_greenS.png";
			} else if (iteradorLugar == 7){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/icon_greenC.png";
			} else if (iteradorLugar == 8 || iteradorLugar == 9){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/icon_greenB.png";
			} else if (iteradorLugar == 10 || iteradorLugar == 11 || iteradorLugar == 12){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/dd-via.png";
			} else if (iteradorLugar == 13){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/icon_greenM.png";
			} else if (iteradorLugar == 14 || iteradorLugar == 15 || iteradorLugar == 16 || iteradorLugar == 17){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/marker_sprite.png";
			} else if (iteradorLugar == 18){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/marker_greenA.png";
			}else if (iteradorLugar == 19){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png";
			}
			var marker = new google.maps.Marker({
				map: map,
			    position: place.geometry.location,
			    icon: {
			    	url: urlLugar,
			    	anchor: new google.maps.Point(10, 10),
			      	scaledSize: new google.maps.Size(20, 27)
			    }
			});

			google.maps.event.addListener(marker, 'click', function() {
				service.getDetails(place, function(result, status) {
					if (status !== google.maps.places.PlacesServiceStatus.OK) {
						console.error(status);
						return;
					}
					infoWindow.setContent('<div><strong>' + result.name + '</strong><br>' +
						'Place ID: ' + result.place_id + '<br>' + result.formatted_address + '</div>');
					infoWindow.open(map, marker);
					var lugar = Places.findOne({id: result.id});
					idGlobal = result.id;
					$( "#rating" ).empty();
					$( "#rating" ).append( '<b>Rating: </b>' );
					if (lugar.rating>0) {
						for (var i = 0; i < lugar.rating; i++) {
							console.log('dorada');
							$( "#rating" ).append( '<img data-value="' + i + '" class="theImg" src="images/Star_max-b.png" />' );
						};
					}
					for (var i = lugar.rating; i < 5; i++) {
						$( "#rating" ).append( '<img data-value="' + i + '"class="theImg" src="images/Star.png" />' );
						console.log($(this).data('value'));
					};
					$( "#comments" ).empty();
					console.log(idGlobal);
					console.log(lugar.comments.length);
					console.log(lugar);
					$( "#comments" ).append( '<p class="center-align">Comentarios</p>' );
					for (var i = 0; i < lugar.comments.length; i++) {
						$( "#comments" ).append( '<div class="com"> <p class="center-align">'+ lugar.comments[i].commentUser +'</p>' +
							'<hr> <p class="right-align byUser"> Por: ' + lugar.comments[i].user + ' </div>' );
					}; 
					$('#placeName').text(result.name);
					var photo = place.photos;
					if (photo) {
						alert(photo.length);
					}
					$('#modal1').openModal();
				});
			});
		}

		function addMarkerCreada(place) {
			
			var urlLugar;
			if(iteradorLugar == 0){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/icon_greenR.png";
			} else if (iteradorLugar == 1){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/icon_greenG.png";
			} else if (iteradorLugar == 2){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/icon_greenZ.png";
			} else if (iteradorLugar == 3 || iteradorLugar == 4){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/icon_greenT.png";
			} else if (iteradorLugar == 5 || iteradorLugar == 6){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/icon_greenS.png";
			} else if (iteradorLugar == 7){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/icon_greenC.png";
			} else if (iteradorLugar == 8 || iteradorLugar == 9){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/icon_greenB.png";
			} else if (iteradorLugar == 10 || iteradorLugar == 11 || iteradorLugar == 12){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/dd-via.png";
			} else if (iteradorLugar == 13){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/icon_greenM.png";
			} else if (iteradorLugar == 14 || iteradorLugar == 15 || iteradorLugar == 16 || iteradorLugar == 17){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/marker_sprite.png";
			} else if (iteradorLugar == 18){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/marker_greenA.png";
			}else if (iteradorLugar == 19){
				urlLugar = "http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png";
			}
			console.log(place);
			var pos = new google.maps.LatLng(place.location.latitud, place.location.longitud);
			var marker = new google.maps.Marker({
				map: map,
			    position: pos,
			    icon: {
			      url: urlLugar,
			      anchor: new google.maps.Point(10, 10),
			      scaledSize: new google.maps.Size(20, 27)
			    }
			});

			google.maps.event.addListener(marker, 'click', function() {
				service.getDetails(place, function(result, status) {
			      	if (status !== google.maps.places.PlacesServiceStatus.OK) {
			        	console.error(status);
			        	return;
			      	}
			      	infoWindow.setContent('<div><strong>' + result.name + '</strong><br>' +
		          	'Place ID: ' + result.id + '<br>' +
		          	result.formatted_address + '</div>');
			      	infoWindow.open(map, marker);
			      	var lugar = Places.findOne({id: result.id});
			      	idGlobal = result.id;
			      	$( "#rating" ).empty();
			      	$( "#rating" ).append( '<b>Rating: </b>' );
			      	if (lugar.rating>0) {
				  	    for (var i = 0; i < lugar.rating; i++) {
				  	    	console.log('dorada');
				  	    	$( "#rating" ).append( '<img data-value="' + i + '" class="theImg" src="images/Star_max-b.png" />' );
				  	    };
			      	}
			      	for (var i = lugar.rating; i < 5; i++) {
			      		$( "#rating" ).append( '<img data-value="' + i + '"class="theImg" src="images/Star.png" />' );
			      		console.log($(this).data('value'));
			      	};
			      	$( "#comments" ).empty();
			      	console.log(idGlobal);
			      	console.log(lugar.comments.length);
			      	console.log(lugar);
			      	$( "#comments" ).append( '<p class="center-align">Comentarios</p>' );
			      	for (var i = 0; i < lugar.comments.length; i++) {
			      		$( "#comments" ).append( '<div class="com"> <p class="center-align">'+ lugar.comments[i].commentUser +'</p>' +
			      			'<hr> <p class="right-align byUser"> Por: ' + lugar.comments[i].user + ' </div>' );
			      	}; 
			      	$('#placeName').text(result.name);
			      	var photo = place.photos;
			      	if (photo) {
				  	  alert(photo.length);
				  	}
			      	$('#modal1').openModal();
			    });
			});
		}	
	}
});

Template.departmentMap.events({
  "click #post": function(){
  	var lugar = Places.findOne({id: idGlobal});
  	console.log(lugar);
  	var comentarios = lugar.comments;
  	var comentario = {
  		commentUser: $('#textarea1').val(),
  		//user: Meteor.user()
  		user: 'dario'
  	}
  	console.log(lugar.comments);
  	console.log(comentarios);
  	console.log(comentario);
  	comentarios.push( comentario );
  	console.log(comentarios);
  	lugar.comments.push(comentario);
  	console.log(lugar.comments);
  	/*Places.update(idGlobal, {
      $push: { comments: comentario },
    });*/
	Meteor.call('place.updateComment', idGlobal, comentario, function(err){
		if(err){
			console.log(err);
			Materialize.toast("Error inesperado", 4000);
		}else {
			Materialize.toast("Libro agregado", 4000);
			$('#textarea1').val('');
		}
	});
    Materialize.toast("Comentario Agregado");
  },
  "click .theImg": function(e){
  	var puntuacion = $(e.currentTarget).data('value') + 1;
  	//console.log(idGlobal);
  	//console.log($(e.currentTarget).attr('data-value'));
  	console.log($(e.currentTarget).data('value'));
  	//console.log(puntuacion);
  	//console.log( $('#rating').index(this) );
  	Meteor.call('place.updateRating', idGlobal, puntuacion, function(err){
		if(err){
			console.log(err);
			Materialize.toast("Error inesperado", 4000);
		}else {
			Materialize.toast("Libro agregado", 4000);
			Materialize.toast("Gracias por Calificar!");
			$('#modal1').closeModal();
		}
	});
  }
});