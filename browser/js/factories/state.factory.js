app.factory('stateFactory', function(){
  var state = {};
  return {
    getState: function(){
      return state;
    },
    setState: function(newState){
      state = newState;
    }
  }
})
