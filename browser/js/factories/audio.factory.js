app.factory('AudioFactory', function(){
  var player = new Tone.Player('/signals.mp3').toMaster();
  player.autostart = true;
  var lfo = new Tone.LFO('4n', 400, 4000)
  var osc = new Tone.OmniOscillator('Ab3', 'sine').toMaster();
  var synth = new Tone.DuoSynth({
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
  var synthNotes = ['c4','c#4','f4','g4','a#4']
  var lastSynthNote = synthNotes[0];
});
