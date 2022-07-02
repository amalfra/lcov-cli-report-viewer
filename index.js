#!/usr/bin/env node

import fs from 'fs';
import { createRequire } from 'module';
import { program } from 'commander';
import parse from 'lcov-parse';

import * as lib from './lib.js';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

program
  .version(packageJson.version, '-v, --version')
  .usage('<lcov.info file path...>')
  .option('-fp, --filter-path <char>')
  .option('-sfcf, --skip-full-covered-files');

program.parse(process.argv);

if (program.args.length < 1) {
  console.warn('A filepath must be provided');
  process.exit(1);
}

const filepath = program.args[0];
if (!fs.existsSync(filepath)) {
  console.warn('File does not exists in filepath provided');
  process.exit(1);
}

parse(filepath, (err, results) => {
  if (err) {
    console.error('Failed to parse lcov file');
    process.exit(1);
  }

  const options = program.opts();
  results.forEach(r => {
    const out = lib.generateReport(r, options);
    if (out) {
      console.log(out);
      console.log();
    }
  });
});
