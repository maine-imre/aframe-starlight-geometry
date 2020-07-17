AFRAME.registerComponent('earth', {
  schema: {
    scale: {default: .000001},
    radius: {default: 6371000}, //earth radius meters
  },
  init: function(){
    const el = this.el,
        data = this.data;

  },

  tick: function(time, deltaTime){
    var data = this.data;
    data.radius = data.radius + deltaTime;
  },

  update: function (oldData) {
      var data = this.data;
      this.attributes.radius = data.radius*data.scale;
  }
});
