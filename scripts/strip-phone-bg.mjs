// One-off: remove baked-in checkerboard background from the AI phone render.
// Flood-fills from image borders, clearing light gray/white pixels; the
// phone's dark frame stops the fill so the white screen inside is preserved.
import fs from 'node:fs'
import { PNG } from 'pngjs'

const [srcPath, outPath] = process.argv.slice(2)
const png = PNG.sync.read(fs.readFileSync(srcPath))
const { width, height, data } = png

const isLight = (i) => {
  const r = data[i], g = data[i + 1], b = data[i + 2]
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  return min > 195 && max - min < 30
}

const visited = new Uint8Array(width * height)
const stack = []
for (let x = 0; x < width; x++) {
  stack.push(x, 0, x, height - 1)
}
for (let y = 0; y < height; y++) {
  stack.push(0, y, width - 1, y)
}

let cleared = 0
while (stack.length) {
  const y = stack.pop()
  const x = stack.pop()
  if (x < 0 || y < 0 || x >= width || y >= height) continue
  const idx = y * width + x
  if (visited[idx]) continue
  visited[idx] = 1
  const i = idx * 4
  if (!isLight(i)) continue
  data[i + 3] = 0
  cleared++
  stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1)
}

fs.writeFileSync(outPath, PNG.sync.write(png))
console.log(`cleared ${cleared} of ${width * height} pixels -> ${outPath}`)
