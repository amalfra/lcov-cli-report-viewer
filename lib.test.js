'use strict';

const assert = require('assert');

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
});
