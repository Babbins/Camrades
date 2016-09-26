app.factory('grainPlayer', function(){
  var player = new Tone.GrainPlayer({
			"url" : "./audio/FWDL.mp3",
			"loop" : true,
			"grainSize" : 0.1,
			"overlap" : 0.05,
		}).toMaster();
});
