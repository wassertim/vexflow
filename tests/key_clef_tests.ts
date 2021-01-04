/**
 * VexFlow - Clef-Key Signature Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import Test from './vexflow_test_helpers';
import { KeySignature, Stave, Vex } from '../src';

declare const QUnit: any;
declare function ok(...args);
declare function expect(...args);
declare function equal(...args);

export const ClefKeySignatureTests = (function() {
  return {
    MAJOR_KEYS: [
      'C',
      'F',
      'Bb',
      'Eb',
      'Ab',
      'Db',
      'Gb',
      'Cb',
      'G',
      'D',
      'A',
      'E',
      'B',
      'F#',
      'C#',
    ],

    MINOR_KEYS: [
      'Am',
      'Dm',
      'Gm',
      'Cm',
      'Fm',
      'Bbm',
      'Ebm',
      'Abm',
      'Em',
      'Bm',
      'F#m',
      'C#m',
      'G#m',
      'D#m',
      'A#m',
    ],

    Start: function() {
      QUnit.module('Clef Keys');
      QUnit.test('Key Parser Test', this.parser.bind(this));
      Test.runTests('Major Key Clef Test', this.keys.bind(this), { majorKeys: true });
      Test.runTests('Minor Key Clef Test', this.keys.bind(this), { majorKeys: false });
      Test.runTests('Stave Helper', this.staveHelper.bind(this));
    },

    catchError: function(spec) {
      try {
        Vex.Flow.keySignature(spec);
      } catch (e) {
        equal(e.code, 'BadKeySignature', e.message);
      }
    },

    parser: function() {
      expect(11);
      this.catchError('asdf');
      this.catchError('D!');
      this.catchError('E#');
      this.catchError('D#');
      this.catchError('#');
      this.catchError('b');
      this.catchError('Kb');
      this.catchError('Fb');
      this.catchError('Ab');
      this.catchError('Dbm');
      this.catchError('B#m');

      Vex.Flow.keySignature('B');
      Vex.Flow.keySignature('C');
      Vex.Flow.keySignature('Fm');
      Vex.Flow.keySignature('Ab');
      Vex.Flow.keySignature('Abm');
      Vex.Flow.keySignature('F#');
      Vex.Flow.keySignature('G#m');

      ok(true, 'all pass');
    },

    keys: function(options, contextBuilder) {
      const clefs = [
        'treble',
        'soprano',
        'mezzo-soprano',
        'alto',
        'tenor',
        'baritone-f',
        'baritone-c',
        'bass',
        'french',
        'subbass',
        'percussion',
      ];

      const ctx = new contextBuilder(options.elementId, 400, 20 + 80 * 2 * clefs.length);
      const staves = [];
      const keys = (options.params.majorKeys)
        ? this.MAJOR_KEYS
        : this.MINOR_KEYS;

      let i;
      let flat;
      let sharp;
      let keySig;

      const yOffsetForFlatStaves = 10 + 80 * clefs.length;
      for (i = 0; i < clefs.length; i++) {
        // Render all the sharps first, then all the flats:
        staves[i] = new Stave(10, 10 + 80 * i, 390);
        staves[i].addClef(clefs[i]);
        staves[i + clefs.length] = new Stave(10, yOffsetForFlatStaves + 10 + 80 * i, 390);
        staves[i + clefs.length].addClef(clefs[i]);

        for (flat = 0; flat < 8; flat++) {
          keySig = new KeySignature(keys[flat]);
          keySig.addToStave(staves[i]);
        }

        for (sharp = 8; sharp < keys.length; sharp++) {
          keySig = new KeySignature(keys[sharp]);
          keySig.addToStave(staves[i + clefs.length]);
        }

        staves[i].setContext(ctx);
        staves[i].draw();
        staves[i + clefs.length].setContext(ctx);
        staves[i + clefs.length].draw();
      }

      ok(true, 'all pass');
    },

    staveHelper: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 400, 400);
      const stave = new Stave(10, 10, 370);
      const stave2 = new Stave(10, 90, 370);
      const stave3 = new Stave(10, 170, 370);
      const stave4 = new Stave(10, 260, 370);
      const keys = this.MAJOR_KEYS;

      stave.addClef('treble');
      stave2.addClef('bass');
      stave3.addClef('alto');
      stave4.addClef('tenor');

      for (let n = 0; n < 8; ++n) {
        stave.addKeySignature(keys[n]);
        stave2.addKeySignature(keys[n]);
      }

      for (let i = 8; i < keys.length; ++i) {
        stave3.addKeySignature(keys[i]);
        stave4.addKeySignature(keys[i]);
      }

      stave.setContext(ctx);
      stave.draw();
      stave2.setContext(ctx);
      stave2.draw();
      stave3.setContext(ctx);
      stave3.draw();
      stave4.setContext(ctx);
      stave4.draw();

      ok(true, 'all pass');
    },
  };
}());
