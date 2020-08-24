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
    hasChanged: {type:'bool'}
  },
  init: function(){
    var data = this.data;
    const globeEntity = document.querySelector('#globe');
    const globeComponent = globeEntity.components.globe;
    data.coordinates = new THREE.Vector2(data.coordinates.x,data.coordinates.y);
    position = globeComponent.getCoords(data.coordinates.x, data.coordinates.y);
    geometry = this.geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', data.position);
  },
  tick: function (time, deltaTime) {
    this.data.coordinates.add(new THREE.Vector2(deltaTime/100, deltaTime/100));
    this.data.hasChanged = true;
  },
  remove: function () {
  }
});
