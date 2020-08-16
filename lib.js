'use strict';

const columnify = require('columnify');
const { red, green, yellow, bold } = require('colorette');
const logSymbols = require('log-symbols');
const { EOL } = require('os');

const findPercentage = (a, b) => Math.round((a / b) * 100);

const getPercentageCoverage =
  (hit, found) => found > 0 ? findPercentage(hit, found) : -1;

const isGreen = p => p > 80;

const isYellow = p => p > 30;

const generatePercentageCoverage = (p) => {
  if (p > 0) {
    if (isGreen(p)) {
      return `${green(p)}%`;
    }
    if (isYellow(p)) {
      return `${yellow(p)}%`;
    }
    return `${red(p)}%`;
  }
  return '-';
};

exports.generateReport = (r) => {
  const linesPercentageConverage = getPercentageCoverage(r.lines.hit, r.lines.found);
  const functionsPercentageConverage = getPercentageCoverage(r.functions.hit, r.functions.found);
  const branchesPercentageConverage = getPercentageCoverage(r.branches.hit, r.branches.found);

  const data = [
    {
      label: '> Lines:',
      covered: `${r.lines.hit}/${r.lines.found}`,
      percentage: generatePercentageCoverage(linesPercentageConverage),
    },
    {
      label: '> Functions:',
      covered: `${r.functions.hit}/${r.functions.found}`,
      percentage: generatePercentageCoverage(functionsPercentageConverage),
    },
    {
      label: '> Branches:',
      covered: `${r.branches.hit}/${r.branches.found}`,
      percentage: generatePercentageCoverage(branchesPercentageConverage),
    },
  ];
  const columns = columnify(data, {
    showHeaders: false,
  });

  let symbol = logSymbols.error;

  if (isGreen(linesPercentageConverage) && isGreen(functionsPercentageConverage) &&
    isGreen(branchesPercentageConverage)) {
    symbol = logSymbols.success;
  } else if ((linesPercentageConverage > 0 && isYellow(linesPercentageConverage) &&
    functionsPercentageConverage > 0 && isYellow(functionsPercentageConverage)) ||
    (functionsPercentageConverage > 0 && isYellow(functionsPercentageConverage) &&
    branchesPercentageConverage > 0 && isYellow(branchesPercentageConverage)) ||
    (functionsPercentageConverage > 0 && isYellow(functionsPercentageConverage) &&
    linesPercentageConverage > 0 && isYellow(linesPercentageConverage))) {
    symbol = logSymbols.warning;
  }

  return symbol + ' ' + bold(r.title || r.file) + EOL + columns;
};
