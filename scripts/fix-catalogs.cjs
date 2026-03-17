/**
 * Converts lingui-compiled CommonJS catalog files to ESM format.
 * Run automatically via `postlingui:compile` npm hook.
 */
const fs = require('fs');

const locales = ['en', 'es'];

locales.forEach((locale) => {
  const path = `src/locales/${locale}/messages.js`;
  const raw = fs.readFileSync(path, 'utf8');
  const match = raw.match(/JSON\.parse\("([\s\S]*?)"\)/);
  if (!match) {
    console.error(`[fix-catalogs] No JSON.parse found in ${path}`);
    process.exit(1);
  }
  const esm = `/*eslint-disable*/\nconst messages = JSON.parse("${match[1]}");\nexport { messages };\n`;
  fs.writeFileSync(path, esm);
  console.log(`[fix-catalogs] ${path} converted to ESM`);
});
