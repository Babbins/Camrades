app.factory('inputFactory', function(){
  var Input = function(color, min, max){
    this.min = min;
    this.max = max;
    this.color = color;

    this.x = {controls: [], value: 0};
    this.y = {controls: [], value: 0};
    this.z = {controls: [], value: 0};
  }
  Input.prototype.addControl = function (axis, property, min, max){
      this[axis].controls.push({property: property, min: min, max: max});
  }
  Input.prototype.setValue = function(axis, value){
    this[axis].value = value / (this.max - this.min);
  }
  Input.prototype.getProperties = function(){
    let properties = {};
    this.x.controls.forEach(control => {
      properties[control.property] = this.x.value * (control.max - control.min) + control.min;
    });
    this.y.controls.forEach(control => {
      properties[control.property] = this.y.value * (control.max - control.min) + control.min;

    });
    this.z.controls.forEach(control => {
      properties[control.property] = this.z.value * (control.max - control.min) + control.min;

    });
    return properties;
  }
  return {
    Input: Input
  }
});
