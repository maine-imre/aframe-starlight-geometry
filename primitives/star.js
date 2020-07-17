//primitive for bundle of star rays from a point on the surface of the sphere
AFRAME.registerPrimitive('a-star', {
  defaultComponents: {
    star: {},
  },
  mappings: {
    coordinates: 'star.coordinates',
    depth: 'star.depth',
    target: 'star.target'
  }
});

AFRAME.registerComponent('star', {
  schema: {
    coordinates:           {type: 'vec2', default: {x:0,y:0}}, //in radians
    depth:                 {default: 5},
    target:                  {type: 'selector'},
    targetposition:           {type: 'vec3', default: {x: 0, y: 0, z: 0}},
    targetquaternion:   {type: 'vec2', default: {x:0,y:0}}, //move to quaternions
    targetradius:           {default: 1},
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

    data.targetposition = new THREE.Vector3();
    data.targetquaternion = new THREE.Quaternion();

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

  tick: function(time, deltaTime){
    var data = this.data;
    data.coordinates.x = data.coordinates.x+deltaTime*10;
  },

  update: function (oldData) {
      var data = this.data;
      var geometry = this.geometry;
      var geoNeedsUpdate = false;
      var material = this.material;
      var positionArray = geometry.attributes.position.array;

      data.targetposition.copy(data.target.object3D.position);
      data.targetquaternion.copy(data.target.object3D.quaternion);
      data.targetradius = data.target.attributes.radius;

      //recalculate from coords
      localLatLong = new THREE.Vector2(THREE.Math.degToRad(data.coordinates.x),THREE.Math.degToRad(data.coordinates.y));
      localSpherical = new THREE.Spherical( data.scale,localLatLong.x, localLatLong.y);
      localCartesian = new THREE.Vector3();
      localCartesian.setFromSpherical(localSpherical);
      localCartesian.applyQuaternion(data.targetquaternion);
      start = new THREE.Vector3();
      end = new THREE.Vector3();
      start.copy(data.targetposition);
      end.copy(data.targetposition);
      start.addScaledVector(localCartesian,data.depth);
      end.add(localCartesian);

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
