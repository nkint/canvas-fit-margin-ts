import { fit } from './'

var canvas = document.createElement('canvas')
var resize = fit(canvas)

window.addEventListener('resize', resize, false)
document.body.appendChild(canvas)
