'use strict';

const columnify = require('columnify');
const { red, green, yellow, bold } = require('colorette');
const logSymbols = require('log-symbols');
const { EOL } = require('os');

const findPercentage = (a, b) => Math.round((a / b) * 100);

const generatePercentageCoverage = (hit, found) => {
  if (found > 0) {
    const p = findPercentage(hit, found);
    if (p > 80) {
      return `${green(p)}%`;
    }
    if (p > 30) {
      return `${yellow(p)}%`;
    }
    return `${red(p)}%`;
  }
  return '-';
};

exports.generateReport = (r) => {
  let ret = bold(r.title || r.file) + EOL;

  const data = [
    {
      label: '> Lines:',
      covered: `${r.lines.hit}/${r.lines.found}`,
      percentage: generatePercentageCoverage(r.lines.hit, r.lines.found),
    },
    {
      label: '> Functions:',
      covered: `${r.functions.hit}/${r.functions.found}`,
      percentage: generatePercentageCoverage(r.functions.hit, r.functions.found),
    },
    {
      label: '> Branches:',
      covered: `${r.branches.hit}/${r.branches.found}`,
      percentage: generatePercentageCoverage(r.branches.hit, r.branches.found),
    },
  ];
  const columns = columnify(data, {
    showHeaders: false,
  });
  ret += columns;

  return ret;
};
