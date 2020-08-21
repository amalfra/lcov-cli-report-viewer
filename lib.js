'use strict';

const columnify = require('columnify');
const { red, green, yellow, bold } = require('colorette');
const logSymbols = require('log-symbols');
const { EOL } = require('os');

const findPercentage = (a, b) => b > 0 ? Math.round((a / b) * 100) : 0;

const getPercentageCoverage =
  (hit, found) => found > 0 ? findPercentage(hit, found) : -1;

const isGreen = p => p > 80;

const isYellow = p => !isGreen(p) && p > 30;

const generatePercentageCoverage = (p) => {
  if (p > 0) {
    if (isGreen(p)) {
      return green(`${p}%`);
    }
    if (isYellow(p)) {
      return yellow(`${p}%`);
    }
    return red(`${p}%`);
  }
  return '-';
};

const generateFileReport = (title, file, linesPercentageConverage,
  functionsPercentageConverage, branchesPercentageConverage) => {
  let symbol = logSymbols.error;

  if (isGreen(linesPercentageConverage) && isGreen(functionsPercentageConverage) &&
    isGreen(branchesPercentageConverage)) {
    symbol = logSymbols.success;
  } else if ((linesPercentageConverage > 0 && isYellow(linesPercentageConverage) &&
    functionsPercentageConverage > 0 && isYellow(functionsPercentageConverage)) ||
    (functionsPercentageConverage > 0 && isYellow(functionsPercentageConverage) &&
    branchesPercentageConverage > 0 && isYellow(branchesPercentageConverage)) ||
    (functionsPercentageConverage > 0 && isYellow(functionsPercentageConverage) &&
    linesPercentageConverage > 0 && isYellow(linesPercentageConverage)) ||
    (linesPercentageConverage > 0 && isYellow(linesPercentageConverage) &&
    branchesPercentageConverage > 0 && isYellow(branchesPercentageConverage))) {
    symbol = logSymbols.warning;
  }

  return symbol + ' ' + bold(title || file);
};

const generateFileContentReport = (r, linesPercentageConverage,
  functionsPercentageConverage, branchesPercentageConverage) => {
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

  return columnify(data, {
    showHeaders: false,
  });
};

exports.generateReport = (r) => {
  const linesPercentageConverage = getPercentageCoverage(r.lines.hit, r.lines.found);
  const functionsPercentageConverage = getPercentageCoverage(r.functions.hit, r.functions.found);
  const branchesPercentageConverage = getPercentageCoverage(r.branches.hit, r.branches.found);

  return generateFileReport(r.title, r.file, linesPercentageConverage,
    functionsPercentageConverage, branchesPercentageConverage) + EOL +
    generateFileContentReport(r, linesPercentageConverage, functionsPercentageConverage,
      branchesPercentageConverage);
};

exports._private = {
  findPercentage,
  isGreen,
  isYellow,
  generatePercentageCoverage,
  generateFileReport,
  generateFileContentReport,
};
