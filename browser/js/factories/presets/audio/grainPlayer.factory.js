app.factory('grainPlayer', function(){
  var player;
  return {
    setup: function(){
      player = new Tone.GrainPlayer({
        url: "./toto-africa.mp3",
        loop: true,
        grainSize: 0.1,
        overlap: 0.05,
      }).toMaster();
    },
    controls: [
      {
        label: "Detune Track",
        property: "detune",
        min: -40,
        max: 40
      },
      {
        label: "Playback Rate",
        property: "playbackRate",
        min: 0.1,
        max: 2.5
      },
      {
        label: "Grain Size",
        property: "grainSize",
        min: 0.1,
        max: 2
      },
    ],
    on: function(){
      player.start();
    },
    off: function(){
      player.stop();
    },
    render: function(state){
      if(state.detune){
        player.detune = state.detune;
      }
      if(state.playbackRate){
        player.playbackRate = state.playbackRate;
      }
      if(state.grainSize){
        player.grainSize = state.grainSize;
      }
    }
  }
});
