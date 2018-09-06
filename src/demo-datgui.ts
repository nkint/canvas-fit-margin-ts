import { createFit } from './'
import colors = require('nice-color-palettes')
import * as dat from 'dat-gui'

const gui = new dat.GUI()
gui.domElement.parentElement.style.zIndex = '1'

const canvas = document.createElement('canvas')
const resizeCanvas = createFit(canvas, { margin: 2 })
document.body.appendChild(canvas)

const context = canvas.getContext('2d')
const colorIndex = Math.round(Math.random() * 100)
const c1 = colors[colorIndex][0]
const c2 = colors[colorIndex][1]

function renderCanvas() {
  const [width, height] = resizeCanvas()
  const gradient = context.createLinearGradient(0, 0, width, height)

  gradient.addColorStop(0, c1)
  gradient.addColorStop(1, c2)

  context.fillStyle = gradient
  context.fillRect(0, 0, width, height)
}

document.body.style.margin = '0'

renderCanvas()
window.addEventListener('resize', renderCanvas, false)
