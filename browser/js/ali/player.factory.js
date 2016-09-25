app.factory('playerFactory', function(){
  var Player = function(inputs){
    this.inputs = inputs || [];
  }
  return {
    Player: Player
  }
});
