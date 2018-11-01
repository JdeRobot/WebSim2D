AFRAME.registerComponent("follow-body", {
  'schema': {
    entityId: { type:'string', default:''},
    offsetRotation: { type: 'vec3', default: "0 0 0" }
  },
  init: function(){
    this.pibot = document.querySelector(this.data.entityId);
    this.initialRotation = this.data.offsetRotation.y;

  },
  tick: function(){
    // 0.28 and 0.38 are values to adjust raycaster to the a-pibot body
    // calculated with aframe inspector manually
    let pibotPos = this.pibot.object3D.position;
    let pibotRotation = this.pibot.object3D.rotation;
    let raycasterRotation = pibotRotation.y + THREE.Math.degToRad(this.initialRotation);
    let el = this.el;

    let offsetY = 0.23;
    let offsetX = 0.38*Math.cos(THREE.Math.radToDeg(pibotRotation.y) * Math.PI/180);
    let offsetZ = 0.38*Math.sin(THREE.Math.radToDeg(pibotRotation.y) * Math.PI/180);

    el.object3D.position.set(pibotPos.x + offsetX , pibotPos.y + offsetY, pibotPos.z - offsetZ);
    el.object3D.rotation.set(pibotRotation.x, raycasterRotation, pibotRotation.z);
  }
});
