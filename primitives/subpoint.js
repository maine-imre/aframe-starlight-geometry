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
    globePosition = globeEntity.object3D.position;
    position = globeComponent.getCoords(data.coordinates.x, data.coordinates.y, 0);
    worldPosition = {x: position.x*.01+globePosition.x, y: position.y*.01+globePosition.y, z: position.z*.01+globePosition.z};
    geometry = this.geometry = new THREE.BufferGeometry();
    this.el.object3D.position.set(worldPosition.x,worldPosition.y,worldPosition.z);
  },
  tick: function (time, deltaTime) {
    //this is quite inefficient
    var data = this.data;
    const globeEntity = document.querySelector('#globe');
    const globeComponent = globeEntity.components.globe;
    globePosition = globeEntity.object3D.position;

    worldPosition = this.el.object3D.position;
    localposition = {x: (worldPosition.x-globePosition.x)*100, y: (worldPosition.y-globePosition.y)*100, z: (worldPosition.z-globePosition.z)*100};
    coordinates = globeComponent.toGeoCoords(localposition);
    data.coordinates.x = coordinates.lat;
    data.coordinates.y = coordinates.lng;
    //console.log(data.coordinates);
    data.hasChanged=true;
  },
  remove: function () {
  }
});
