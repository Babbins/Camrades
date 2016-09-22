app.factory('inputFactory', function(){
  var Input = function(xMin,xMax,yMin,yMax,zMin,zMax){
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
    this.zMin = zMin;
    this.zMax = zMax;
    this.x = null;
    this.y = null;
    this.z = null;
  }

  Input.prototype.setX = function(n){
    this.x = n/(this.xMax - this.xMin);
  }
  Input.prototype.getX = function(min, max){
    return Math.round(this.x * (max - min) + min);
  }
  Input.prototype.setY = function(n){
    this.y = n/(this.yMax - this.yMin);
  }
  Input.prototype.getY = function(min, max){
    return Math.round(this.y * (max - min) + min);
  }
  Input.prototype.setZ = function(n){
    this.z = n/(this.zMax - this.zMin);
  }
  Input.prototype.getZ = function(min, max){
    return Math.round(this.z * (max - min) + min);
  }

  return {
    Input: Input
  }
})
