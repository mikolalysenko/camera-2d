# game-camera-2d

> A simple 2D camera suited for games.


# Install

```bash
$ npm install game-camera-2d
```


# Usage

```js
var camera = createCamera({
  left: 0,
  right: 640,
  top: 0,
  bottom: 480
})

camera.setTranslation(64, 64)
camera.setRotation(Math.PI / 4)
camera.setScale(0.5)

var matrix = camera.getMatrix()
console.dir(matrix)
```

outputs a 3x3 matrix compatible with
[gl-mat3](https://www.npmjs.com/package/gl-mat3):
```
Float32Array {
  '0': 0.0011048543965443969,
  '1': -0.001473139156587422,
  '2': 0,
  '3': -0.0011048543965443969,
  '4': -0.001473139156587422,
  '5': 0,
  '6': 0,
  '7': 0.18856181204319,
  '8': 1 }
```

# API

## var camera = require('game-camera-2d')(options)

Creates a new camera object. The `options` object contains the following
optional parameters:

- `left` - the coordinate of the left side of the screen.
- `right` - the coordinate of the right side of the screen.
- `top` - the coordinate of the top of the screen.
- `bottom` - the coordinate of the bottom of the screen.
- `x` - the X coordinate to centre the camera on.
- `y` - the Y coordinate to centre the camera on.
- `angle` - the rotation to apply around the screen centre.
- `scale` - the scaling factor to apply.


## Properties

### camera.width, camera.height

Width and height of the camera viewport, in units.

### camera.x, camera.y

The camera's current X/Y offset from the origin.

### camera.rotation

The rotation of the camera viewport, in radians.

### camera.scale

The scaling factor of the camera.


## Methods

### camera.getMatrix([out])

Retrieves the current state of the camera matrix.

`out` is a length 9 array which receives the result of the computation if not
otherwise specified.

**Returns** The resulting camera matrix

### camera.setTranslation(x, y)

Sets the X/Y offset from the origin for the camera to be centred on.

### camera.setRotation(angle)

Sets the rotation around the translation coordinates, in radians.

### camera.setScale(scale)

Sets the scaling factor of the camera at the translation coordinates.


## Additional Credit

Heavily inspired by Mikola Lysenko's
[camera-2d](https://github.com/mikolalysenko/camera-2d) module.

I really liked the idea of a lightweight 2D camera that spits out a 3x3
transformation matrix, but wanted an API that made both absolute and relative
operations easy.

