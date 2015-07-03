'use strict'

module.exports = createCamera2D

function Camera2D(angle, scale, tx, ty, width, height) {
  this.angle     = angle
  this.logScale  = scale
  this.tx        = tx
  this.ty        = ty
  this.width     = width
  this.height    = height
}

var proto = Camera2D.prototype

proto.getMatrix = function(out) {
  var s = Math.exp(this.logscale)
  var cx = Math.cos(this.angle)
  var cy = Math.sin(this.angle)
  var h = canvas.width / canvas.height

  out = out || new Array(9)
  out[0] = s*cx
  out[1] = h*s*cy
  out[2] = 0
  out[3] = -s*cy
  out[4] = h*s*cx
  out[5] = 0
  out[6] = this.tx
  out[7] = h*this.ty
  out[8] = 1
  return out
}

proto.scaleRotate = function(dscale, dangle, lastX, lastY) {
  var s = Math.exp(this.logScale)
  var cx = Math.cos(this.angle)
  var cy = Math.sin(this.angle)
  var tx = this.tx
  var ty = this.ty
  var h = this.width / this.height

  this.angle += drotate
  this.logScale += Math.log(dscale)

  var ns = Math.exp(this.logScale)
  var ncx = Math.cos(this.angle)
  var ncy = Math.sin(this.angle)

  var bx = (2.0 * lastX / this.width - 1.0)
  var by = (1.0 - 2.0 * lastY / this.height) / h

  var x = tx - bx
  var y = ty - by

  var ux =  ncx * ns * x - ncy * ns * y
  var uy =  ncy * ns * x + ncx * ns * y

  this.tx =  cx / s * ux + cy / s * uy + bx
  this.ty = -cy / s * ux + cx / s * uy + by
}

proto.translate = function(dx, dy) {
  this.tx = 2.0 * dx / this.width
  this.ty = 2.0 * dy / this.width
}

function createCamera2D(options) {
  options = options || {}
  return new Camera2D(
    options.angle   || 0.0,
    Math.log(options.scale || 1.0),
    options.tx      || 0.0,
    options.ty      || 0.0,
    options.width   || 1.0,
    options.height  || 1.0
  )
}
