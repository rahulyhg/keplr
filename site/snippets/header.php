<!DOCTYPE html>
<html lang="en">
<head>
  
  <title><?php echo html($site->title()) ?> - <?php echo html($page->title()) ?></title>
  <meta charset="utf-8" />
  <meta name="description" content="<?php echo html($site->description()) ?>" />
  <meta name="keywords" content="<?php echo html($site->keywords()) ?>" />
  <meta name="robots" content="index, follow" />

  <?php echo css('assets/styles/styles.css') ?>
  
  <style>
        body {
          font-family: sans-serif;
          font-size: 14px;
        }
        #map_canvas {
          height: 400px;
          width: 600px;
          margin-top: 0.6em;
        }
        input {
          border: 1px solid  rgba(0, 0, 0, 0.5);
        }
        input.notfound {
          border: 2px solid  rgba(255, 0, 0, 0.4);
        }
  </style>
  
  <script type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeEfSiOnA5tVJgUrf_IUSpB1LGmADooew&sensor=false&libraries=places">
      </script>
  
  <script>
        function ConvertDDToDMS(D, lng){
            return {
                dir : D<0?lng?'W':'S':lng?'E':'N',
                deg : 0|(D<0?D=-D:D),
                min : 0|D%1*60,
                sec :(0|D*60%1*6000)/100
            };
        }
        
        function initialize() {
          var mapOptions = {
            center: new google.maps.LatLng(-33.8688, 151.2195),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          var map = new google.maps.Map(document.getElementById('map_canvas'),
            mapOptions);

            var autocompleteOptions = {
              types: ['(regions)']
             };

             var input = document.getElementById('searchTextField');
             var autocomplete = new google.maps.places.Autocomplete(input, autocompleteOptions);

          var infowindow = new google.maps.InfoWindow();
          var marker = new google.maps.Marker({
            map: map
          });
          
          google.maps.event.addListener(autocomplete, 'place_changed', function() {
            infowindow.close();
            marker.setVisible(false);
            input.className = '';
            var place = autocomplete.getPlace();
            if (!place.geometry) {
              // Inform the user that the place was not found and return.
              input.className = 'notfound';
              return;
            }
            console.log(place.geometry.location);
            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
              map.fitBounds(place.geometry.viewport);
            } else {
              map.setCenter(place.geometry.location);
              map.setZoom(17);  // Why 17? Because it looks good.
            }
            var image = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(35, 35)
            };
            marker.setIcon(image);
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);

            var address = '';
            if (place.address_components) {
              address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
              ].join(' ');
            }
            var lat = ConvertDDToDMS(place.geometry.location.lat(), false);
            var lng = ConvertDDToDMS(place.geometry.location.lng(), true);
            
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address + '<br>LATITUDE:<br>' + lat.deg + lat.dir + '<br>LNG: ' + lng.deg + lng.dir);
            infowindow.open(map, marker);
          });
        }
        google.maps.event.addDomListener(window, 'load', initialize);
  </script>
  
</head>

<body>

  <header>
    <h1><a href="<?php echo url() ?>"><img src="<?php echo url('assets/images/logo.png') ?>" width="115" height="41" alt="<?php echo html($site->title()) ?>" /></a></h1>
  </header>