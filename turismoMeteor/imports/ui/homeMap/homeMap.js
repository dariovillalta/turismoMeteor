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
            ['State'],
            ['HN-AT'],
            ['HN-CL'],
            ['HN-CM'],
            ['HN-CP'],
            ['HN-CR'],
            ['HN-CH'],
            ['HN-EP'],
            ['HN-FM'],
            ['HN-GD'],
            ['HN-IN'],
            ['HN-IB'],
            ['HN-LP'],
            ['HN-LE'],
            ['HN-OC'],
            ['HN-OL'],
            ['HN-SB'],
            ['HN-VA'],
            ['HN-YO']
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
            datalessRegionColor: '#8d6e63'//,
            //defaultColor: ,
        };
        
        geochart.draw(data, options);
    }
    google.load('visualization', '1', {packages:['geochart'], callback: drawChart});
  });
});
