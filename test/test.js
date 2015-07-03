'use strict'

var tape = require('tape')
var createCamera = require('../camera')

tape('camera 2d', function(t) {
  var camera = createCamera()

  var m = camera.getMatrix()

  t.same(m, [1,0,0,
             0,1,0,
             0,0,1])

  camera.scaleRotate(0, 0, 0, 0)


  t.end()
})
