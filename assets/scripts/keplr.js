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
*/  

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

function initialize() {
  console.log (chart.name);
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