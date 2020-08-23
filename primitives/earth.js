AFRAME.registerComponent('earth', {
  schema: {
  },
  init: function(){

  },
  tick: function(time, deltaTime){
    // Pull Data from subpoints
    //move this as another component on the globe?  use custom?
    const globeEntity = document.querySelector('#globe');
    const sceneEl = document.querySelector('a-scene');
    const els = sceneEl.querySelectorAll('a-subpoint');

    const gData = Array.from(els).map(el => ({
      lat: el.components.subpoint.data.coordinates.x,
      lng: el.components.subpoint.data.coordinates.y,
      color: el.components.subpoint.data.color
    }));

    globeEntity.setAttribute('globe', {
      pointsData: gData,
      pointColor: 'color',
    });
  },

  update: function (oldData) {

  }
});
