# canvas-fit-margin-ts [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

[canvas-fit](https://github.com/hughsk/canvas-fit) rewritten in Typescript.
Small module for fitting a canvas element within the bounds of its parent.
Useful, for example, for making a canvas fill the screen.

This module exports a named function that takes as input the HTMLCanvasElement
and an option object.
It has some limitations in respect of original [canvas-fit](https://github.com/hughsk/canvas-fit):

- does not work with SVG
- the resize function return `[width, height]` in pixel
- not dynamic (change the options implies to re-create).

## Usage

[![NPM](https://nodei.co/npm/canvas-fit-margin-ts.png)](https://nodei.co/npm/canvas-fit-margin-ts/)

### resize = createFit(canvas[, options])

Creates a `resize` function for your `canvas` element. Calling this function
will resize the canvas to fit its parent element.

Here's a simple example to make your canvas update its dimensions when
resizing the window:

```typescript
import { createFit }
const canvas = document.createElement('canvas')
window.addEventListener('resize', createFit(canvas), false)
```

You might want to pass the `options.parent`: the element that the canvas should be fitting within.
Or you might wanto to pass the `options.margin`: the margin that the canvas will have.
You can also set the scale of the canvas element relative to its styled size on the page using the `option.scale` field – for example, passing in `window.devicePixelRatio` here will scale the canvas resolution up on retina displays.

```typescript
const opts: CanvasFitOptions = {
  parent: document.getElementById('canvas-container'),
  margin: 10,
  scale: window.devicePixelRatio,
}

window.addEventListener('resize', createFit(canvas, opts), false)
```

## License

MIT. See [LICENSE.md](http://github.com/nkint/canvas-fit-margin-ts/blob/master/LICENSE.md) for details.
