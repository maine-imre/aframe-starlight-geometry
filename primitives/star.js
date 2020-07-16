//primitive for bundle of star rays from a point on the surface of the sphere
module.exports.Primitive = AFRAME.registerPrimitive('a-star', {
  defaultComponents: {
    star: {},
    geometry:{
      primitive:'line',
    }
  },
  mappings: {
    coordinates: 'star.coordinates',
    depth: 'star.depth',
    color: 'geometry.color',
    opacity: 'geometry.opacity',
    earthCenter: 'star.earthCenter',
    earthRotationOffset: 'star.earthRotationOffset',
    earthScale: 'star.earthRadius'
  }
});

module.exports.Component = AFRAME.registerComponent('tube', {
  schema: {
    coordinates:           {default: [0,0]},
    depth:                 {default: 100},
    earthCenter:           {default: [0,0,0]},
    earthRotationOffset:   {default: [0,0]},
    earthScale:           {default: 1}
  },
  init: function () {
  const el = this.el,
      data = this.data;
  },

  update: function (prevData) {
    updateLineCoordinates();
    if (!Object.keys(prevData).length) return;

    this.remove();
    this.init();
  },

  remove: function () {
    if (this.mesh) this.el.removeObject3D('mesh');
  },

  updateLineCoordinates: function() {
    localLatLong = data.coordiantes + data.earthRotationOffset;
    localSpherical = new THREE.Spherical(globalLatLong.x, globalLatLong.y, earthRadius*depth);
    localCartesian = THREE.Vector3.setFromSphereical(localSpherical);
    this.geometry.start = data.earthCenter + localCartesian;
    this.geometry.end = data.earthCenter + localCartesian;
  }
});
