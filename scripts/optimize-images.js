import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const INPUT_DIR = path.join(process.cwd(), 'public', 'img');
const SOURCES = new Set(['.jpg', '.jpeg', '.png']);
const TARGETS = [
  { suffix: '-desktop', width: 1920 },
  { suffix: '-mobile', width: 1280 }
];
const FORMATS = [
  { format: 'webp', options: { quality: 78 } },
  { format: 'avif', options: { quality: 45 } }
];

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!SOURCES.has(ext)) return;

  const basename = path.basename(filePath, ext);

  for (const { suffix, width } of TARGETS) {
    for (const { format, options } of FORMATS) {
      const outputName = `${basename}${suffix}.${format}`;
      const outputPath = path.join(INPUT_DIR, outputName);

      try {
        await sharp(filePath)
          .resize({ width, withoutEnlargement: true })
          .toFormat(format, options)
          .toFile(outputPath);
        console.log(`✔️  ${outputName}`);
      } catch (error) {
        console.error(`❌ Error processing ${outputName}:`, error.message);
      }
    }
  }
}

async function run() {
  await ensureDir(INPUT_DIR);
  const entries = await fs.promises.readdir(INPUT_DIR);
  const jobs = entries.map((entry) => optimizeImage(path.join(INPUT_DIR, entry)));
  await Promise.all(jobs);
  console.log('Done.');
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
