#!/usr/bin/env node

const program = require('commander');

const packageJson = require('./package.json');

program
  .version(packageJson.version, '-v, --version')
  .usage('<lcov.info file path...>');

program.parse(process.argv);
