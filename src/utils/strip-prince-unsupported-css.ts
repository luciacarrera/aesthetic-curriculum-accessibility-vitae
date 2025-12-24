import fs from 'node:fs/promises';
import postcss from 'postcss';
import safeParser from 'postcss-safe-parser';

const INPUT = 'out/tailwind.css';
const OUTPUT = 'out/tailwind.prince.css';

// Remove rules that contain any of these selectors/pseudos
const BLOCKLIST = [
  ':host',
  '::backdrop',
  '::placeholder',
  ':after',
  ':before',
  'oaicite',
];

const shouldDropSelector = (selector: string): boolean =>
  BLOCKLIST.some((bad) => selector.includes(bad));

const cleanRule = (rule: postcss.Rule) => {
  const kept = [];
  const selectors = rule.selectors || [];

  for (const sel of selectors) {
    if (!shouldDropSelector(sel)) kept.push(sel);
  }

  if (selectors.length && kept.length === 0) {
    rule.remove();
  } else if (selectors.length && kept.length !== selectors.length) {
    rule.selectors = kept;
  }
};

export const stripPrinceUnsupportedCss = async () => {
  const css = await fs.readFile(INPUT, 'utf8');
  const root = postcss().process(css, { parser: safeParser }).root;

  root.walkRules((rule) => cleanRule(rule));

  await fs.writeFile(OUTPUT, root.toString(), 'utf8');
  console.log(`✅ CSS built: ${OUTPUT}`);
  return OUTPUT;
};
