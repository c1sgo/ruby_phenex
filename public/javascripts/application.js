var root = this;

String.prototype.slashify = function () {
  var str = this.gsub('.', '/');
  return ('/'+str.underscore());
}