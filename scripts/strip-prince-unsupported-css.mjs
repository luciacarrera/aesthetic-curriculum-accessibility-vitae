import fs from 'node:fs/promises'
import postcss from 'postcss'
import safeParser from 'postcss-safe-parser'
import selectorParser from 'postcss-selector-parser'

const INPUT = 'out/tailwind.css'
const OUTPUT = 'out/tailwind.prince.css'

// Remove rules that contain any of these selectors/pseudos
const BLOCKLIST = [
  ':host',
  '::backdrop',
  '::placeholder',
  ':after',
  ':before',
  'oaicite',
]

function shouldDropSelector(selector) {
  return BLOCKLIST.some((bad) => selector.includes(bad))
}

const css = await fs.readFile(INPUT, 'utf8')

const root = postcss().process(css, { parser: safeParser }).root

root.walkRules((rule) => {
  // If a rule has comma-separated selectors, drop only the bad ones
  const kept = []
  const selectors = rule.selectors || []

  for (const sel of selectors) {
    if (!shouldDropSelector(sel)) kept.push(sel)
  }

  if (selectors.length && kept.length === 0) {
    rule.remove() // drop whole rule if all selectors are bad
  } else if (selectors.length && kept.length !== selectors.length) {
    rule.selectors = kept // keep only supported selectors
  }
})

// Also drop any @keyframes or other at-rules if you want (optional)

await fs.writeFile(OUTPUT, root.toString(), 'utf8')
console.log(`✅ Wrote ${OUTPUT}`)
