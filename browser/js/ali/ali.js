app.config(function ($stateProvider) {
    $stateProvider.state('ali', {
        url: '/ali',
        templateUrl: 'js/ali/ali.html',
        controller: 'aliCtrl'
    });
});

app.controller('aliCtrl', function(){
  var fmOsc = new Tone.AMOscillator("Ab3", "sine").toMaster();
  // var synth = new Tone.Synth().toMaster();
  // var osc = new Tone.OmniOscillator();
  // osc.frequency.value = "C4";
  // osc.start().stop("+8n");
  // var env = new Tone.AmplitudeEnvelope();
  // osc.connect(env);
  // env.toMaster();
  // var pattern = new Tone.Pattern(function(time, note){
  //     synth.triggerAttackRelease(note, '16t');
  // }, ["F4", "A4", "C5","G4", "B4", "D5", "A4", "C5","E5"]);
  //
  // pattern.pattern = 'up';
  // pattern.interval = '8n';
  // pattern.start(1);
  //
  // Tone.Transport.start();
})
