/**
 * VexFlow - Key Signature Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import { Barline, KeySignature, Stave, Vex } from '../src';
import Test from './vexflow_test_helpers';
import { IFactoryParams } from '../src/types/factory';
import { IStaveNoteStruct } from '../src/types/note';

declare const QUnit: any;
declare function ok(...args);
declare function test(...args);
declare function expect(...args);
declare function equal(...args);

export const KeySignatureTests = (function() {
  function catchError(spec) {
    try {
      Vex.Flow.keySignature(spec);
    } catch (e) {
      equal(e.code, 'BadKeySignature', e.message);
    }
  }

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
      QUnit.module('KeySignature');
      test('Key Parser Test', this.parser.bind(this));
      Test.runTests('Major Key Test', this.majorKeys.bind(this));
      Test.runTests('Minor Key Test', this.minorKeys.bind(this));
      Test.runTests('Stave Helper', this.staveHelper.bind(this));
      Test.runTests('Cancelled key test', this.majorKeysCanceled.bind(this));
      Test.runTests('Cancelled key (for each clef) test', this.keysCanceledForEachClef.bind(this));
      Test.runTests('Altered key test', this.majorKeysAltered.bind(this));
      Test.runTests('End key with clef test', this.endKeyWithClef.bind(this));
      Test.runTests('Key Signature Change test', this.changeKey.bind(this));
    },

    parser: function() {
      expect(11);
      catchError('asdf');
      catchError('D!');
      catchError('E#');
      catchError('D#');
      catchError('#');
      catchError('b');
      catchError('Kb');
      catchError('Fb');
      catchError('Ab');
      catchError('Dbm');
      catchError('B#m');

      Vex.Flow.keySignature('B');
      Vex.Flow.keySignature('C');
      Vex.Flow.keySignature('Fm');
      Vex.Flow.keySignature('Ab');
      Vex.Flow.keySignature('Abm');
      Vex.Flow.keySignature('F#');
      Vex.Flow.keySignature('G#m');

      ok(true, 'all pass');
    },

    majorKeys: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 400, 240);
      const stave = new Stave(10, 10, 350);
      const stave2 = new Stave(10, 90, 350);
      const keys = this.MAJOR_KEYS;

      let keySig = null;
      for (let i = 0; i < 8; ++i) {
        keySig = new KeySignature(keys[i]);
        keySig.addToStave(stave);
      }

      for (let n = 8; n < keys.length; ++n) {
        keySig = new KeySignature(keys[n]);
        keySig.addToStave(stave2);
      }

      stave.setContext(ctx);
      stave.draw();
      stave2.setContext(ctx);
      stave2.draw();

      ok(true, 'all pass');
    },

    majorKeysCanceled: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 780, 500);
      ctx.scale(0.9, 0.9);
      const stave = new Stave(10, 10, 750).addTrebleGlyph();
      const stave2 = new Stave(10, 90, 750).addTrebleGlyph();
      const stave3 = new Stave(10, 170, 750).addTrebleGlyph();
      const stave4 = new Stave(10, 250, 750).addTrebleGlyph();
      const keys = this.MAJOR_KEYS;

      let keySig = null;
      let i;
      let n;
      for (i = 0; i < 8; ++i) {
        keySig = new KeySignature(keys[i]);
        keySig.cancelKey('Cb');

        keySig.padding = 18;
        keySig.addToStave(stave);
      }

      for (n = 8; n < keys.length; ++n) {
        keySig = new KeySignature(keys[n]);
        keySig.cancelKey('C#');
        keySig.padding = 20;
        keySig.addToStave(stave2);
      }

      for (i = 0; i < 8; ++i) {
        keySig = new KeySignature(keys[i]);
        keySig.cancelKey('E');

        keySig.padding = 18;
        keySig.addToStave(stave3);
      }

      for (n = 8; n < keys.length; ++n) {
        keySig = new KeySignature(keys[n]);
        keySig.cancelKey('Ab');
        keySig.padding = 20;
        keySig.addToStave(stave4);
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

    keysCanceledForEachClef: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 600, 380);
      ctx.scale(0.8, 0.8);
      const keys = [
        'C#',
        'Cb'
      ];

      const x = 20;
      let y = 20;
      let tx = x;
      ['bass', 'tenor', 'soprano', 'mezzo-soprano', 'baritone-f'].forEach(function(clef) {
        keys.forEach(function(key) {
          const cancelKey = key === keys[0] ? keys[1] : keys[0];
          const vStave = new Vex.Flow.Stave(tx, y, 350);
          vStave.setClef(clef);
          vStave.addKeySignature(cancelKey);
          vStave.addKeySignature(key, cancelKey);
          vStave.addKeySignature(key);
          vStave.setContext(ctx).draw();
          tx += 350;
        });
        tx = x;
        y += 80;
      });

      ok(true, 'all pass');
    },

    majorKeysAltered: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 780, 500);
      ctx.scale(0.9, 0.9);
      const stave = new Stave(10, 10, 750).addTrebleGlyph();
      const stave2 = new Stave(10, 90, 750).addTrebleGlyph();
      const stave3 = new Stave(10, 170, 750).addTrebleGlyph();
      const stave4 = new Stave(10, 250, 750).addTrebleGlyph();
      const keys = this.MAJOR_KEYS;

      let keySig = null;
      let i;
      let n;
      for (i = 0; i < 8; ++i) {
        keySig = new KeySignature(keys[i]);
        keySig.alterKey(['bs', 'bs']);
        keySig.padding = 18;
        keySig.addToStave(stave);
      }

      for (n = 8; n < keys.length; ++n) {
        keySig = new KeySignature(keys[n]);
        keySig.alterKey(['+', '+', '+']);
        keySig.padding = 20;
        keySig.addToStave(stave2);
      }

      for (i = 0; i < 8; ++i) {
        keySig = new KeySignature(keys[i]);
        keySig.alterKey(['n', 'bs', 'bb']);
        keySig.padding = 18;
        keySig.addToStave(stave3);
      }

      for (n = 8; n < keys.length; ++n) {
        keySig = new KeySignature(keys[n]);
        keySig.alterKey(['++', '+', 'n', '+']);
        keySig.padding = 20;
        keySig.addToStave(stave4);
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

    minorKeys: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 400, 240);
      const stave = new Stave(10, 10, 350);
      const stave2 = new Stave(10, 90, 350);
      const keys = this.MINOR_KEYS;

      let keySig = null;
      for (let i = 0; i < 8; ++i) {
        keySig = new KeySignature(keys[i]);
        keySig.addToStave(stave);
      }

      for (let n = 8; n < keys.length; ++n) {
        keySig = new KeySignature(keys[n]);
        keySig.addToStave(stave2);
      }

      stave.setContext(ctx);
      stave.draw();
      stave2.setContext(ctx);
      stave2.draw();

      ok(true, 'all pass');
    },
    endKeyWithClef: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 400, 200);
      ctx.scale(0.9, 0.9);
      const stave1 = new Stave(10, 10, 350);
      stave1.setKeySignature('G')
        .setBegBarType(Barline.type.REPEAT_BEGIN)
        .setEndBarType(Barline.type.REPEAT_END)
        .setClef('treble')
        .addTimeSignature('4/4')
        .setEndClef('bass')
        .setEndKeySignature('Cb');
      const stave2 = new Stave(10, 90, 350);
      stave2.setKeySignature('Cb')
        .setClef('bass')
        .setEndClef('treble')
        .setEndKeySignature('G');

      stave1.setContext(ctx).draw();
      stave2.setContext(ctx).draw();
      ok(true, 'all pass');
    },

    staveHelper: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 400, 240);
      const stave = new Stave(10, 10, 350);
      const stave2 = new Stave(10, 90, 350);
      const keys = this.MAJOR_KEYS;

      for (let i = 0; i < 8; ++i) {
        stave.addKeySignature(keys[i]);
      }

      for (let n = 8; n < keys.length; ++n) {
        stave2.addKeySignature(keys[n]);
      }

      stave.setContext(ctx);
      stave.draw();
      stave2.setContext(ctx);
      stave2.draw();

      ok(true, 'all pass');
    },

    changeKey: function(options) {
      const vf = Test.makeFactory(options, 900);

      const stave = vf.Stave(<IFactoryParams>{ x: 10, y: 10, width: 800 })
        .addClef('treble')
        .addTimeSignature('C|');

      const voice = vf.Voice().setStrict(false).addTickables([
        vf.KeySigNote(<IFactoryParams>{ key: 'Bb' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '1' }),
        vf.BarNote(),
        vf.KeySigNote(<IFactoryParams>{ key: 'D', cancelKey: 'Bb' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '1' }),
        vf.BarNote(),
        vf.KeySigNote(<IFactoryParams>{ key: 'Bb' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '1' }),
        vf.BarNote(),
        vf.KeySigNote(<IFactoryParams>{ key: 'D', alterKey: ['b', 'n'] }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '1' }),
      ]);

      vf.Formatter()
        .joinVoices([voice])
        .formatToStave([voice], stave);

      vf.draw();

      ok(true, 'all pass');
    }
  };
}());
