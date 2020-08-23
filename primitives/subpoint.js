//primitive for bundle of star rays from a point on the surface of the sphere
AFRAME.registerPrimitive('a-subpoint', {
  defaultComponents: {
    subpoint: {}
  },
  mappings: {
    coordinates: 'subpoint.coordinates',
  }
});

AFRAME.registerComponent('subpoint', {
  schema:{
    //position:           {type: 'vec3', default: {x: 0, y: 0, z: 0}},
    coordinates:           {type: 'vec2', default: {x:0,y:0}}, //in degrees
    color: {type: 'color', default: '#ffffff'},
  },
  init: function(){
    var data = this.data;
    const globeEntity = document.querySelector('#globe');
    const globeComponent = globeEntity.components.globe;

    position = globeComponent.getCoords(data.coordinates.x, data.coordinates.y);
    geometry = this.geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', data.position);

    const sceneEl = document.querySelector('a-scene');
    const controls = sceneEl.querySelectorAll('hand-controls');

    for (var i = 0; i < controls.length; i++) {
      controlls[i].addEventListener('gridpdwn', gripdown(e));
      controls[i].addEventListener('gripup', gripUp(e));
    }

  },
  gripdown: function(gripEvent){console.log(gripEvent)},
  gripup: function(gripEvent){console.log(gripEvent)},
  update: function () {
    //var position = this.geometry.getAttribute('position');
    //move with controls here

    //var data = this.data;
    //const globeEntity = document.querySelector('#globe');
    //const globeComponent = globeEntity.components.globe;
    //data.coordinates = [globeComponent.toGeoCoords(position).lat,globeComponent.toGeoCoords(position).lng];
    //position = globeComponent.getCoords({lat: data.coordinates.x, lng: data.coordinates.y, altitude:1});
    //this.geometry.setAttribute('position', data.position);
  },
  remove: function () {
  }
});
