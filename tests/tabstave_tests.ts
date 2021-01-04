/**
 * VexFlow - TabStave Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import Test from './vexflow_test_helpers';
import { Barline, TabStave } from '../src';

declare const QUnit: any;
declare function ok(...args);
declare function equal(...args);

export const TabStaveTests = (function() {
  return {
    Start: function() {
      QUnit.module('TabStave');
      Test.runTests('TabStave Draw Test', this.draw);
      Test.runTests('Vertical Bar Test', this.drawVerticalBar);
    },

    draw: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 400, 160);
      const stave = new TabStave(10, 10, 300);
      stave.setNumLines(6);
      stave.setContext(ctx);
      stave.draw();

      equal(stave.getYForNote(0), 127, 'getYForNote(0)');
      equal(stave.getYForLine(5), 127, 'getYForLine(5)');
      equal(stave.getYForLine(0), 62, 'getYForLine(0) - Top Line');
      equal(stave.getYForLine(4), 114, 'getYForLine(4) - Bottom Line');

      ok(true, 'all pass');
    },

    drawVerticalBar: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 400, 160);
      const stave = new TabStave(10, 10, 300);
      stave.setNumLines(6);
      stave.setContext(ctx);
      stave.drawVerticalBar(50);
      stave.drawVerticalBar(100);
      stave.drawVerticalBar(150);
      stave.setEndBarType(Barline.type.END);
      stave.draw();

      ok(true, 'all pass');
    },
  };
})();
