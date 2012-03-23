/*
 * L.Control.ZoomFS - default Leaflet.Zoom control with an added fullscreen button
 * built to work with Leaflet version 0.3
 * https://github.com/elidupuis/leaflet.zoomfs
 */
L.Control.ZoomFS = L.Control.Zoom.extend({
  includes: L.Mixin.Events,
  onAdd: function (map) {
		this._map = map;
		this._container = L.DomUtil.create('div', 'leaflet-control-zoom');

		this._zoomInButton = this._createButton(
				'Zoom in', 'leaflet-control-zoom-in', this._map.zoomIn, this._map);
		this._zoomOutButton = this._createButton(
				'Zoom out', 'leaflet-control-zoom-out', this._map.zoomOut, this._map);
    // ideally the fullscreen function should reside in the Map class, but this will do for now...
    this._fullScreenButton = this._createButton(
				'Full Screen', 'leaflet-control-full-screen', this.fullscreen, this);

    // reorder this as you like (ie: place fullscreen button below zoom buttons)
		this._container.appendChild(this._fullScreenButton);
		this._container.appendChild(this._zoomInButton);
		this._container.appendChild(this._zoomOutButton);

	},
  fullscreen: function(){

	  if (!this._isFullscreen) {
	    this._enterFullScreen();
	  }else{
	    this._exitFullScreen();
	  };

    // force internal resize
	  this._map.invalidateSize();
  },
  // these should be moved on the Map object at ome point...
  _isFullscreen: false,
  _enterFullScreen: function(){
    var container = this._map._container;

    // make it full screen
    container.style.position = 'fixed';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.top = 0;
    container.style.left = 0;
    container.style.margin = 0;
    container.style.padding = 0;
    container.style.borderWidth = 0;

	  // record state
	  this._isFullscreen = true;

	  // add ESC listener
	  var that = this;
    document.onkeyup = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode === 27 && that._isFullscreen === true) {
          that._exitFullScreen();
        }
    };

    // fire fullscreen event on map
    this._map.fire('enterFullscreen');
  },
  _exitFullScreen: function(){
    var container = this._map._container;

    // restore original map container css
    container.removeAttribute('style');

    // record current state
    this._isFullscreen = false;

    // remove ESC listener (if we can namespace it in the enterFullscreen function)
    
    // fire fullscreen event
    this._map.fire('exitFullscreen');
  }
});