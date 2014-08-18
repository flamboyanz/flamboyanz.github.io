/*global require, dat*/

require.config({
  deps : ['vendor/Events', 'vendor/lodash','vendor/dat.gui.min']
});

require(
  [
    'lib/ParticleSystem',
    'lib/Display',
    'lib/Vector',
    'gui'
  ],
  function(ParticleSystem, Display, Vector, GUI){
    "use strict";

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    window.addEventListener('resize', resize); resize();

    var display = new Display(document.getElementById('canvas'));
    display.init();
    var particleSystem = new ParticleSystem().init(display);
    display.start();

    var gui = new GUI(particleSystem, display);

    particleSystem.addEmitter(new Vector(360,230),Vector.fromAngle(1.6,2));
    //particleSystem.addEmitter(new Vector(360,230),Vector.fromAngle(1.6,2));
    particleSystem.addField(new Vector(100,500), 0);


    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

  }
);

//Vector.fromAngle(angle * Math.PI / 180,object.velocity.getMagnitude())