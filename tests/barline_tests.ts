/**
 * VexFlow - Barline Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import Test from './vexflow_test_helpers';
import { IStaveNoteStruct } from '../src/types/note';
import { IFactoryParams } from '../src/types/factory';

declare const QUnit: any;
declare function ok(...args);

export const BarlineTests = (function() {
  return {
    Start: function() {
      const run = Test.runTests;

      QUnit.module('Barline');

      run('Simple BarNotes', function(options) {
        const vf = Test.makeFactory(options, 380, 160);
        const stave = vf.Stave();

        const notes = [
          vf.StaveNote(<IStaveNoteStruct>{ keys: ['d/4', 'e/4', 'f/4'], stem_direction: -1, duration: '2' }),
          vf.BarNote(<IFactoryParams>{ type: 'single' }),
          vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4', 'f/4', 'a/4'], stem_direction: -1, duration: '2' })
            .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: 'n' }))
            .addAccidental(1, vf.Accidental(<IFactoryParams>{ type: '#' })),
        ];

        const voice = vf.Voice().addTickables(notes);

        vf.Formatter()
          .joinVoices([voice])
          .formatToStave([voice], stave);

        vf.draw();

        ok(true, 'Simple Test');
      });
    },
  };
}());
