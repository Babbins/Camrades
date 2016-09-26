app.factory('arpeg', function(){
  var synth, prog, lastSynthNote, one, two, three, five, six, seven, reverb;
  return{
    setup: function(){
      reverb = new Tone.Freeverb().toMaster({
        roomSize: 0.5
      });
      synth = new Tone.MonoSynth({

        "harmonicity":8,
        "modulationIndex": 2,
        "oscillator" : {
            "type": "sine"
        },
        "envelope": {
            "attack": 0.8,
            "decay": 2,
            "sustain": 0.1,
            "release": 2
        },
        "modulation" : {
            "type" : "square"
        },
        "modulationEnvelope" : {
            "attack": 0.002,
            "decay": 0.2,
            "sustain": 0,
            "release": 0.2
        }

      }).connect(reverb).toMaster();
      seven = new Tone.Pattern(function(time, note){
        synth.triggerAttackRelease(note, 0.01);
      }, ["F3", "C4", "F4", "Ab4"]);
      three = new Tone.Pattern(function(time, note){
        synth.triggerAttackRelease(note, 0.01);
      }, ["A#3", "C#4", "E#4", "A#4"]);
      six = new Tone.Pattern(function(time, note){
        synth.triggerAttackRelease(note, 0.01);
      }, ["Eb3", "G3", "Eb4", "Bb4"]);
      two = new Tone.Pattern(function(time, note){
        synth.triggerAttackRelease(note, 0.01);
      }, ["G#3", "D#4", "G#4", 'G4']);
      five = new Tone.Pattern(function(time, note){
        synth.triggerAttackRelease(note, 0.01);
      }, ["C#4", "F4", "G#4", "C#5"]);
      one = new Tone.Pattern(function(time, note){
        synth.triggerAttackRelease(note, 0.01);
      }, ["G3", "Bb4", "Db4", "E4"]);
      prog = [seven, three, six, two, five, one];
    },
    on: function (){
      Tone.Transport.start();
      Tone.Transport.bpm.value = 350;
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
      },
      {
        label: 'Reverb Wet/Dry',
        property: 'wet',
        min: 0,
        max: 1
      }
    ],
    render: function(state){
      if(state.setNote){
        var idx = Math.round(state.setNote);
        if (lastSynthNote !== idx){
          if(lastSynthNote){
            prog[lastSynthNote].cancel(0.001);
          }
          prog[idx].start(0.01);
          lastSynthNote = idx;
        }
      }
      if(state.wet){
        reverb.wet.value = state.wet;
      }
    }

  }

});
