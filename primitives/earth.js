AFRAME.registerComponent('earth', {
  schema: {
    scale: {default: .000001},
    radius: {default: 6371000}, //earth radius meters
    position: {default: [0,0,0]}
  },
  init: function(){
    const el = this.el,
        data = this.data;

  }
});
