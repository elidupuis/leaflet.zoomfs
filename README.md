# Leaflet.Control.ZoomFS

This is a simple extension of [Leaflet.Control.Zoom](http://leaflet.cloudmade.com/reference.html#control-zoom) that adds a fullscreen button above the zoom in and zoom out controls. 

You can make a Leaflet map fullscreen programatically by changing the CSS of the map container. This extension simply integrates that functionality into the Leaflet interface.

## Usage

Be sure to include the *leaflet.zoomfs.js* script somewhere after Leaflet is loaded.

    <script src="http://code.leafletjs.com/leaflet-0.3.1/leaflet.js"></script>
    <script src="leaflet.zoomfs.js"></script>

Do all your normal Leaflet [initialization stuff](http://leaflet.cloudmade.com/examples/quick-start.html), except make sure that you initialize the map *without* the default zoom controls:

    <!-- map container -->
    <div id="map"></div>

    // init map
    var map = new L.Map('map', { zoomControl:false });

Then, instantiate the ZoomFS control and add it to the map:

    var zoomFS = new L.Control.ZoomFS(); 
    map.addControl(zoomFS);
    
Now we just need to add a little bit of style!

## Style

This extension does not actually make the map fullscreen...it simply applies a class of `leaflet-fullscreen` to the map container. It's up to you to apply the fullscreen state yourself. Luckily, it's very easy:

    #map.leaflet-fullscreen {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }

You'll probably want to style the fullscreen button a little bit too. Basic style is handled internally by *Leaflet.Control.Zoom* so you don't need to do much:

    .leaflet-control-fullscreen {
      background-image: url(your/amazing/icon.png);
      margin-bottom: 5px;
    }

## Events

There are 2 events you can bind to: **enterFullscreen** and **exitFullscreen**. Note that these events are triggered on the Map object; not ZoomFS.

    map.on('enterFullscreen', function(){
      if(window.console) window.console.log('enterFullscreen');
    });

    map.on('exitFullscreen', function(){
      if(window.console) window.console.log('exitFullscreen');
    });

# Notes

- If you want the fullscreen button below the zoom in and zoom out buttons check the source in *leaflet.zoomfs.js*. Just switch the order the controls are added.
- This extension was built and tested for Leaflet version 0.3.1. Hopefully it will be updated soon after 0.4 is stable.
- Ideally some of this code should reside in Leaflet.Map...and maybe some day it will. 