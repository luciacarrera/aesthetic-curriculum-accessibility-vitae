import fs from 'node:fs/promises';
import path from 'node:path';
import Handlebars from 'handlebars';
import { execFile } from 'node:child_process';

Handlebars.registerHelper('isArray', (value) => Array.isArray(value));

async function buildTailwindCss(): Promise<string> {
  // Assumes you ran `npm run build:css` first.
  const cssPath = path.join(process.cwd(), 'out', 'tailwind.prince.css');
  return fs.readFile(cssPath, 'utf8');
}

async function registerPartials() {
  const partialsDir = path.join(process.cwd(), 'src/templates/partials');
  const files = await fs.readdir(partialsDir);

  for (const file of files) {
    if (!file.endsWith('.hbs')) continue;

    const name = path.basename(file, '.hbs');
    const content = await fs.readFile(path.join(partialsDir, file), 'utf8');

    Handlebars.registerPartial(name, content);
  }
}

async function renderHtml(
  data: Record<string, unknown>,
  templateSrc: string,
  tailwindCss: string,
): Promise<string> {
  const template = Handlebars.compile(templateSrc);

  return template({ ...data, tailwindCss });
}

async function main() {
  const root = process.cwd();

  const templatePath = path.join(
    process.cwd(),
    'src',
    'templates',
    'document.hbs',
  );
  const dataPath = path.join(process.cwd(), 'src', 'data', 'sample.json');
  const outputPdfPath = path.join(process.cwd(), 'out', 'document.pdf');

  await registerPartials();

  const [templateSrc, dataSrc, tailwindCss] = await Promise.all([
    fs.readFile(templatePath, 'utf8'),
    fs.readFile(dataPath, 'utf8'),
    buildTailwindCss(),
  ]);
  const data = JSON.parse(dataSrc) as Record<string, unknown>;

  // Ensure out/ exists
  await fs.mkdir(path.dirname(outputPdfPath), { recursive: true });

  const html = await renderHtml(data, templateSrc, tailwindCss);

  // 5) Write HTML for Prince
  const outDir = path.join(root, 'out');
  await fs.mkdir(outDir, { recursive: true });

  const htmlPath = path.join(outDir, 'document-ua.html');
  await fs.writeFile(htmlPath, html, 'utf8');
  console.log(`✅ HTML generated: ${htmlPath}`);
}

main().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
