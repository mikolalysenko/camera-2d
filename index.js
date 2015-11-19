'use strict'

module.exports = createCamera2D

var mat3 = require('gl-mat3')
var vec2 = require('gl-vec2')

function Camera2D(angle, scale, tx, ty, left, right, top, bottom) {
  this.angle     = angle
  this.scale     = scale
  this.x         = tx
  this.y         = ty
  this.left      = left
  this.right     = right
  this.top       = top
  this.bottom    = bottom

  this.width     = Math.abs(this.left - this.right)
  this.height    = Math.abs(this.top - this.bottom)

  this.projection= ortho2D(mat3.create(), this.left, this.right, this.bottom, this.top)
  this.matrix    = mat3.create()
  this.scratchVector = vec2.create()
}

var proto = Camera2D.prototype

proto.getMatrix = function(out) {

  // Set to basic projection
  mat3.copy(this.matrix, this.projection)

  // Rotate
  mat3.rotate(this.matrix, this.matrix, this.angle)

  // Scale
  vec2.set(this.scratchVector, this.scale, this.scale)
  mat3.scale(this.matrix, this.matrix, this.scratchVector)

  // Translate to destination
  vec2.set(this.scratchVector, this.x, this.y)
  mat3.translate(this.matrix, this.matrix, this.scratchVector)

  out = out || mat3.create()
  mat3.copy(out, this.matrix)

  return out
}

proto.setRotation = function (angle) {
  this.angle = angle
}

proto.setScale = function (scale) {
  this.scale = scale
}

proto.setTranslation = function(x, y) {
  this.x = -x
  this.y = -y
}

function createCamera2D(options) {
  options = options || {}
  return new Camera2D(
    options.angle   || 0.0,
    options.scale   || 1.0,
    options.x       || 0.0,
    options.y       || 0.0,
    options.left    || 0.0,
    options.right   || 1.0,
    options.top     || 0.0,
    options.bottom  || 1.0
  )
}

function ortho2D(out, left, right, bottom, top) {
  var lr = 1 / (left - right)
  var bt = 1 / (bottom - top)

  out[0] = -2 * lr
  out[1] = 0
  out[2] = 0

  out[3] = 0
  out[4] = -2 * bt
  out[5] = 0

  out[6] = 0
  out[7] = 0
  out[8] = 1

  return out
}
