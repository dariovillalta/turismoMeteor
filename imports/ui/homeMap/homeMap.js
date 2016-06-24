import "./homeMap.html";

Template.homeMap.onCreated(function() {

  $.getScript("https://www.google.com/jsapi", function(){
    function drawChart () {
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
      var hei = $( window ).height() - $( "nav" ).height();
        
      var geochart = new google.visualization.GeoChart(document.getElementById('googleMap'));
      var options = {
        region:"HN",
        legend:"none",
        width: wid,
        height: hei,
        resolution: 'provinces',
        backgroundColor: '#64b5f6',
        datalessRegionColor: '#8d6e63'
      };

      options['colors'] = ['#FADC41', '#c44949', '#d74a12', '#0e9a0e', '#55c2ac', '#7c4b91', '#fadc41', '#0d6cca', '#7c4897', '#438094'];

      function myClickHandler(){
        var departamentos = geochart.getSelection();
        Router.go('depart', {_id: departamentos[0].row+1} );
      }

      geochart.draw(data, options);
      google.visualization.events.addListener(geochart, 'select', myClickHandler);
    }
    google.load('visualization', '1', {packages:['geochart'], callback: drawChart});
  });
});
