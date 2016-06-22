import "./homeMap.html";

/*if (Meteor.isClient) {
  var MAP_ZOOM = 15;

  Meteor.startup(function() {
    GoogleMaps.load();
  });

  Template.homeMap.onCreated(function() {
    var self = this;

    GoogleMaps.ready('map', function(map) {
      var marker;

      // Create and move the marker when latLng changes.
      self.autorun(function() {
        var latLng = Geolocation.latLng();
        if (! latLng)
          return;

        // If the marker doesn't yet exist, create it.
        if (! marker) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.lat, latLng.lng),
            map: map.instance
          });
        }
        // The marker already exists, so we'll just change its position.
        else {
          marker.setPosition(latLng);
        }

        // Center and zoom the map view onto the current position.
        map.instance.setCenter(marker.getPosition());
        map.instance.setZoom(MAP_ZOOM);
      });
    });
  });

  Template.homeMap.helpers({
    geolocationError: function() {
      var error = Geolocation.error();
      return error && error.message;
    },
    mapOptions: function() {
      var latLng = Geolocation.latLng();
      // Initialize the map once we have the latLng.
      if (GoogleMaps.loaded() && latLng) {
        return {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: MAP_ZOOM
        };
      }
    }
  });
}*/

Template.homeMap.onCreated(function() {

  $.getScript("https://www.google.com/jsapi", function(){
    function drawChart () {
        //var data = new google.visualization.DataTable();
        //data.addColumn('string', 'State');

        var data = google.visualization.arrayToDataTable([
            ['State', 'Site'],
            ['HN-AT', 1],
            ['HN-CL', 2],
            ['HN-CM', 3],
            ['HN-CP', 4],
            ['HN-CR', 5],
            ['HN-CH', 6],
            ['HN-EP', 7],
            ['HN-FM', 8],
            ['HN-GD', 9],
            ['HN-IN', 10],
            ['HN-IB', 11],
            ['HN-LP', 12],
            ['HN-LE', 13],
            ['HN-OC', 14],
            ['HN-OL', 15],
            ['HN-SB', 16],
            ['HN-VA', 17],
            ['HN-YO', 18]
          ]);

        var wid = $( window ).width();
        var hei = $( window ).height();
        
        var geochart = new google.visualization.GeoChart(document.getElementById('googleMap'));
        var options = {
            region:"HN",
            legend:"none",
            width: wid,
            height: hei,
            resolution: 'provinces',
            backgroundColor: '#64b5f6',
            datalessRegionColor: '#8d6e63'
            //colors: '#4bb5f3', '#FADC41', '#c44949', '#d74a12', '#0e9a0e', '#55c2ac', '#7c4b91', '#fadc41', '#0d6cca', '#7c4897'
        };

        options['colors'] = ['#FADC41', '#c44949', '#d74a12', '#0e9a0e', '#55c2ac', '#7c4b91', '#fadc41', '#0d6cca', '#7c4897', '#438094'];
        
        function myClickHandler(){
          var departamentos = geochart.getSelection();
          for (var i = 0; i < departamentos.length; i++) {
            alert(departamentos[i].row + ' i = '+ i);
          };
          alert(this);
          Router.go('/departamento');
        }

        geochart.draw(data, options);
        google.visualization.events.addListener(geochart, 'select', myClickHandler);
    }
    google.load('visualization', '1', {packages:['geochart'], callback: drawChart});
  });
});
