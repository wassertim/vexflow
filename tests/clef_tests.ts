/**
 * VexFlow - Clef Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import Test from './vexflow_test_helpers';
import { IStaveNoteStruct } from '../src/types/note';
import { IFactoryParams } from '../src/types/factory';

declare const QUnit: any;
declare function ok(...args);

export const ClefTests = (function() {
  return {
    Start: function() {
      QUnit.module('Clef');
      Test.runTests('Clef Test', this.draw);
      Test.runTests('Clef End Test', this.drawEnd);
      Test.runTests('Small Clef Test', this.drawSmall);
      Test.runTests('Small Clef End Test', this.drawSmallEnd);
      Test.runTests('Clef Change Test', this.drawClefChange);
    },

    draw: function(options) {
      const vf = Test.makeFactory(options, 800, 120);

      vf.Stave()
        .addClef('treble')
        .addClef('treble', 'default', '8va')
        .addClef('treble', 'default', '8vb')
        .addClef('alto')
        .addClef('tenor')
        .addClef('soprano')
        .addClef('bass')
        .addClef('bass', 'default', '8vb')
        .addClef('mezzo-soprano')
        .addClef('baritone-c')
        .addClef('baritone-f')
        .addClef('subbass')
        .addClef('percussion')
        .addClef('french')
        .addEndClef('treble');

      vf.draw();

      ok(true, 'all pass');
    },

    drawEnd: function(options) {
      const vf = Test.makeFactory(options, 800, 120);

      vf.Stave()
        .addClef('bass')
        .addEndClef('treble')
        .addEndClef('treble', 'default', '8va')
        .addEndClef('treble', 'default', '8vb')
        .addEndClef('alto')
        .addEndClef('tenor')
        .addEndClef('soprano')
        .addEndClef('bass')
        .addEndClef('bass', 'default', '8vb')
        .addEndClef('mezzo-soprano')
        .addEndClef('baritone-c')
        .addEndClef('baritone-f')
        .addEndClef('subbass')
        .addEndClef('percussion')
        .addEndClef('french');

      vf.draw();

      ok(true, 'all pass');
    },

    drawSmall: function(options) {
      const vf = Test.makeFactory(options, 800, 120);

      vf.Stave()
        .addClef('treble', 'small')
        .addClef('treble', 'small', '8va')
        .addClef('treble', 'small', '8vb')
        .addClef('alto', 'small')
        .addClef('tenor', 'small')
        .addClef('soprano', 'small')
        .addClef('bass', 'small')
        .addClef('bass', 'small', '8vb')
        .addClef('mezzo-soprano', 'small')
        .addClef('baritone-c', 'small')
        .addClef('baritone-f', 'small')
        .addClef('subbass', 'small')
        .addClef('percussion', 'small')
        .addClef('french', 'small')
        .addEndClef('treble', 'small');

      vf.draw();

      ok(true, 'all pass');
    },

    drawSmallEnd: function(options) {
      const vf = Test.makeFactory(options, 800, 120);

      vf.Stave()
        .addClef('bass', 'small')
        .addEndClef('treble', 'small')
        .addEndClef('treble', 'small', '8va')
        .addEndClef('treble', 'small', '8vb')
        .addEndClef('alto', 'small')
        .addEndClef('tenor', 'small')
        .addEndClef('soprano', 'small')
        .addEndClef('bass', 'small')
        .addEndClef('bass', 'small', '8vb')
        .addEndClef('mezzo-soprano', 'small')
        .addEndClef('baritone-c', 'small')
        .addEndClef('baritone-f', 'small')
        .addEndClef('subbass', 'small')
        .addEndClef('percussion', 'small')
        .addEndClef('french', 'small');

      vf.draw();

      ok(true, 'all pass');
    },

    drawClefChange: function(options) {
      const vf = Test.makeFactory(options, 800, 180);
      const stave = vf.Stave().addClef('treble');

      const notes = [
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '4', clef: 'treble' }),
        vf.ClefNote(<IFactoryParams>{ type: 'alto', options: { size: 'small' } }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '4', clef: 'alto' }),
        vf.ClefNote(<IFactoryParams>{ type: 'tenor', options: { size: 'small' } }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '4', clef: 'tenor' }),
        vf.ClefNote(<IFactoryParams>{ type: 'soprano', options: { size: 'small' } }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '4', clef: 'soprano' }),
        vf.ClefNote(<IFactoryParams>{ type: 'bass', options: { size: 'small' } }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '4', clef: 'bass' }),
        vf.ClefNote(<IFactoryParams>{ type: 'mezzo-soprano', options: { size: 'small' } }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '4', clef: 'mezzo-soprano' }),
        vf.ClefNote(<IFactoryParams>{ type: 'baritone-c', options: { size: 'small' } }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '4', clef: 'baritone-c' }),
        vf.ClefNote(<IFactoryParams>{ type: 'baritone-f', options: { size: 'small' } }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '4', clef: 'baritone-f' }),
        vf.ClefNote(<IFactoryParams>{ type: 'subbass', options: { size: 'small' } }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '4', clef: 'subbass' }),
        vf.ClefNote(<IFactoryParams>{ type: 'french', options: { size: 'small' } }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '4', clef: 'french' }),
        vf.ClefNote(<IFactoryParams>{ type: 'treble', options: { size: 'small', annotation: '8vb' } }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '4', clef: 'treble', octave_shift: -1 }),
        vf.ClefNote(<IFactoryParams>{ type: 'treble', options: { size: 'small', annotation: '8va' } }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '4', clef: 'treble', octave_shift: 1 }),
      ];

      const voice = vf.Voice(<IFactoryParams>{ time: '12/4' }).addTickables(notes);

      vf.Formatter()
        .joinVoices([voice])
        .formatToStave([voice], stave);

      vf.draw();

      ok(true, 'all pass');
    },
  };
})();
