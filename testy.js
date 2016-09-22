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
Input.prototype.getX = function(){
  return this.x;
}
Input.prototype.setY = function(n){
  this.y = n/(this.yMax - this.yMin);
}
Input.prototype.getY = function(){
  return this.y;
}
Input.prototype.setZ = function(n){
  this.z = n/(this.zMax - this.zMin);
}
Input.prototype.getZ = function(){
  return this.z;
}

Input.prototype.interpolate = function(axis, min, max){
  if (!axis) throw new Error("Invalid axis value; must be 'x', 'y', or 'z' ");
  return Math.round(this[axis] * (max - min) + min);
}
