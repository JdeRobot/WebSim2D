AFRAME.registerComponent("intersection-handler", {
  schema: {
    fps: { type: 'number', default: 15 }
  },

  init: function() {
    this.bindMethods();

  },

  tick: function(){

    if(new Date().getTime()-this.lastTick<(1000/this.data.fps))return;
    if(this.isIntersecting){
      let distanceObj = this.el.components.raycaster.getIntersection(this.hittedElem);
      this.el.emit('intersection-detected-' + this.el.id, distanceObj.distance );
    }else{
      this.el.emit('intersection-cleared-' + this.el.id);
    }
    this.lastTick = new Date().getTime();
  },

  bindMethods(){ // You could do all of this directly in your init() method, but I like to separate it.
    this.onIntersection = this.onIntersection.bind(this);
    this.onIntersectionClear = this.onIntersectionClear.bind(this);
  },

  play: function() {
    this.registerEventListeners();  // It's a good practice in general to enable your event listeners here.
  },

  pause: function() {
    this.deregisterEventListeners(); // Similarly a good practice to remove them here so that they don't stay bound while the scene isn't actually 'running'
  },

  registerEventListeners() {

    this.el.addEventListener('raycaster-intersection', this.onIntersection);
    this.el.addEventListener('raycaster-intersection-cleared', this.onIntersectionClear);
  },

  deregisterEventListeners() {

    this.el.removeEventListener('raycaster-intersection', this.onIntersection);
    this.el.removeEventListener('raycaster-intersection-cleared', this.onIntersectionClear);
  },

  onIntersection: function(e) {

    this.isIntersecting = true;
    if(e.detail.els[0]){
      this.hittedElem = e.detail.els[0];
    }
  },

  onIntersectionClear: function(e) {

    this.isIntersecting = false;
  }

});
