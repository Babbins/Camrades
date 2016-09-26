app.factory('playAlong', function(){
  var synth,
  player,
  synthNotes,
  lastSynthNote;
  return {
    setup: function(){
      synth = new Tone.DuoSynth({
        'vibratoAmount': 0.5,
        'vibratoRate': 5,
        'portamento': 0.1,
        'harmonicity': 1.005,
        'volume': 5,
        'voice0': {
          'volume': -2,
          'oscillator': {'type': 'sawtooth'},
          'filter': {
            'Q': 1,
            'type': 'lowpass',
            'rolloff': -24
          },
          'envelope': {
            'attack': 0.1,
            'decay': 0.25,
            'sustain': 0.4,
            'release': 1.2
          },
          'filterEnvelope': {
            'attack': 0.1,
            'decay': 0.05,
            'sustain': 0.3,
            'release': 2,
            'baseFrequency': 100,
            'octaves': 4
          }
        },
        'voice1': {
          'volume': -5,
          'oscillator': {'type': 'sawtooth'},
          'filter': {
            'Q': 2,
            'type': 'bandpass',
            'rolloff': -12
          },
          'envelope': {
            'attack': 0.1,
            'decay': 0.05,
            'sustain': 0.7,
            'release': 0.8
          },
          'filterEnvelope': {
            'attack': 0.1,
            'decay': 0.05,
            'sustain': 0.7,
            'release': 2,
            'baseFrequency': 5000,
            'octaves': -1.5
          }
        }
      }).toMaster();
      player = new Tone.Player({
        url: '/signals.mp3',
        autostart: true
      }).toMaster();
      synthNotes = ['c4','c#4','f4','g4','a#4'];
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
