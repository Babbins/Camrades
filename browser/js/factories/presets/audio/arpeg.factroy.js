app.factory('arpeg', function(){
  var synth, prog, lastSynthNote, one, two, three, five, six, seven;
  return{
    setup: function(){
      synth = new Tone.MonoSynth({
        "oscillator": {
            "type": "square"
        },
        "filter": {
            "Q": 2,
            "type": "lowpass",
            "rolloff": -12
        },
        "envelope": {
            "attack": 0.005,
            "decay": 3,
            "sustain": 0,
            "release": 0.45
        },
        "filterEnvelope": {
            "attack": 0.001,
            "decay": 0.32,
            "sustain": 0.9,
            "release": 3,
            "baseFrequency": 700,
            "octaves": 2.3
        }
      }).toMaster();
      seven = new Tone.Pattern(function(time, note){
        synth.triggerAttackRelease(note, 0.02);
      }, ["F3", "C4", "F4", "Ab4"]);
      three = new Tone.Pattern(function(time, note){
        synth.triggerAttackRelease(note, 0.02);
      }, ["A#3", "C4", "C#4", "D#4", "E#4"]);
      six = new Tone.Pattern(function(time, note){
        synth.triggerAttackRelease(note, 0.02);
      }, ["Eb3", "G3", "Eb4", "Bb4", 'D4']);
      two = new Tone.Pattern(function(time, note){
        synth.triggerAttackRelease(note, 0.02);
      }, ["G#3", "C4", "D#4", "G#4", 'G4']);
      five = new Tone.Pattern(function(time, note){
        synth.triggerAttackRelease(note, 0.02);
      }, ["C#4", "F4", "G#4", "C5", 'F5']);
      one = new Tone.Pattern(function(time, note){
        synth.triggerAttackRelease(note, 0.02);
      }, ["G3", "Bb4", "Db4", "E4", 'G4']);
      prog = [seven, three, six, two, five, one];
    },
    on: function (){
      Tone.Transport.start();
    },
    off: function (){
      Tone.Transport.stop();
    },
    controls: [
      {
        label: "Set Chord",
        property: "setNote",
        min: 0,
        max: 5
      },
      {
        label: 'Arpeggio Speed',
        property: 'bpm',
        min: 40,
        max: 150
      }
    ],
    render: function(state){
      if(state.setNote){
        if(lastSynthNote !== Math.round(state.setNote)){
          console.log(Math.round(state.setNote));
          prog[Math.round(state.setNote)].start(0.5);
          lastSynthNote = Math.round(state.setNote);
        }
      }
      if(state.bpm){
        Tone.Transport.bpm.value = state.bpm;
      }
    }

  }

});
