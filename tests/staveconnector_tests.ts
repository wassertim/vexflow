/**
 * VexFlow - StaveConnector Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import Test from './vexflow_test_helpers';
import { SETTINGS } from '../src/flow';
import { Barline, Modifier, Stave, StaveConnector } from '../src';
import { IStaveConnectorTextOptions } from '../src/types/staveconnector';

declare const QUnit: any;
declare function ok(...args);

export const StaveConnectorTests = (function() {
  return {
    Start: function() {
      const runTests = Test.runTests;
      QUnit.module('StaveConnector');
      runTests('Single Draw Test', this.drawSingle);
      runTests('Single Draw Test, 1px Stave Line Thickness', this.drawSingle1pxBarlines);
      runTests('Single Both Sides Test', this.drawSingleBoth);
      runTests('Double Draw Test', this.drawDouble);
      runTests('Bold Double Line Left Draw Test', this.drawRepeatBegin);
      runTests('Bold Double Line Right Draw Test', this.drawRepeatEnd);
      runTests('Thin Double Line Right Draw Test', this.drawThinDouble);
      runTests('Bold Double Lines Overlapping Draw Test', this.drawRepeatAdjacent);
      runTests('Bold Double Lines Offset Draw Test', this.drawRepeatOffset);
      runTests('Bold Double Lines Offset Draw Test 2', this.drawRepeatOffset2);
      runTests('Brace Draw Test', this.drawBrace);
      runTests('Brace Wide Draw Test', this.drawBraceWide);
      runTests('Bracket Draw Test', this.drawBracket);
      runTests('Combined Draw Test', this.drawCombined);
    },

    drawSingle: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 400, 300);
      const stave = new Stave(25, 10, 300);
      const stave2 = new Stave(25, 120, 300);
      stave.setContext(ctx);
      stave2.setContext(ctx);
      const connector = new StaveConnector(stave, stave2);
      connector.setType(StaveConnector.type.SINGLE);
      connector.setContext(ctx);
      stave.draw();
      stave2.draw();
      connector.draw();

      ok(true, 'all pass');
    },

    drawSingle1pxBarlines: function(options, contextBuilder) {
      SETTINGS.STAVE_LINE_THICKNESS = 1;
      const ctx = new contextBuilder(options.elementId, 400, 300);
      const stave = new Stave(25, 10, 300);
      const stave2 = new Stave(25, 120, 300);
      stave.setContext(ctx);
      stave2.setContext(ctx);
      const connector = new StaveConnector(stave, stave2);
      connector.setType(StaveConnector.type.SINGLE);
      connector.setContext(ctx);
      stave.draw();
      stave2.draw();
      connector.draw();
      SETTINGS.STAVE_LINE_THICKNESS = 2;

      ok(true, 'all pass');
    },

    drawSingleBoth: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 400, 300);
      const stave = new Stave(25, 10, 300);
      const stave2 = new Stave(25, 120, 300);
      stave.setContext(ctx);
      stave2.setContext(ctx);
      const connector = new StaveConnector(stave, stave2);
      connector.setType(StaveConnector.type.SINGLE_LEFT);
      connector.setContext(ctx);
      const connector2 = new StaveConnector(stave, stave2);
      connector2.setType(StaveConnector.type.SINGLE_RIGHT);
      connector2.setContext(ctx);
      stave.draw();
      stave2.draw();
      connector.draw();
      connector2.draw();

      ok(true, 'all pass');
    },

    drawDouble: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 400, 300);
      const stave = new Stave(25, 10, 300);
      const stave2 = new Stave(25, 120, 300);
      stave.setContext(ctx);
      stave2.setContext(ctx);
      const connector = new StaveConnector(stave, stave2);
      const line = new StaveConnector(stave, stave2);
      connector.setType(StaveConnector.type.DOUBLE);
      connector.setContext(ctx);
      line.setType(StaveConnector.type.SINGLE);
      connector.setContext(ctx);
      line.setContext(ctx);
      stave.draw();
      stave2.draw();
      connector.draw();
      line.draw();

      ok(true, 'all pass');
    },

    drawBrace: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 450, 300);
      const stave = new Stave(100, 10, 300);
      const stave2 = new Stave(100, 120, 300);
      stave.setContext(ctx);
      stave2.setContext(ctx);
      const connector = new StaveConnector(stave, stave2);
      const line = new StaveConnector(stave, stave2);
      connector.setType(StaveConnector.type.BRACE);
      connector.setContext(ctx);
      connector.setText('Piano');
      line.setType(StaveConnector.type.SINGLE);
      connector.setContext(ctx);
      line.setContext(ctx);
      stave.draw();
      stave2.draw();
      connector.draw();
      line.draw();

      ok(true, 'all pass');
    },

    drawBraceWide: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 400, 300);
      const stave = new Stave(25, -20, 300);
      const stave2 = new Stave(25, 200, 300);
      stave.setContext(ctx);
      stave2.setContext(ctx);
      const connector = new StaveConnector(stave, stave2);
      const line = new StaveConnector(stave, stave2);
      connector.setType(StaveConnector.type.BRACE);
      connector.setContext(ctx);
      line.setType(StaveConnector.type.SINGLE);
      connector.setContext(ctx);
      line.setContext(ctx);
      stave.draw();
      stave2.draw();
      connector.draw();
      line.draw();

      ok(true, 'all pass');
    },

    drawBracket: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 400, 300);
      const stave = new Stave(25, 10, 300);
      const stave2 = new Stave(25, 120, 300);
      stave.setContext(ctx);
      stave2.setContext(ctx);
      const connector = new StaveConnector(stave, stave2);
      const line = new StaveConnector(stave, stave2);
      connector.setType(StaveConnector.type.BRACKET);
      connector.setContext(ctx);
      line.setType(StaveConnector.type.SINGLE);
      connector.setContext(ctx);
      line.setContext(ctx);
      stave.draw();
      stave2.draw();
      connector.draw();
      line.draw();

      ok(true, 'all pass');
    },

    drawRepeatBegin: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 400, 300);
      const stave = new Stave(25, 10, 300);
      const stave2 = new Stave(25, 120, 300);
      stave.setContext(ctx);
      stave2.setContext(ctx);
      stave.setBegBarType(Barline.type.REPEAT_BEGIN);
      stave2.setBegBarType(Barline.type.REPEAT_BEGIN);

      const line = new StaveConnector(stave, stave2);
      line.setType(StaveConnector.type.BOLD_DOUBLE_LEFT);
      line.setContext(ctx);
      stave.draw();
      stave2.draw();
      line.draw();

      ok(true, 'all pass');
    },

    drawRepeatEnd: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 400, 300);
      const stave = new Stave(25, 10, 300);
      const stave2 = new Stave(25, 120, 300);
      stave.setContext(ctx);
      stave2.setContext(ctx);
      stave.setEndBarType(Barline.type.REPEAT_END);
      stave2.setEndBarType(Barline.type.REPEAT_END);

      const line = new StaveConnector(stave, stave2);
      line.setType(StaveConnector.type.BOLD_DOUBLE_RIGHT);
      line.setContext(ctx);
      stave.draw();
      stave2.draw();
      line.draw();

      ok(true, 'all pass');
    },

    drawThinDouble: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 400, 300);
      const stave = new Stave(25, 10, 300);
      const stave2 = new Stave(25, 120, 300);
      stave.setContext(ctx);
      stave2.setContext(ctx);
      stave.setEndBarType(Barline.type.DOUBLE);
      stave2.setEndBarType(Barline.type.DOUBLE);

      const line = new StaveConnector(stave, stave2);
      line.setType(StaveConnector.type.THIN_DOUBLE);
      line.setContext(ctx);
      stave.draw();
      stave2.draw();
      line.draw();

      ok(true, 'all pass');
    },

    drawRepeatAdjacent: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 400, 300);
      const stave = new Stave(25, 10, 150);
      const stave2 = new Stave(25, 120, 150);
      const stave3 = new Stave(175, 10, 150);
      const stave4 = new Stave(175, 120, 150);
      stave.setContext(ctx);
      stave2.setContext(ctx);
      stave3.setContext(ctx);
      stave4.setContext(ctx);

      stave.setEndBarType(Barline.type.REPEAT_END);
      stave2.setEndBarType(Barline.type.REPEAT_END);
      stave3.setEndBarType(Barline.type.END);
      stave4.setEndBarType(Barline.type.END);

      stave.setBegBarType(Barline.type.REPEAT_BEGIN);
      stave2.setBegBarType(Barline.type.REPEAT_BEGIN);
      stave3.setBegBarType(Barline.type.REPEAT_BEGIN);
      stave4.setBegBarType(Barline.type.REPEAT_BEGIN);
      const connector = new StaveConnector(stave, stave2);
      const connector2 = new StaveConnector(stave, stave2);
      const connector3 = new StaveConnector(stave3, stave4);
      const connector4 = new StaveConnector(stave3, stave4);
      connector.setContext(ctx);
      connector2.setContext(ctx);
      connector3.setContext(ctx);
      connector4.setContext(ctx);
      connector.setType(StaveConnector.type.BOLD_DOUBLE_LEFT);
      connector2.setType(StaveConnector.type.BOLD_DOUBLE_RIGHT);
      connector3.setType(StaveConnector.type.BOLD_DOUBLE_LEFT);
      connector4.setType(StaveConnector.type.BOLD_DOUBLE_RIGHT);
      stave.draw();
      stave2.draw();
      stave3.draw();
      stave4.draw();
      connector.draw();
      connector2.draw();
      connector3.draw();
      connector4.draw();

      ok(true, 'all pass');
    },

    drawRepeatOffset2: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 400, 300);
      const stave = new Stave(25, 10, 150);
      const stave2 = new Stave(25, 120, 150);
      const stave3 = new Stave(175, 10, 150);
      const stave4 = new Stave(175, 120, 150);
      stave.setContext(ctx);
      stave2.setContext(ctx);
      stave3.setContext(ctx);
      stave4.setContext(ctx);

      stave.addClef('treble');
      stave2.addClef('bass');

      stave3.addClef('alto');
      stave4.addClef('treble');

      stave.addTimeSignature('4/4');
      stave2.addTimeSignature('4/4');

      stave3.addTimeSignature('6/8');
      stave4.addTimeSignature('6/8');

      stave.setEndBarType(Barline.type.REPEAT_END);
      stave2.setEndBarType(Barline.type.REPEAT_END);
      stave3.setEndBarType(Barline.type.END);
      stave4.setEndBarType(Barline.type.END);

      stave.setBegBarType(Barline.type.REPEAT_BEGIN);
      stave2.setBegBarType(Barline.type.REPEAT_BEGIN);
      stave3.setBegBarType(Barline.type.REPEAT_BEGIN);
      stave4.setBegBarType(Barline.type.REPEAT_BEGIN);
      const connector = new StaveConnector(stave, stave2);
      const connector2 = new StaveConnector(stave, stave2);
      const connector3 = new StaveConnector(stave3, stave4);
      const connector4 = new StaveConnector(stave3, stave4);
      const connector5 = new StaveConnector(stave3, stave4);

      connector.setContext(ctx);
      connector2.setContext(ctx);
      connector3.setContext(ctx);
      connector4.setContext(ctx);
      connector5.setContext(ctx);
      connector.setType(StaveConnector.type.BOLD_DOUBLE_LEFT);
      connector2.setType(StaveConnector.type.BOLD_DOUBLE_RIGHT);
      connector3.setType(StaveConnector.type.BOLD_DOUBLE_LEFT);
      connector4.setType(StaveConnector.type.BOLD_DOUBLE_RIGHT);
      connector5.setType(StaveConnector.type.SINGLE_LEFT);

      connector.setXShift(stave.getModifierXShift());
      connector3.setXShift(stave3.getModifierXShift());

      stave.draw();
      stave2.draw();
      stave3.draw();
      stave4.draw();
      connector.draw();
      connector2.draw();
      connector3.draw();
      connector4.draw();
      connector5.draw();

      ok(true, 'all pass');
    },

    drawRepeatOffset: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 400, 300);
      const stave = new Stave(25, 10, 150);
      const stave2 = new Stave(25, 120, 150);
      const stave3 = new Stave(185, 10, 150);
      const stave4 = new Stave(185, 120, 150);
      stave.setContext(ctx);
      stave2.setContext(ctx);
      stave3.setContext(ctx);
      stave4.setContext(ctx);

      stave.addClef('bass');
      stave2.addClef('alto');

      stave3.addClef('treble');
      stave4.addClef('tenor');

      stave3.addKeySignature('Ab');
      stave4.addKeySignature('Ab');

      stave.addTimeSignature('4/4');
      stave2.addTimeSignature('4/4');

      stave3.addTimeSignature('6/8');
      stave4.addTimeSignature('6/8');

      stave.setEndBarType(Barline.type.REPEAT_END);
      stave2.setEndBarType(Barline.type.REPEAT_END);
      stave3.setEndBarType(Barline.type.END);
      stave4.setEndBarType(Barline.type.END);

      stave.setBegBarType(Barline.type.REPEAT_BEGIN);
      stave2.setBegBarType(Barline.type.REPEAT_BEGIN);
      stave3.setBegBarType(Barline.type.REPEAT_BEGIN);
      stave4.setBegBarType(Barline.type.REPEAT_BEGIN);

      const connector = new StaveConnector(stave, stave2);
      const connector2 = new StaveConnector(stave, stave2);
      const connector3 = new StaveConnector(stave3, stave4);
      const connector4 = new StaveConnector(stave3, stave4);
      const connector5 = new StaveConnector(stave3, stave4);
      connector.setContext(ctx);
      connector2.setContext(ctx);
      connector3.setContext(ctx);
      connector4.setContext(ctx);
      connector5.setContext(ctx);
      connector.setType(StaveConnector.type.BOLD_DOUBLE_LEFT);
      connector2.setType(StaveConnector.type.BOLD_DOUBLE_RIGHT);
      connector3.setType(StaveConnector.type.BOLD_DOUBLE_LEFT);
      connector4.setType(StaveConnector.type.BOLD_DOUBLE_RIGHT);
      connector5.setType(StaveConnector.type.SINGLE_LEFT);

      connector.setXShift(stave.getModifierXShift());
      connector3.setXShift(stave3.getModifierXShift());

      stave.draw();
      stave2.draw();
      stave3.draw();
      stave4.draw();
      connector.draw();
      connector2.draw();
      connector3.draw();
      connector4.draw();
      connector5.draw();

      ok(true, 'all pass');
    },

    drawCombined: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 550, 700);
      const stave = new Stave(150, 10, 300);
      const stave2 = new Stave(150, 100, 300);
      const stave3 = new Stave(150, 190, 300);
      const stave4 = new Stave(150, 280, 300);
      const stave5 = new Stave(150, 370, 300);
      const stave6 = new Stave(150, 460, 300);
      const stave7 = new Stave(150, 560, 300);
      stave.setText('Violin', Modifier.Position.LEFT);
      stave.setContext(ctx);
      stave2.setContext(ctx);
      stave3.setContext(ctx);
      stave4.setContext(ctx);
      stave5.setContext(ctx);
      stave6.setContext(ctx);
      stave7.setContext(ctx);
      const conn_single = new StaveConnector(stave, stave7);
      const conn_double = new StaveConnector(stave2, stave3);
      const conn_bracket = new StaveConnector(stave4, stave7);
      const conn_none = new StaveConnector(stave4, stave5);
      const conn_brace = new StaveConnector(stave6, stave7);
      conn_single.setType(StaveConnector.type.SINGLE);
      conn_double.setType(StaveConnector.type.DOUBLE);
      conn_bracket.setType(StaveConnector.type.BRACKET);
      conn_brace.setType(StaveConnector.type.BRACE);
      conn_brace.setXShift(-5);
      conn_double.setText('Piano');
      conn_none.setText('Multiple', <IStaveConnectorTextOptions>{ shift_y: -15 });
      conn_none.setText('Line Text', <IStaveConnectorTextOptions>{ shift_y: 15 });
      conn_brace.setText('Harpsichord');
      conn_single.setContext(ctx);
      conn_double.setContext(ctx);
      conn_bracket.setContext(ctx);
      conn_none.setContext(ctx);
      conn_brace.setContext(ctx);
      stave.draw();
      stave2.draw();
      stave3.draw();
      stave4.draw();
      stave5.draw();
      stave6.draw();
      stave7.draw();
      conn_single.draw();
      conn_double.draw();
      conn_bracket.draw();
      conn_none.draw();
      conn_brace.draw();

      ok(true, 'all pass');
    },
  };
})();
