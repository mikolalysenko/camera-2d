var createCamera = require('../index')
var mat3 = require('gl-mat3')
var test = require('tape')

test('identity', function (t) {
  t.plan(1)

  var camera = createCamera()
  var matrix = camera.getMatrix()

  var expected = [
    2, 0, 0,
    0,-2, 0,
    0, 0, 1
  ]

  matrixEquals(t, matrix, expected)
})

test('projection', function (t) {
  t.plan(1)

  var camera = createCamera({
    left: 0,
    right: 100,
    top: 0,
    bottom: 100
  })
  var matrix = camera.getMatrix()

  var expected = [
    0.019999999552965164, 0,                    0,
    0,                   -0.019999999552965164, 0,
    0,                    0,                    1
  ]

  matrixEquals(t, matrix, expected)
})

test('translate', function (t) {
  t.plan(1)

  var camera = createCamera()
  
  camera.setTranslation(10, 5)

  var matrix = camera.getMatrix()

  var expected = [
    2, 0, 0,
    0,-2, 0,
  -20,10, 1
  ]

  matrixEquals(t, matrix, expected)
})

test('scale', function (t) {
  t.plan(1)

  var camera = createCamera()
  
  camera.setScale(4)

  var matrix = camera.getMatrix()

  var expected = [
    8, 0, 0,
    0,-8, 0,
    0, 0, 1
  ]

  matrixEquals(t, matrix, expected)
})

test('rotate', function (t) {
  t.plan(1)

  var camera = createCamera()
  
  camera.setRotation(Math.PI)

  var matrix = camera.getMatrix()

  var expected = [
   -2,        -2.4492937, 0,
   -2.4492937, 2,         0,
    0,         0,         1
  ]

  matrixEquals(t, matrix, expected)
})


function matrixEquals(t, actual, expected) {
  for (var i=0; i < 9; i++) {
    if (floatEquals(actual, expected)) {
      t.fail('matrix['+i+'] differs (actual='+actual[i]+' expected='+expected[i]+')') 
    }
  }
  t.ok(true)
}

function floatEquals(actual, expected) {
  var EPSILON = 0.0001
  return Math.abs(actual - expected) < EPSILON
}
