app.factory('theremin', function(){
  var synth, freeverb, notes;
  return{
    setup: function(){
      freeverb = new Tone.Freeverb();
      freeverb.dampening.value = 1200;
      freeverb.roomSize.value = 0.95;
      notes = ['C4','Db4','F4','G4','Bb4','C5'];
      synth = new Tone.FMSynth({
        "harmonicity": 3.01,
        "modulationIndex": 14,
        "oscillator": {
            "type": "triangle"
        },
        "envelope": {
            "attack": 0.2,
            "decay": 0.3,
            "sustain": 0.1,
            "release": 1.2
        },
        "modulation" : {
            "type": "square"
        },
        "modulationEnvelope" : {
            "attack": 0.01,
            "decay": 0.5,
            "sustain": 0.2,
            "release": 0.1
        }
      }).connect(freeverb).toMaster();
    },
    on: function(){
    },
    controls: [
      {
        label: "Synth Note",
        property: "setNote",
        min: 0,
        max: 5
      },
      {
        label: "Synth Volume",
        property: "volume",
        min: -40,
        max: 20
      },
    ],
    render: function(state){
      if(state.volume){
        synth.volume.value = state.volume;
      }
      if(state.setNote){
        var note = Math.round(state.setNote);
        synth.triggerAttack(notes[note]);
      }
    }

  }
});
