//primitive for bundle of star rays from a point on the surface of the sphere
AFRAME.registerPrimitive('a-star', {
  defaultComponents: {
    star: {},
  },
  mappings: {
    coordinates: 'star.coordinates',
    depth: 'star.depth',
    earthcenter: 'star.earthcenter',
    earthrotoffset: 'star.earthrotoffset',
    earthscale: 'star.earthRadius'
  }
});

AFRAME.registerComponent('star', {
  schema: {
    coordinates:           {default: [0,0]},
    depth:                 {default: 1},
    earthcenter:           {default: [0,0,0]},
    earthrotoffset:   {default: [0,0]}, //move to quaternions
    earthscale:           {default: 1},
    mode:                  {default: 3}
  },
  init: function () {
  const el = this.el,
      data = this.data;

  geometry = new THREE.BufferGeometry();
    this.lineSegments = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial());
    el.setObject3D('linesegments', this.lineSegments);
  },

  update: function (prevData) {
    data = this.data,
        lineSegments = this.lineSegments;
    localLatLong = data.coordiantes + data.earthrotoffset;
    localSpherical = new THREE.Spherical(localLatLong.x, localLatLong.y, data.earthRadius);
    localCartesian = new THREE.Vector3();
    localCartesian.setFromSpherical(localSpherical);

    linePoints = []
    if(data.mode >= 0){
    linePoints.push(data.earthcenter + localCartesian*data.depth); //segment 0
    linePoints.push(data.earthcenter + localCartesian);}
    if(data.mode >= 1){
    linePoints.push(data.earthcenter + localCartesian); //segment 1
    linePoints.push(data.earthcenter);}
    if(data.mode >= 2){
    linePoints.push(data.earthcenter);  //segment 2
    linePoints.push(data.earthcenter - localCartesian);}
    if(data.mode >= 3){
    linePoints.push(data.earthcenter - localCartesian); //segment 3
    linePoints.push(data.earthcenter - localCartesian*data.depth);}

    lineSegments.geometry.vertices = linePoints;
    lineSegments.geometry.verticesNeedUpdate = true;

    if (!Object.keys(prevData).length) return;

    this.remove();
    this.init();
  },

  remove: function () {
        this.el.removeObject3D('linesegments');
  }
});
