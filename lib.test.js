'use strict';

const assert = require('assert');
const { green, yellow, red, bold } = require('colorette');
const logSymbols = require('log-symbols');

const lib = require('./lib');

describe('lib', () => {
  describe('findPercentage()', () => {
    it('should generate 0 when both arguments are zero', () => {
      assert.strictEqual(lib._private.findPercentage(0, 0), 0);
    });

    it('should generate 0 when first argument is zero', () => {
      assert.strictEqual(lib._private.findPercentage(0, 12), 0);
    });

    it('should generate 0 when second argument is zero', () => {
      assert.strictEqual(lib._private.findPercentage(13, 0), 0);
    });

    it('should correct value when both arguments are non-zero', () => {
      assert.strictEqual(lib._private.findPercentage(50, 100), 50);
    });
  });

  describe('isGreen()', () => {
    it('should false when < 80', () => {
      assert.strictEqual(lib._private.isGreen(60), false);
    });

    it('should true when > 80', () => {
      assert.strictEqual(lib._private.isGreen(90), true);
    });
  });

  describe('isYellow()', () => {
    it('should false when < 30', () => {
      assert.strictEqual(lib._private.isYellow(24), false);
    });

    it('should true when > 30 and < 80', () => {
      assert.strictEqual(lib._private.isYellow(70), true);
    });

    it('should false when > 30 and > 80', () => {
      assert.strictEqual(lib._private.isYellow(90), false);
    });
  });

  describe('generatePercentageCoverage()', () => {
    it('should generate correct result when zero passed', () => {
      assert.strictEqual(lib._private.generatePercentageCoverage(0), '-');
    });

    it('should generate correct result is green', () => {
      assert.strictEqual(lib._private.generatePercentageCoverage(85), green('85%'));
    });

    it('should generate correct result is yellow', () => {
      assert.strictEqual(lib._private.generatePercentageCoverage(65), yellow('65%'));
    });

    it('should generate correct result is red', () => {
      assert.strictEqual(lib._private.generatePercentageCoverage(20), red('20%'));
    });
  });

  describe('generateFileReport()', () => {
    it('generates when only title given', () => {
      assert.strictEqual(lib._private.generateFileReport('testtitle', null, 20, 20, -1),
        `${logSymbols.error} ${bold('testtitle')}`);
    });

    it('generates when only file given', () => {
      assert.strictEqual(lib._private.generateFileReport(null, 'testfile', 20, 20, -1),
        `${logSymbols.error} ${bold('testfile')}`);
    });

    it('generates when both title and file given', () => {
      assert.strictEqual(lib._private.generateFileReport('testtitle', 'testfile', 20, 20, -1),
        `${logSymbols.error} ${bold('testtitle')}`);
    });

    it('generates success symbol when all green', () => {
      assert.strictEqual(lib._private.generateFileReport('testtitle', null, 85, 85, 90),
        `${logSymbols.success} ${bold('testtitle')}`);
    });

    it('generates error symbol when all red', () => {
      assert.strictEqual(lib._private.generateFileReport('testtitle', null, 20, 20, 20),
        `${logSymbols.error} ${bold('testtitle')}`);
    });

    it('generates error symbol when linesPercentageConverage is yellow', () => {
      assert.strictEqual(lib._private.generateFileReport('testtitle', null, 65, 85, 85),
        `${logSymbols.error} ${bold('testtitle')}`);
    });

    it('generates error symbol when functionsPercentageConverage is yellow', () => {
      assert.strictEqual(lib._private.generateFileReport('testtitle', null, 85, 65, 85),
        `${logSymbols.error} ${bold('testtitle')}`);
    });

    it('generates error symbol when branchesPercentageConverage is yellow', () => {
      assert.strictEqual(lib._private.generateFileReport('testtitle', null, 85, 85, 65),
        `${logSymbols.error} ${bold('testtitle')}`);
    });

    it('generates warning symbol when linesPercentageConverage and functionsPercentageConverage is yellow', () => {
      assert.strictEqual(lib._private.generateFileReport('testtitle', null, 65, 65, 65),
        `${logSymbols.warning} ${bold('testtitle')}`);
    });

    it('generates warning symbol when functionsPercentageConverage and branchesPercentageConverage is yellow', () => {
      assert.strictEqual(lib._private.generateFileReport('testtitle', null, 85, 65, 65),
        `${logSymbols.warning} ${bold('testtitle')}`);
    });

    it('generates warning symbol when linesPercentageConverage and branchesPercentageConverage is yellow', () => {
      assert.strictEqual(lib._private.generateFileReport('testtitle', null, 65, 85, 65),
        `${logSymbols.warning} ${bold('testtitle')}`);
    });

    it('generates warning symbol when linesPercentageConverage and functionsPercentageConverage is yellow', () => {
      assert.strictEqual(lib._private.generateFileReport('testtitle', null, 65, 65, 85),
        `${logSymbols.warning} ${bold('testtitle')}`);
    });
  });

  describe('generateFileContentReport()', () => {
    const rs = [
      {
        lines: {
          hit: 20,
          found: 100,
        },
        functions: {
          hit: 20,
          found: 100,
        },
        branches: {
          hit: 20,
          found: 100,
        },
      },
      {
        lines: {
          hit: 60,
          found: 100,
        },
        functions: {
          hit: 60,
          found: 100,
        },
        branches: {
          hit: 20,
          found: 100,
        },
      },
      {
        lines: {
          hit: 80,
          found: 100,
        },
        functions: {
          hit: 60,
          found: 100,
        },
        branches: {
          hit: 80,
          found: 100,
        },
      },
    ];
    const ps = [
      [10, 20, 60],
      [50, 60, 80],
      [60, 85, 85],
    ];

    rs.forEach((r, i) => {
      const percentages = ps[i];

      it(`should false when lines.hit = ${r.lines.hit}, functions.hit =
        ${r.functions.hit} & branches.hit = ${r.branches.hit}`, () => {
        const lineResult = [
          `> Lines:     ${r.lines.hit}/${r.lines.found} ${lib._private
            .generatePercentageCoverage(percentages[0])}`,
          `> Functions: ${r.functions.hit}/${r.functions.found} ${lib._private
            .generatePercentageCoverage(percentages[1])}`,
          `> Branches:  ${r.branches.hit}/${r.branches.found} ${lib._private
            .generatePercentageCoverage(percentages[2])}`,
        ];

        const respLines = lib._private.generateFileContentReport(r, ...percentages).split('\n');
        respLines.forEach((l, i) => {
          assert.strictEqual(l, lineResult[i]);
        });
      });
    });
  });
});
