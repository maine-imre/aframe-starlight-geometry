AFRAME.registerComponent('earth', {
  schema: {
  },
  init: function(){
  },
  tick: function(time, deltaTime){
    // Pull Data from subpoints
    //these methods are ineficient, consider another implementation
    const globeEntity = document.querySelector('#globe');
    const sceneEl = document.querySelector('a-scene');
    const els = sceneEl.querySelectorAll('a-subpoint');

    if(els.length != globeEntity.getAttribute('globe').pointsData.length){
      //construct gData
      const gData = Array.from(els).map(el => ({
        lat: el.components.subpoint.data.coordinates.x,
        lng: el.components.subpoint.data.coordinates.y,
        color: el.components.subpoint.data.color
      }));

      globeEntity.setAttribute('globe', {
        pointsData: gData,
        pointColor: 'color',
      });
    }

    //update gData
    if(Array.from(els).filter(function(item){return (item.components.subpoint.data.hasChanged);}).length > 0){
      //construct gData
      const gData = Array.from(els).map(el => ({
        lat: el.components.subpoint.data.coordinates.x,
        lng: el.components.subpoint.data.coordinates.y,
        color: el.components.subpoint.data.color
      }));

      globeEntity.setAttribute('globe', {
        pointsData: gData,
        pointColor: 'color',
      });
      //const updateData = globeEntity.getAttribute('globe').pointsData;
      //for (var i = 0; i < updateData.length; i++) {
      //  if(els[i].components.subpoint.data.hasChanged){
          //console.log(els[i].components.subpoint.data.coordinates);
      //    globeEntity.getAttribute('globe').pointsData[i].lat = els[i].components.subpoint.data.coordinates.x;
      //    globeEntity.getAttribute('globe').pointsData[i].lng = els[i].components.subpoint.data.coordinates.y;
      //    els[i].components.subpoint.data.hasChanged = false;
      //  }
      //}
      //globeEntity.setAttribute('globe', {
      //  pointsData: updateData,
      //});
    }
  },
});
