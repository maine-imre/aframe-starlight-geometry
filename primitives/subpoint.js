//primitive for bundle of star rays from a point on the surface of the sphere
AFRAME.registerPrimitive('a-subpoint', {
  defaultComponents: {
    subpoint: {},
    sphere: {},
  },
  mappings: {
    //position = 'subpoint.position',
    coordinates = 'subpoint.coordinates',
    globe = 'subpoint.globe',
    color = 'subpoint.color'
  }
});

AFRAME.registerComponent('subpoint', {
  schema:
  position = 'subpoint.position',
    globe:                  {type: 'selector'},
    //position:           {type: 'vec3', default: {x: 0, y: 0, z: 0}},
    coordinates:           {type: 'vec2', default: {x:0,y:0}}, //in degrees
    //color: {type: 'color', default: '#74BEC1'}
  },
  init: function(){
    position = data.target.getCoords({lat: data.coordiantes.x, lng: data.coordaintes.y, altitude:1});
    geometry = this.geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', data.position);
  },
  update: function () {
  },
  remove: function () {
  }
});
