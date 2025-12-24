import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';

function execFileAsync(cmd: string, args: string[]) {
  return new Promise<void>((resolve, reject) => {
    execFile(cmd, args, (err, stdout, stderr) => {
      if (stdout) process.stdout.write(stdout);
      if (stderr) process.stderr.write(stderr);
      if (err) reject(err);
      else resolve();
    });
  });
}

async function main() {
  const root = process.cwd();

  const dataPath = path.join(process.cwd(), 'src', 'data', 'sample.json');

  const dataSrc = await fs.readFile(dataPath, 'utf8');
  const data = JSON.parse(dataSrc) as Record<string, unknown>;

  const kebabName = (data['name'] as string)
    .toLowerCase()
    .replaceAll(/\s+/g, '-');

  const year = new Date().getFullYear();

  // Write HTML for Prince
  const outDir = path.join(root, 'out');
  await fs.mkdir(outDir, { recursive: true });

  const htmlPath = path.join(outDir, 'document-ua.html');
  const pdfPath = path.join(outDir, `${kebabName}-cv-ua-${year}.pdf`);

  // Generate PDF/UA-1 (Tagged PDF → StructTreeRoot)
  // Tagged PDF is automatically enabled with PDF/UA-1 profile. :contentReference[oaicite:1]{index=1}
  await execFileAsync('prince', [
    htmlPath,
    '-o',
    pdfPath,
    '--pdf-profile=PDF/UA-1',
    '--pdf-title',
    `${data['name']} CV ${year}`,
    '--pdf-author',
    data['name'] as string,
    '--pdf-keywords',
    'curriculum vitae, CV, résumé, accessible, PDF/UA',
    '--pdf-subject',
    'Curriculum Vitae in PDF/UA format',
  ]);
  console.log(root);
  console.log(`✅ PDF/UA generated: ${pdfPath}`);
}

main().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
