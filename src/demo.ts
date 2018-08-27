import { createFit } from './'
import colors = require('nice-color-palettes')

const colorIndex = Math.round(Math.random() * 100)
const c1 = colors[colorIndex][0]
const c2 = colors[colorIndex][1]
const c3 = colors[colorIndex][3]
const c4 = colors[colorIndex][4]

function createCanvas(id: string, margin: number = null) {
  const canvas = document.createElement('canvas')
  const canvasContainer = document.getElementById(id)
  const resizeCanvas = createFit(canvas, { margin: margin, parent: canvasContainer })
  canvasContainer.appendChild(canvas)
  const context = canvas.getContext('2d')
  const colorIndex = Math.round(Math.random() * 100)
  const c1 = colors[colorIndex][0]
  const c2 = colors[colorIndex][1]
  return { context, resizeCanvas, c1, c2 }
}

function renderCanvas(
  resizeCanvas: () => number[],
  c1: string,
  c2: string,
  context: CanvasRenderingContext2D,
) {
  const [width, height] = resizeCanvas()
  const gradient = context.createLinearGradient(0, 0, width, height)

  gradient.addColorStop(0, c1)
  gradient.addColorStop(1, c2)

  context.fillStyle = gradient
  context.fillRect(0, 0, width, height)
}

const idMargins = [['canvas-container-1', 10], ['canvas-container-2', null]]

const items = idMargins.map(([id, margin]) => createCanvas(id as string, margin as number))
const renders = items.map(({ context, resizeCanvas, c1, c2 }) => () =>
  renderCanvas(resizeCanvas, c1, c2, context),
)

function render() {
  renders.forEach(r => r())
}

render()
window.addEventListener('resize', render, false)
