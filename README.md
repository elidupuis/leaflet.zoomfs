# Leaflet.Control.ZoomFS

This is a simple extension of [Leaflet.Control.Zoom](http://leaflet.cloudmade.com/reference.html#control-zoom) that adds a fullscreen button above the zoom in and zoom out controls. 

You can make a Leaflet map fullscreen programatically by changing the CSS of the map container. This extension simply integrates that functionality into the Leaflet interface.

## Usage

Be sure to include the *leaflet.zoomfs.js* script somewhere after Leaflet is loaded.

    <script src="http://cdn.leafletjs.com/leaflet-0.5.1/leaflet.js"></script>
    <script src="leaflet.zoomfs.js"></script>

Do all your normal Leaflet [initialization stuff](http://leaflet.cloudmade.com/examples/quick-start.html), except make sure that you initialize the map *without* the default zoom controls:

    <!-- map container -->
    <div id="map"></div>

    // init map
    var map = new L.Map('map', { zoomControl:false });

Then, instantiate the ZoomFS control and add it to the map:

    var zoomFS = new L.Control.ZoomFS(); 
    map.addControl(zoomFS);


## Events

There are 2 events you can bind to: `enterFullscreen` and `exitFullscreen`. Note that these events are triggered on the Map object; not ZoomFS.

    map.on('enterFullscreen', function(){
      if(window.console) window.console.log('enterFullscreen');
    });

    map.on('exitFullscreen', function(){
      if(window.console) window.console.log('exitFullscreen');
    });


## Style

This extension applies the following inline styles to make the map fullscreen. We also apply a class of `leaflet-fullscreen` to the map container.

    <div id="map" class="leaflet-container leaflet-fullscreen" style="position: fixed; left: 0px; top: 0px; width: 100%; height: 100%;">

No style is applied to the fullscreen button itself. Basic style is handled internally by *Leaflet.Control.Zoom*, but you'll need to add your own button style:

    .leaflet-control-fullscreen {
      background-image: url(your/amazing/icon.png);
    }

### Caveat

All inline style on your map container will be removed when `exitFullscreen` is triggered. `position:relative` is re-applied automatically if you do not have a position declared in your base styles (as this is required by Leaflet). A height is required by Leaflet core, and it should be declared in your base CSS (not inline) like so:

    #map {
      position: relative;
      height: 400px;
    }

# Notes

- This extension was built and tested for Leaflet version 0.5.1. If you need this to work with Leaflet 0.4.4 or Leaflet 0.3.1 there are old versions in [tags](https://github.com/elidupuis/leaflet.zoomfs/tags)
- If you want the fullscreen button below the zoom in and zoom out buttons simply switch the order in which the controls are added in *leaflet.zoomfs.js*.
- Ideally some of this code should reside in Leaflet.Map... I've done some initial work on that here: https://github.com/elidupuis/Leaflet.