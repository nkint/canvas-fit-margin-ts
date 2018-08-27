// import * as getSize from 'element-size'
import getSize = require('element-size')

export type CanvasFitOptions = {
  parent?: HTMLElement | Window | Node
  margin?: number
  scale?: number
}

const defaultOptions: CanvasFitOptions = {
  parent: null,
  margin: 0,
  scale: 1,
}

export function createFit(canvas: HTMLCanvasElement, options?: CanvasFitOptions) {
  // TODO: object assign could be optimized
  const opts = {
    ...defaultOptions,
    ...options,
  }

  const { margin, scale, parent } = opts

  canvas.style.position = canvas.style.position || 'relative  '
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.margin = `${margin}px`

  function resize(): number[] {
    const p = parent || canvas.parentNode

    let width, height

    if (p && p !== document.body) {
      const psize = getSize(p)
      width = psize[0] | 0
      height = psize[1] | 0
    } else {
      width = window.innerWidth
      height = window.innerHeight
    }

    width -= margin * 2
    height -= margin * 2

    canvas.width = width * scale
    canvas.height = height * scale

    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'

    return [width, height]
  }

  resize()

  return resize
}
