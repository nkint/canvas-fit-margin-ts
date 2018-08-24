import { createFit } from './'

var canvas = document.createElement('canvas')
var resize = createFit(canvas)

window.addEventListener('resize', resize, false)
document.body.appendChild(canvas)
