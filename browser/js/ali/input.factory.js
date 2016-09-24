app.factory('inputFactory', function(){
  var Input = function(xMin,xMax,yMin,yMax,zMin,zMax, color){
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
    this.zMin = zMin;
    this.zMax = zMax;
    this.color = color;
    this.x = {controls: [], value: 0};
    this.y = {controls: [], value: 0};
    this.z = {controls: [], value: 0};
  }
  Input.prototype.addControl = function (axis, control){
      this[axis].controls.push(control);
  }

  Input.prototype.setX = function(value, type, min, max){
    if(type) {
      this.x.type = type;
    }
    if(value) {
      this.x.value = value / (this.xMax - this.xMin) * (max - min) + min;
    }
  }
  Input.prototype.getX = function(){
    return this.x;
  }

  Input.prototype.setY = function(value, type, min, max){
    if(type) {
      this.y.type = type;
    }
    if(value) {
      this.y.value = value / (this.yMax - this.yMin) * (max - min) + min
    }
  }
  Input.prototype.getY = function(){
    return this.y;
  }

  Input.prototype.setZ = function(value, type, min, max){
    if(type) {
      this.z.type = type;
    }
    if(value) {
      this.z.value = value / (this.zMax - this.zMin) * (max - min) + min;
    }
  }
  Input.prototype.getZ = function(){
    return this.z;
  }
  return {
    Input: Input
  }
});
