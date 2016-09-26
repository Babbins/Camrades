app.factory('playAlong', function(){
  var synth,
  player,
  synthNotes,
  lastSynthNote;
  return {
    setup: function(){
      synth = new Tone.Synth({
        "oscillator": {
            "type": "fatsine4",
            "spread" : 60,
            "count" : 10
        },
        "envelope": {
            "attack": 0.4,
            "decay": 0.01,
            "sustain": 1,
            "attackCurve" : "sine",
            "releaseCurve" : "sine",
            "release": 0.4
        }
      }).toMaster();
      player = new Tone.Player({
        url: '/signals.mp3',
        autostart: true
      }).toMaster();
      synthNotes = ['eb4','f4','g4','bb4','c4', 'eb5'];
      lastSynthNote = synthNotes[0];
    },
    on: function(){
    },
    off: function(){
      player.stop();
    },
    controls: [
      {
        label: "Synth Frequency",
        property: "frequency",
        min: 0,
        max: 2000
      },
      {
        label: "Synth Volume",
        property: "volume",
        min: -35,
        max: 20
      },
      {
        label: 'Synth Vibrato Amount',
        property: 'vibratoAmount',
        min: 0,
        max: 2

      },
      {
        label: 'Synth Pitch Control',
        property: 'setNote',
        min: 0,
        max: 4
      },
    ],
    render: function(state){
        if(state.setNote){
          let note = synthNotes[Math.round(state.setNote)];
          if (note !== lastSynthNote){
            synth.triggerAttack(note);
          }
          lastSynthNote = note;
        }
        if(state.volume){
          synth.volume.value = state.volume;
        }
        if(state.vibratoAmount){
          synth.vibratoAmount = state.vibratoAmount;
        }
    }
  }
});
