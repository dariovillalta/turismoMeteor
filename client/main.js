import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Places } from '../imports/api/place.js';

import "../imports/routes/router.js";
import './main.html';

var placesArray = Places.find();
var idGlobal;
var markerCrados = [];

Template.departmentMap.onRendered(function() {

	var myLatlng;
	var urlLayer;
	var strictBounds;

	var directionsService;
  	var directionsDisplay;

    var map;
    placesArray = Places.find().fetch();
    initMap();
    var name;
    function initMap() {

    	if(Router.current().params._id == 1){
    		myLatlng = new google.maps.LatLng(15.6433333333, -87.13166666669997);
    		urlLayer = 'http://www.worldmapfinder.com/KMZ/HND_Atlantida_Department.kmz';
    		strictBounds = new google.maps.LatLngBounds(
		    	new google.maps.LatLng(15.4584185, -87.7549816), 
		        new google.maps.LatLng(15.8232709, -86.3159906)
		    );
    	} else if(Router.current().params._id == 2){
    		myLatlng = new google.maps.LatLng(15.6391768, -85.35496499999999);
    		urlLayer = 'http://www.worldmapfinder.com/KMZ/HND_Colon_Department.kmz';
    		strictBounds = new google.maps.LatLngBounds(
		    	new google.maps.LatLng(15.1578781, -86.3438572), 
		        new google.maps.LatLng(16.0503983, -84.9970502)
		    );
    	}else if(Router.current().params._id == 3){
    		myLatlng = new google.maps.LatLng(14.45, -87.63333333330001);
    		urlLayer = 'http://www.worldmapfinder.com/KMZ/HND_Comayagua_Department.kmz';
    		strictBounds = new google.maps.LatLngBounds(
		    	new google.maps.LatLng(14.0940614, -88.0158199), 
		        new google.maps.LatLng(15.01577, -87.2549563)
		    );
    	}else if(Router.current().params._id == 4){
    		myLatlng = new google.maps.LatLng(14.7666666667, -88.78333333329999);
    		urlLayer = 'http://www.worldmapfinder.com/KMZ/HND_Copan_Department.kmz'
    		strictBounds = new google.maps.LatLngBounds(
		    	new google.maps.LatLng(14.5392764, -89.1787375), 
		        new google.maps.LatLng(15.2848249, -88.6617219)
		    );
    	}else if(Router.current().params._id == 5){
    		myLatlng = new google.maps.LatLng(15.5027777778, -88.01361111109997);
    		urlLayer = 'http://www.worldmapfinder.com/KMZ/HND_Cortes_Department.kmz';
    		strictBounds = new google.maps.LatLngBounds(
		    	new google.maps.LatLng(14.7879552, -88.2777261), 
		        new google.maps.LatLng(15.8833854, -87.7292345)
		    );
    	}else if(Router.current().params._id == 6){
    		myLatlng = new google.maps.LatLng(13.3166666667, -87.21666666670001);
    		urlLayer = 'http://www.worldmapfinder.com/KMZ/HND_Choluteca_Department.kmz';
    		strictBounds = new google.maps.LatLngBounds(
		    	new google.maps.LatLng(12.9996057, -87.4862028), 
		        new google.maps.LatLng(13.7399326, -86.7322538)
		    );
    	}else if(Router.current().params._id == 7){
    		myLatlng = new google.maps.LatLng(13.9333333333, -86.85000000000002);
    		urlLayer = 'http://www.worldmapfinder.com/KMZ/HND_El_Paraiso_Department.kmz';
    		strictBounds = new google.maps.LatLngBounds(
		    	new google.maps.LatLng(13.5017503, -87.2209554), 
		        new google.maps.LatLng(14.3605902, -85.3750489)
		    );
    	}else if(Router.current().params._id == 8){
    		myLatlng = new google.maps.LatLng(14.1, -87.21666666670001);
    		urlLayer = 'http://www.worldmapfinder.com/KMZ/HND_Francisco_Morazan_Department.kmz';
    		strictBounds = new google.maps.LatLngBounds(
		    	new google.maps.LatLng(13.7306433, -87.6238812), 
		        new google.maps.LatLng(14.9848379, -86.6860951)
		    );
    	}else if(Router.current().params._id == 9){
    		myLatlng = new google.maps.LatLng(15.2745619, -84.2523514);
    		urlLayer = 'no';
    		strictBounds = new google.maps.LatLngBounds(
		    	new google.maps.LatLng(14.63096, -84.9656236), 
		        new google.maps.LatLng(15.9568733, -83.098848)
		    );
    	}else if(Router.current().params._id == 10){
    		myLatlng = new google.maps.LatLng(14.3166666667, -88.14999999999998);
    		urlLayer = 'http://www.worldmapfinder.com/KMZ/HND_Intibuca_Department.kmz';
    		strictBounds = new google.maps.LatLngBounds(
		    	new google.maps.LatLng(13.8597305, -88.545923), 
		        new google.maps.LatLng(14.6387931, -87.8178564)
		    );
    	}else if(Router.current().params._id == 11){
    		myLatlng = new google.maps.LatLng(16.3306688, -86.553548);
    		urlLayer = 'no';
    		strictBounds = new google.maps.LatLngBounds(
		    	new google.maps.LatLng(15.9236809, -87.0034643), 
		        new google.maps.LatLng(16.5345395, -85.6712314)
		    );
    	}else if(Router.current().params._id == 12){
    		myLatlng = new google.maps.LatLng(13.9984833, -87.93348029999998);
    		urlLayer = 'http://www.worldmapfinder.com/KMZ/HND_La_Paz_Department.kmz';
    		strictBounds = new google.maps.LatLngBounds(
		    	new google.maps.LatLng(13.3128495, -87.80848), 
		        new google.maps.LatLng(13.8369936, -87.3478354)
		    );
    	}else if(Router.current().params._id == 13){
    		myLatlng = new google.maps.LatLng(14.5833333333, -88.5833333333);
    		urlLayer = 'http://www.worldmapfinder.com/KMZ/HND_Lempira_Department.kmz';
    		strictBounds = new google.maps.LatLngBounds(
		    	new google.maps.LatLng(14.01175, -88.9985579), 
		        new google.maps.LatLng(14.9473853, -88.2846388)
		    );
    	}else if(Router.current().params._id == 14){
    		myLatlng = new google.maps.LatLng(14.4333333333, -89.18333333329997);
    		urlLayer = 'http://www.worldmapfinder.com/KMZ/HND_Ocotepeque_Department.kmz';
    		strictBounds = new google.maps.LatLngBounds(
		    	new google.maps.LatLng(14.2859093, -89.3379223), 
		        new google.maps.LatLng(14.7693639, -88.7226329)
		    );
    	}else if(Router.current().params._id == 15){
    		myLatlng = new google.maps.LatLng(14.6, -86.19999999999999);
    		urlLayer = 'http://www.worldmapfinder.com/KMZ/HND_Olancho_Department.kmz';
    		strictBounds = new google.maps.LatLngBounds(
		    	new google.maps.LatLng(14.0946899, -86.8758937), 
		        new google.maps.LatLng(15.552717, -84.9805973)
		    );
    	}else if(Router.current().params._id == 16){
    		myLatlng = new google.maps.LatLng(14.9166666667, -88.23333333329998);
    		urlLayer = 'http://www.worldmapfinder.com/KMZ/HND_Santa_Barbara_Department.kmz';
    		strictBounds = new google.maps.LatLngBounds(
		    	new google.maps.LatLng(14.5782581, -88.621161), 
		        new google.maps.LatLng(15.5394359, -88.073361)
		    );
    	}else if(Router.current().params._id == 17){
    		myLatlng = new google.maps.LatLng(13.5333333333, -87.48333333329998);
    		urlLayer = 'http://www.worldmapfinder.com/KMZ/HND_Valle_Department.kmz';
    		strictBounds = new google.maps.LatLngBounds(
		    	new google.maps.LatLng(13.2544648, -87.8078962), 
		        new google.maps.LatLng(13.8346881, -87.3530326)
		    );
    	}else if(Router.current().params._id == 18){
    		myLatlng = new google.maps.LatLng(15.1333333333, -87.10000000000002);
    		urlLayer = 'http://www.worldmapfinder.com/KMZ/HND_Yoro_Department.kmz';
    		strictBounds = new google.maps.LatLngBounds(
		    	new google.maps.LatLng(14.7833457, -87.8992483), 
		        new google.maps.LatLng(15.7401613, -86.1941373)
		    );
    	}

    	var zoomLevel = 8;
    	var myOptions = {
	        mapType: 'styledMap',
	        center: myLatlng,
	        zoom: zoomLevel,
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

      	google.maps.event.addListener(map, 'zoom_changed', function(){
      		if(map.getZoom() < zoomLevel) map.setZoom(zoomLevel);
      	});

	    google.maps.event.addListener(map, 'dragend', function() {
	        if (strictBounds.contains(map.getCenter())) {
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
	        if (x < minX) {
	          x = minX;          
	        }
	        if (x > maxX) {
	          x = maxX;
	        }
	        if (y < minY) {
	          y = minY;
	        }
	        if (y > maxY) {
	          y = maxY;
	        }

	        map.setCenter(new google.maps.LatLng(y, x));
	    });
		
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map
		});
		if(urlLayer != 'no'){
			var ctaLayer = new google.maps.KmlLayer(urlLayer);
			ctaLayer.setMap(map);
		}

		var infoWindow = new google.maps.InfoWindow();
  	  	var service = new google.maps.places.PlacesService(map);
  	  	directionsService = new google.maps.DirectionsService;
  	  	directionsDisplay = new google.maps.DirectionsRenderer;
  	  	directionsDisplay.setMap(map);


  	  	var urlLugar, iteradorLugar = 0, cargo = 0;
  	  	var arregloLugares =  ["restaurant", "gas station", "zoo", "taxi stand", "bus station", "clothing store", "department store", "cafe", "atm", "bank", "bar", "casino", "liquor store", "movie theater", "amusement park", "aquarium", "art gallery", "museum", "airport","stadium"];

  	  	map.addListener('idle', performSearch);

      	function performSearch() {
      		if(cargo ==  0){
      			cargo = 1;
	      		iteradorLugar = 0
	      		for (var i = 0; i < 4; i++) {
		  	  		urlLugar = arregloLugares[i];
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
				//return;
			}

		  //if(placesArray.count() == 0){
			for (var i = 0, result; result = results[i]; i++) {
			    addMarker(result);
			    markerCrados.push(result);
			    var lugar = Places.findOne({id: result.id});
			    
			    service.getDetails(result, function(pla, status) {
					if (status !== google.maps.places.PlacesServiceStatus.OK) {
						console.error(status);
						return;
					}
					name = pla.name;
				});
			    if(!lugar){
			    	var comment = [];
				    var locationVar = {
				    	latitud: result.geometry.location.lat(),
				    	longitud: result.geometry.location.lng()
				    }
				    if(!name)
				    	name = result.id;
				    var placeCreated = {
						id: result.id,
						name: name,
						comments: comment,
						rating: 0,
						location: locationVar
					}
					Meteor.call('place.create', placeCreated, function(err){
						if(err){
							console.log(err);
							Materialize.toast("Error inesperado", 4000);
						}else {
							//Materialize.toast("Libro agregado", 4000);
						}
					});
					alert('puta1');
			    }
			    alert('puta2');
			}
			/*var difference = [];
			for (var i = 0; i < placesArray.length; i--) {
				console.log(placesArray[i].name);
			};
			jQuery.grep(placesArray, function(el){
				if(jQuery.inArray(el, markerCrados) ==  -1){ 
					difference.push(el);
					alert('entro');
				}
			});
			for (var i = 0; i < difference.length; i++) {
				console.log('dds');
				addMarker(difference[i]);
			};*/
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
						'<br>' + result.formatted_address + '</div>');
					infoWindow.open(map, marker);
					var lugar = Places.findOne({id: result.id});
					idGlobal = result.id;
					name = result.name;
					$( "#rating" ).empty();
					$( "#rating" ).append( '<b>Rating: </b>' );
					if (lugar.rating>0) {
						for (var i = 0; i < lugar.rating; i++) {
							$( "#rating" ).append( '<img data-value="' + i + '" class="theImg" src="/images/Star_max-b.png" />' );
						};
					}
					for (var i = lugar.rating; i < 5; i++) {
						$( "#rating" ).append( '<img data-value="' + i + '"class="theImg" src="/images/Star.png" />' );
					};
					$( "#comments" ).empty();
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
					$('#').data('data-value', result.name)
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
  		user: Meteor.user().username
  	}
  	comentarios.push( comentario );
  	lugar.comments.push(comentario);
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
  }, //
  "click .theImg": function(e){
  	var puntuacion = $(e.currentTarget).data('value') + 1;
  	console.log($(e.currentTarget).data('value'));
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
  }, 
  "click #directions": function(e){
  	alert(e);
  	console.log('llegue');
  	console.log( $(e.currentTarget).data('data-value') );
  	console.log(e);
  	/*directionsService.route({
  		origin: ,
  		destination: ,
  		travelMode: google.maps.travelMode.DRIVING
  	}, function(response, status){
  		if (status === google.maps.DirectionsStatus.OK) {
  			directionsDisplay.setDirections(response);
  		} else{
  			console.log('fallo direcciones');
  		}
  	});*/
  }
});