app.factory('inputFactory', function(){
  var Input = function(xMin,xMax,yMin,yMax,zMin,zMax){
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
    this.zMin = zMin;
    this.zMax = zMax;
    this.x = {};
    this.y = {};
    this.z = {};
  }
  Input.prototype.setX = function(value, type, min, max){
    if(type) {
      this.x.type = type;
    }
    if(value) {
      this.x.value = Math.round( (value / (this.xMax - this.xMin)) * (max - min) + min );
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
      this.y.value = Math.round( (value / (this.yMax - this.yMin)) * (max - min) + min );
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
      this.z.value = Math.round( (value / (this.zMax - this.zMin)) * (max - min) + min );
    }
  }
  Input.prototype.getZ = function(){
    return this.z;
  }
  return {
    Input: Input
  }
});
