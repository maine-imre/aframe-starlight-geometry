//primitive for bundle of star rays from a point on the surface of the sphere
AFRAME.registerPrimitive('a-subpoint', {
  defaultComponents: {
    subpoint: {}
  },
  mappings: {
    coordinates: 'subpoint.coordinates',
    color: 'subpoint.color'
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
    this.el.setAttribute('geometry',{primitive:'sphere', radius: .008}, true);
    this.el.setAttribute('material',{color:data.color}, true);

    const globeEntity = document.querySelector('#globe');
    const globeComponent = globeEntity.components.globe;
    scale = globeEntity.components.earth.data.scale;

    data.coordinates = new THREE.Vector2(data.coordinates.x,data.coordinates.y);
    globePosition = globeEntity.object3D.position;
    position = globeComponent.getCoords(data.coordinates.x, data.coordinates.y, 0);
    worldPosition = {x: position.x/scale+globePosition.x, y: position.y/scale+globePosition.y, z: position.z/scale+globePosition.z};
    geometry = this.geometry = new THREE.BufferGeometry();
    this.el.object3D.position.set(worldPosition.x,worldPosition.y,worldPosition.z);
  },
  tick: function (time, deltaTime) {
    //this is quite inefficient
    var data = this.data;
    const globeEntity = document.querySelector('#globe');
    const globeComponent = globeEntity.components.globe;
    scale = globeEntity.components.earth.data.scale;

    globePosition = globeEntity.object3D.position;
    worldPosition = this.el.object3D.position;
    if(this.el.is('dragged')){
      localposition = {x: (worldPosition.x-globePosition.x)/scale, y: (worldPosition.y-globePosition.y)/scale, z: (worldPosition.z-globePosition.z)/scale};
      coordinates = globeComponent.toGeoCoords(localposition);
      data.coordinates.x = coordinates.lat;
      data.coordinates.y = coordinates.lng;
    }

    //set handle on earth surface
    position = globeComponent.getCoords(data.coordinates.x, data.coordinates.y, 0);
    worldPosition = {x: position.x*scale+globePosition.x, y: position.y*scale+globePosition.y, z: position.z*scale+globePosition.z};
    geometry = this.geometry = new THREE.BufferGeometry();
    this.el.object3D.position.set(worldPosition.x,worldPosition.y,worldPosition.z);
  },
  remove: function () {
  }
});
