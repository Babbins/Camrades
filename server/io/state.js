module.exports = {
  makeState: function(...inputs){
    var state = {};
    inputs.forEach(control => {
      state[control.type] = control.value;
    })
    return state;
  }
}
