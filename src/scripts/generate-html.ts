import fs from 'node:fs/promises';
import path from 'node:path';
import Handlebars from 'handlebars';
import { stripPrinceUnsupportedCss } from '../utils/strip-prince-unsupported-css';
import { assertValidCvInformation } from '../utils/validate-json';
import { Theme } from '../utils/enums';

Handlebars.registerHelper('isArray', (value) => Array.isArray(value));
Handlebars.registerHelper('eq', (a, b) => a === b);

async function getJsonData(): Promise<Record<string, unknown>> {
  const args = process.argv.slice(2);
  const filename = args[0];
  if (!filename) {
    throw new Error(
      'JSON filename argument is required. Ex: npm run pdf -- sample',
    );
  }

  const dataPath = path.join(process.cwd(), 'src', 'data', `${filename}.json`);
  const dataSrc = await fs.readFile(dataPath, 'utf8').catch(() => {
    throw new Error(`Data file not found: ${dataPath}`);
  });
  const data = JSON.parse(dataSrc) as Record<string, unknown>;
  assertValidCvInformation(data);
  return data;
}

async function buildTailwindCss(): Promise<string> {
  const cleanTailwindCssPath = await stripPrinceUnsupportedCss();
  const cssPath = path.join(process.cwd(), cleanTailwindCssPath);
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

function announceTheme(theme?: Theme) {
  console.log(`🎨  Using theme: ${theme || 'default'}`);
}

async function renderHtml(
  data: Record<string, unknown>,
  tailwindCss: string,
): Promise<string> {
  const templatePath = path.join(
    process.cwd(),
    'src',
    'templates',
    'document.hbs',
  );
  const templateSrc = await fs.readFile(templatePath, 'utf8').catch(() => {
    throw new Error(`Template file not found: ${templatePath}`);
  });
  const template = Handlebars.compile(templateSrc);
  return template({ ...data, tailwindCss });
}

async function generateHtmlFile(html: string) {
  const outDir = path.join(process.cwd(), 'out');
  await fs.mkdir(outDir, { recursive: true });
  const htmlPath = path.join(outDir, 'document-ua.html');
  await fs.writeFile(htmlPath, html, 'utf8');
  console.log(`✅ HTML generated: ${htmlPath}`);
}

async function main() {
  const data = await getJsonData();
  console.log(data.layout);
  announceTheme(data.theme as Theme);
  const tailwindCss = await buildTailwindCss();
  await registerPartials();
  const html = await renderHtml(data, tailwindCss);
  await generateHtmlFile(html);
}

main().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
