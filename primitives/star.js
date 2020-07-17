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
    earthscale: 'star.earthscale',
  }
});

AFRAME.registerComponent('star', {
  schema: {
    coordinates:           {type: 'vec2', default: {x:0,y:0}}, //in radians
    depth:                 {default: 5},
    earthcenter:           {type: 'vec3', default: {x: 0, y: 0, z: 0}},
    earthrotoffset:   {type: 'vec2', default: {x:0,y:0}}, //move to quaternions
    earthscale:           {default: 1},
    start: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
    end: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
    color: {type: 'color', default: '#74BEC1'},
    opacity: {type: 'number', default: 1},
    visible: {default: true}
  },
  init: function () {
    var data = this.data;
    var geometry;
    var material;
    this.rendererSystem = this.el.sceneEl.systems.renderer;
    material = this.material = new THREE.LineBasicMaterial({
      color: data.color,
      opacity: data.opacity,
      transparent: data.opacity < 1,
      visible: data.visible
    });
    geometry = this.geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(2 * 3), 3));

    this.rendererSystem.applyColorCorrection(material.color);
    this.line = new THREE.Line(geometry, material);
    this.el.setObject3D(this.attrName, this.line);
  },

  update: function (oldData) {
      var data = this.data;
      var geometry = this.geometry;
      var geoNeedsUpdate = false;
      var material = this.material;
      var positionArray = geometry.attributes.position.array;

      //recalculate from coords
      localLatLong = new THREE.Vector2();
      localLatLong.copy(data.coordinates);
      localLatLong.add(data.earthrotoffset);
      localSpherical = new THREE.Spherical( data.scale,localLatLong.x, localLatLong.y);
      localCartesian = new THREE.Vector3();
      localCartesian.setFromSpherical(localSpherical);

      start = new THREE.Vector3();
      end = new THREE.Vector3();
      start.copy(data.earthcenter);
      end.copy(data.earthcenter);
      start.addScaledVector(localCartesian,data.depth);
      end.add(localCartesian);
      console.log(start);

      data.start.x = start.x;
      data.start.y = start.y;
      data.start.z = start.z;
      data.end.x = end.x;
      data.end.y = end.y;
      data.end.z = end.z;

      // Update geometry.
      if (!isEqualVec3(data.start, oldData.start)) {
        positionArray[0] = data.start.x;
        positionArray[1] = data.start.y;
        positionArray[2] = data.start.z;
        geoNeedsUpdate = true;
      }

      if (!isEqualVec3(data.end, oldData.end)) {
        positionArray[3] = data.end.x;
        positionArray[4] = data.end.y;
        positionArray[5] = data.end.z;
        geoNeedsUpdate = true;
      }

      if (geoNeedsUpdate) {
        geometry.attributes.position.needsUpdate = true;
        geometry.computeBoundingSphere();
      }

      material.color.setStyle(data.color);
      this.rendererSystem.applyColorCorrection(material.color);
      material.opacity = data.opacity;
      material.transparent = data.opacity < 1;
      material.visible = data.visible;
    },

    remove: function () {
      this.el.removeObject3D('line', this.line);
    }
});

function isEqualVec3 (a, b) {
  if (!a || !b) { return false; }
  return (a.x === b.x && a.y === b.y && a.z === b.z);
}
