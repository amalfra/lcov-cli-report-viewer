#!/usr/bin/env node
'use strict';

const fs = require('fs');
const program = require('commander');
var parse = require('lcov-parse');

const packageJson = require('./package.json');
const lib = require('./lib');

program
  .version(packageJson.version, '-v, --version')
  .usage('<lcov.info file path...>');

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

  results.forEach(r => {
    console.log(lib.generateReport(r));
    console.log();
  });
});
