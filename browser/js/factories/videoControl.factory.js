app.factory('videoControlFactory', function(){
  var videoControl = {};
  return {
    getVideoControl: function(){
      return videoControl;
    },
    setVideoControl: function(newVideoControl){
      videoControl = newVideoControl;
    }
  }
});
