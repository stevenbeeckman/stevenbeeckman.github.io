google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {
    var myLatlng = new google.maps.LatLng(51.1977869,5.6730239);
    var mapOptions = {
        zoom: 5,
        center: myLatlng,
        scrollwheel: false,
        draggable: false,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    }
    window.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var competition = {
      buses : [
      { country: "Belgium",
        origin: [50.8473592,4.3567822],
        marker: "assets/images/markers/belgium.png"
      },
      { country: "France",
        origin: [48.911481,2.3110762],
        marker: "assets/images/markers/france.png"
      },
      { country: "Switzerland",
        origin: [47.3943422,8.5205415],
        marker: "assets/images/markers/swiss.png"
      },
      { country: "United Kingdom",
        origin: [51.6448521,-0.2982731],
        marker: "assets/images/markers/uk_start.png"
      }
      ]
    };

    var buses = [];
    
    function fetch_bus_line_color(bus) {
      var line;
      switch(bus) { 
        case "Belgium":
          line = "#FC0371";
          break;
        case "France":
          line = "#fc0f3f";
          break;
        case "Switzerland":
          line = "#fee834";
          break;
        case "UK":
          line = "#ee9532";
          break;
        default:
          line: "FFFFFF";
          break;
      }
      return line;
    }


    $(document).ready(function(){ 
        addBusMarkers();
        $.ajax({
          url: "http://subtracker.herokuapp.com/allPointsLowPrecision/2016",
            success: function(data){


              _.each(data.routes, function(route){
                if(route.points.length > 0 && (route.name == "Belgium" || route.name == "France" || route.name == "Switzerland" || route.name == "UK")){
                  console.dir(route);
                  var lat_lng = [];
                  if(route.name == "Belgium"){
                    lat_lng.push(new google.maps.LatLng(50.8473592,4.3567822));
                  }
                  if(route.name == "France"){
                    lat_lng.push(new google.maps.LatLng(48.911481,2.3110762));
                    lat_lng.push(new google.maps.LatLng(48.7367032,2.1341622));
                    lat_lng.push(new google.maps.LatLng(48.4428255,2.520273));
                    lat_lng.push(new google.maps.LatLng(47.0429436,4.854873));
                    lat_lng.push(new google.maps.LatLng(45.7780087,4.771923));
                    lat_lng.push(new google.maps.LatLng(45.5822742,5.8712481));
                  }
                  if(route.name == "Switzerland"){
                    lat_lng.push(new google.maps.LatLng(47.3943422,8.5205415));
                  }
                  if(route.name == "UK"){
                    lat_lng.push(new google.maps.LatLng(51.6448521,-0.2982731));
                  }
                  
                  var lines = _.map(route.points, function(point){
                      //this is sending commas or zeros
                       lat_lng.push(new google.maps.LatLng(parseFloat(point.lat), parseFloat(point.lon)));
                  });

                  var flightPath = new google.maps.Polyline({
                      path: lat_lng,
                      geodesic: true,
                      strokeColor: "#" + route.colorHex,
                      strokeOpacity: 1.0,
                      strokeWeight: 5
                  });
                  flightPath.setMap(window.map);

                  var icon = {
                    url: getBusMarker(route.name),
                    anchor: new google.maps.Point(20, 25),
                    origin: new google.maps.Point(0, 0),
                    size: new google.maps.Size(40, 25)
                  };

                  var new_bus = new google.maps.Marker({
                    position: new google.maps.LatLng(route.points[route.points.length-1].lat,route.points[route.points.length-1].lon), 
                    map: map, 
                    icon: icon
                  });
                }
              });
            }, //success
          error:function(exception){
            console.log(+exception);
          }
        });

        google.maps.event.addListenerOnce(window.map, 'idle', function(){
          //updateMapBounds();
        });

    }); //document.ready

    function updateMapBounds() {
        var current_bounds = window.map.getBounds();

        var bounds = new google.maps.LatLngBounds();
        window.map.fitBounds(bounds);
    }

    function addBusMarkers() {
      buses = _.map(competition.buses, function(bus) {
        var icon = {
          url: bus.marker,
          anchor: new google.maps.Point(10, 10),
          origin: new google.maps.Point(0, 0),
          size: new google.maps.Size(20, 20)
        };

        var new_bus = new google.maps.Marker({
          position: new google.maps.LatLng(bus.origin[0],bus.origin[1]), 
          map: map, 
          icon: icon
        });
      });
    }

    function getBusMarker(bus){
      var marker;
      switch(bus) { 
        case "Belgium":
          marker = "assets/images/markers/BE.png";
          break;
        case "France":
          marker = "assets/images/markers/FR.png";
          break;
        case "Switzerland":
          marker = "assets/images/markers/CH.png";
          break;
        case "UK":
          marker = "assets/images/markers/UK.png";
          break;
        default:
          marker = "assets/images/markers/BE.png";
          break;
      }
      return marker;
    }
}
