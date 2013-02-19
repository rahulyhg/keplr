function MyClass(){
  var value;
  this.getValue = function() {
    return value;
  }

  this.setValue = function(val) {
    value = val;
  }
}

/*  
***************************************************************
http://helephant.com/2008/08/23/javascript-anonymous-functions/
***************************************************************  

$helephant.components = {
    init : function(object, serverProperties)
    {
        for(var property in serverProperties)
        {
            // set the textbox's property
            $helephant.components.createGetter(textbox, property);
            $helephant.components.createSetter(textbox, property, serverProperties[property]);
        }
    },
 
    createGetter : function(object, property)
    {
        var propertyName = "get_" + property;
        if(typeof(object.constructor.prototype[propertyName]) == "undefined")
        {
            object.constructor.prototype[propertyName] = function()
            {
                return this[property];
            };
        }
    },
 
    createSetter : function(object, property, initialValue)
    {
        var propertyName = "set_" + property;
        if(typeof(object.constructor.prototype[propertyName]) == "undefined")
        {
            object.constructor.prototype[propertyName] = function(value)
            {
                this[property] = value;
            };
        }
        if(typeof(initialValue) != "undefined")
            object[propertyName](initialValue);
    }
}

(function() {
    var myProperty = "hello world";
    alert(myProperty);
})();
alert(typeof(myProperty)); // undefined
<<<<<<< HEAD
*/ 

/*
  http://ejohn.org/blog/ecmascript-5-objects-and-properties/#postcomment
*/

var chart = {};

(function(){
  var name = "John";
 
  Object.defineProperty( chart, "name", {
    get: function(){ return name; },
    set: function(value){ name = value; }
  });
})();

function ConvertDDToDMS(D, lng){
  return {
    dir : D<0?lng?'W':'S':lng?'E':'N',
    deg : 0|(D<0?D=-D:D),
    min : 0|D%1*60,
    sec :(0|D*60%1*6000)/100
  };
}

function initializeMap() {
  var mapOptions = {
    center: new google.maps.LatLng(84, 142),
    zoom: 1,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  var autocompleteOptions = {
    types: ['(regions)']
  };

  var input = document.getElementById('searchTextField');
  var autocomplete = new google.maps.places.Autocomplete(input, autocompleteOptions);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    draggable: true
  });
  
  function redrawMapMarker(place) {
    infowindow.close();
    marker.setVisible(false);
    input.className = '';
    if (!place.geometry) {
      // Inform the user that the place was not found and return.
      input.className = 'notfound';
      return;
    }
    map.setCenter(place.geometry.location);
    if (!map.getZoom() || map.getZoom() == 1) {
      map.setZoom(12);
    }
    
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
  }
  
  function manualAutocompleteChange(event) {
    var place_string = "";
    //get address info such as city and state from lat and long
    var request = new google.maps.Geocoder();
    request.geocode({'latLng': event.latLng}, function(results, status) {
      var place = results[0];
      if (status == google.maps.GeocoderStatus.OK) 
      {
        console.log("Inside if with results: " + place.address_components);
        //break down the three dimensional array into simpler arrays
        var address_components = place.address_components;
        for (var i in address_components)
        {
          var address_component = place.address_components[i];
          var types = address_component.types;
          for (var j in types)
          {
            switch(types[j])
            {
              case "locality":
                console.log('City: ' + address_component.long_name);
                place_string += address_component.long_name + ", ";
                break;
              case "administrative_area_level_2":
                console.log('County: ' + address_component.long_name);
                place_string += address_component.long_name + ", ";
                break;
              case "administrative_area_level_1":
                console.log('State: ' + address_component.short_name);
                place_string += address_component.long_name + ", ";
                break;
              case "country":
                console.log('Country: ' + address_component.short_name);
                place_string += address_component.long_name;
                break;
              default:                   
            }                
          }
        }
        redrawMapMarker(place);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
      
      // google.maps.event.trigger( input, 'focus', {} );
    });
  }
  // Click
  google.maps.event.addListener(map, 'click', function(event) {
    manualAutocompleteChange(event);
  });
  // mousemove
  google.maps.event.addListener(map, 'mousemove', function(event) {
    $("#lat_lng").html(event.latLng.toString());
  });      
  // Dragging
  google.maps.event.addListener(marker, 'drag', function(event){
    infowindow.close();
  });
  // Dragged
  google.maps.event.addListener(marker, 'dragend', function(event){
    manualAutocompleteChange(event);
  });
  // Zooming
  google.maps.event.addListener(map,'zoom_changed', function () { 
    infowindow.close(); 
  });
  // Autocomplete
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace();
    redrawMapMarker(place);
  });
}
/*
google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.trigger(document.getElementById('map_canvas'), 'resize');*/
