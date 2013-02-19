$(document).ready(function() {
  // Handler for .ready() called.
  initializeMap();
  google.maps.event.addDomListener(window, 'load', initializeMap);
  
  
  $('#map_control').on("click", function(){
    $('#map_canvas').toggle();
    google.maps.event.trigger(map, 'resize');
  });
});
