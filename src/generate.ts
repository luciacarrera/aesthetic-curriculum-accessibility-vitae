import fs from 'node:fs/promises'
import path from 'node:path'
import Handlebars from 'handlebars'
import { chromium } from 'playwright'

async function buildTailwindCss(): Promise<string> {
  // Assumes you ran `npm run build:css` first.
  const cssPath = path.join(process.cwd(), 'out', 'tailwind.css')
  return fs.readFile(cssPath, 'utf8')
}

async function renderHtml(
  templatePath: string,
  dataPath: string
): Promise<string> {
  const [templateSrc, dataSrc, tailwindCss] = await Promise.all([
    fs.readFile(templatePath, 'utf8'),
    fs.readFile(dataPath, 'utf8'),
    buildTailwindCss(),
  ])

  const data = JSON.parse(dataSrc) as Record<string, unknown>

  const template = Handlebars.compile(templateSrc)
  return template({ ...data, tailwindCss })
}

async function htmlToPdf(html: string, outputPdfPath: string) {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  // Load HTML into the page
  await page.setContent(html, { waitUntil: 'load' })

  // Generate PDF
  await page.pdf({
    path: outputPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      right: '0mm',
      bottom: '0mm',
      left: '0mm',
    },
  })

  await browser.close()
}

async function main() {
  const templatePath = path.join(
    process.cwd(),
    'src',
    'templates',
    'document.hbs'
  )
  const dataPath = path.join(process.cwd(), 'src', 'data', 'sample.json')
  const outputPdfPath = path.join(process.cwd(), 'out', 'document.pdf')

  // Ensure out/ exists
  await fs.mkdir(path.dirname(outputPdfPath), { recursive: true })

  const html = await renderHtml(templatePath, dataPath)
  await htmlToPdf(html, outputPdfPath)

  console.log(`✅ PDF generated: ${outputPdfPath}`)
}

main().catch((err) => {
  console.error('❌ Failed:', err)
  process.exit(1)
})
