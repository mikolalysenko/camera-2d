camera-2d
=========
A simple 2D camera module, for use with rendering plots

# Install

```
npm i camera-2d
```

# API

## Constructor

#### `var camera = require('camera-2d')(options)`
Creates a new camera object.  The `options` object contains the following parameters:

* `scale` - the amount to rescale the view by (dimensionless unit)
* `angle` - the amount to rotate by in radians
* `centerX` - x center of translation in screen coordinate pixels
* `centerY` - y center of translation in screen coordinate pixels
* `width` - width of view port
* `height` - height of view port

**Returns** A new camera object

## Properties

#### `camera.width`
The width of the viewport of the camera

#### `camera.height`
The height of the viewport of the camera

## Methods

#### `camera.getMatrix([out])`
Retrieves the current state of the camera matrix

* `out` is a length 9 array which receives the result of the computation if not otherwise specified.

**Returns** The resulting camera matrix

#### `camera.scaleRotate(dscale, dangle, centerX, centerY)`
Applies a scale/roation to the camera about some point

* `dscale` is the amount to rescale the camera
* `dangle` is the change in camera rotation in degrees
* `centerX` is the x-component of the center of the scale/rotation
* `centerY` is the y-component of the center of the scale/rotation

#### `camera.translate(dx, dy)`
Pans the camera by some amount (dx, dy).

* `dx,dy` are the components of the translation vector

# License
(c) 2015 Mikola Lysenko. MIT License
