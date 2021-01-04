/**
 * VexFlow - Tuplet Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import { IFactoryParams } from '../src/types/factory';
import { IStaveOptions } from '../src/types/stave';
import { Formatter, Stem, Tuplet, Note, Factory } from '../src';
import Test from './vexflow_test_helpers';

declare const QUnit: any;
declare function ok(...args);

export const TupletTests = (function() {
  // Ideally this would be using arrow syntax...
  const set = function(key) {
    return function(value) {
      return function(object) {
        object[key] = value;
        return object;
      };
    };
  };

  const setStemDirection = set('stem_direction');
  const setDuration = set('duration');

  const stemUp = setStemDirection(Stem.UP);
  const stemDown = setStemDirection(Stem.DOWN);
  const quarterNote = setDuration('4');

  return {
    Start: function() {
      const runTests = Test.runTests;
      QUnit.module('Tuplet');
      runTests('Simple Tuplet', this.simple);
      runTests('Beamed Tuplet', this.beamed);
      runTests('Ratioed Tuplet', this.ratio);
      runTests('Bottom Tuplet', this.bottom);
      runTests('Bottom Ratioed Tuplet', this.bottom_ratio);
      runTests('Awkward Tuplet', this.awkward);
      runTests('Complex Tuplet', this.complex);
      runTests('Mixed Stem Direction Tuplet', this.mixedTop);
      runTests('Mixed Stem Direction Bottom Tuplet', this.mixedBottom);
      runTests('Nested Tuplets', this.nested);
      runTests('Single Tuplets', this.single);
    },

    simple: function(options) {
      const vf = Test.makeFactory(options);
      const stave = vf.Stave(<IFactoryParams>{ x: 10, y: 10, width: 350 }).addTimeSignature('3/4');

      const notes: Note[] = [
        { keys: ['g/4'], duration: '4' },
        { keys: ['a/4'], duration: '4' },
        { keys: ['b/4'], duration: '4' },
        { keys: ['b/4'], duration: '8' },
        { keys: ['a/4'], duration: '8' },
        { keys: ['g/4'], duration: '8' },
      ].map(stemUp).map(vf.StaveNote.bind(vf));

      vf.Tuplet(<IFactoryParams>{ notes: notes.slice(0, 3) });
      vf.Tuplet(<IFactoryParams>{ notes: notes.slice(3, 6) });

      // 3/4 time
      const voice = vf.Voice(<IFactoryParams>{ time: { num_beats: 3, beat_value: 4 } })
        .setStrict(true)
        .addTickables(notes);

      new Formatter()
        .joinVoices([voice])
        .formatToStave([voice], stave);

      vf.draw();

      ok(true, 'Simple Test');
    },

    beamed: function(options) {
      const vf = Test.makeFactory(options);
      const stave = vf.Stave(<IFactoryParams>{ x: 10, y: 10, width: 350 }).addTimeSignature('3/8');

      const notes: Note[] = [
        { keys: ['b/4'], duration: '16' },
        { keys: ['a/4'], duration: '16' },
        { keys: ['g/4'], duration: '16' },
        { keys: ['a/4'], duration: '8' },
        { keys: ['f/4'], duration: '8' },
        { keys: ['a/4'], duration: '8' },
        { keys: ['f/4'], duration: '8' },
        { keys: ['a/4'], duration: '8' },
        { keys: ['f/4'], duration: '8' },
        { keys: ['g/4'], duration: '8' },
      ].map(stemUp).map(vf.StaveNote.bind(vf));

      vf.Beam(<IFactoryParams>{ notes: notes.slice(0, 3) });
      vf.Beam(<IFactoryParams>{ notes: notes.slice(3, 10) });
      vf.Tuplet(<IFactoryParams>{ notes: notes.slice(0, 3) });
      vf.Tuplet(<IFactoryParams>{ notes: notes.slice(3, 10) });

      // 3/8 time
      const voice = vf.Voice(<IFactoryParams>{ time: { num_beats: 3, beat_value: 8 } })
        .setStrict(true)
        .addTickables(notes);

      new Formatter()
        .joinVoices([voice])
        .formatToStave([voice], stave);

      vf.draw();

      ok(true, 'Beamed Test');
    },

    ratio: function(options) {
      const vf = Test.makeFactory(options);
      const stave = vf.Stave(<IFactoryParams>{ x: 10, y: 10, width: 350 }).addTimeSignature('4/4');

      const notes: Note[] = [
        { keys: ['f/4'], duration: '4' },
        { keys: ['a/4'], duration: '4' },
        { keys: ['b/4'], duration: '4' },
        { keys: ['g/4'], duration: '8' },
        { keys: ['e/4'], duration: '8' },
        { keys: ['g/4'], duration: '8' },
      ].map(stemUp).map(vf.StaveNote.bind(vf));

      vf.Beam(<IFactoryParams>{
        notes: notes.slice(3, 6),
      });

      vf.Tuplet(<IFactoryParams>{
        notes: notes.slice(0, 3),
        options: {
          ratioed: true,
        },
      });

      vf.Tuplet(<IFactoryParams>{
        notes: notes.slice(3, 6),
        options: {
          ratioed: true,
          notes_occupied: 4,
        },
      });

      const voice = vf.Voice()
        .setStrict(true)
        .addTickables(notes);

      new Formatter()
        .joinVoices([voice])
        .formatToStave([voice], stave);

      vf.draw();

      ok(true, 'Ratioed Test');
    },

    bottom: function(options) {
      const vf = Test.makeFactory(options, 350, 160);
      const stave = vf.Stave(<IFactoryParams>{ x: 10, y: 10 }).addTimeSignature('3/4');

      const notes: Note[] = [
        { keys: ['f/4'], duration: '4' },
        { keys: ['c/4'], duration: '4' },
        { keys: ['g/4'], duration: '4' },
        { keys: ['d/5'], duration: '8' },
        { keys: ['g/3'], duration: '8' },
        { keys: ['b/4'], duration: '8' },
      ].map(stemDown).map(vf.StaveNote.bind(vf));

      vf.Beam(<IFactoryParams>{
        notes: notes.slice(3, 6),
      });

      vf.Tuplet(<IFactoryParams>{
        notes: notes.slice(0, 3),
        options: { location: Tuplet.LOCATION_BOTTOM },
      });

      vf.Tuplet(<IFactoryParams>{
        notes: notes.slice(3, 6),
        options: { location: Tuplet.LOCATION_BOTTOM },
      });

      const voice = vf.Voice(<IFactoryParams>{ time: { num_beats: 3, beat_value: 4 } })
        .setStrict(true)
        .addTickables(notes);

      new Formatter()
        .joinVoices([voice])
        .formatToStave([voice], stave);

      vf.draw();

      ok(true, 'Bottom Test');
    },

    bottom_ratio: function(options) {
      const vf = Test.makeFactory(options, 350, 160);
      const stave = vf.Stave(<IFactoryParams>{ x: 10, y: 10 }).addTimeSignature('5/8');

      const notes: Note[] = [
        { keys: ['f/4'], duration: '4' },
        { keys: ['c/4'], duration: '4' },
        { keys: ['d/4'], duration: '4' },
        { keys: ['d/5'], duration: '8' },
        { keys: ['g/5'], duration: '8' },
        { keys: ['b/4'], duration: '8' },
      ].map(stemDown).map(vf.StaveNote.bind(vf));

      vf.Beam(<IFactoryParams>{
        notes: notes.slice(3, 6),
      });

      vf.Tuplet(<IFactoryParams>{
        notes: notes.slice(0, 3),
        options: {
          location: Tuplet.LOCATION_BOTTOM,
          ratioed: true,
        },
      });

      vf.Tuplet(<IFactoryParams>{
        notes: notes.slice(3, 6),
        options: {
          location: Tuplet.LOCATION_BOTTOM,
          notes_occupied: 1,
        },
      });

      const voice = vf.Voice(<IFactoryParams>{ time: { num_beats: 5, beat_value: 8 } })
        .setStrict(true)
        .addTickables(notes);

      new Formatter()
        .joinVoices([voice])
        .formatToStave([voice], stave);

      vf.draw();

      ok(true, 'Bottom Ratioed Test');
    },

    awkward: function(options) {
      const vf = Test.makeFactory(options, 370, 160);
      const stave = vf.Stave(<IFactoryParams>{ x: 10, y: 10 });

      const notes: Note[] = [
        { keys: ['g/4'], duration: '16' },
        { keys: ['b/4'], duration: '16' },
        { keys: ['a/4'], duration: '16' },
        { keys: ['a/4'], duration: '16' },
        { keys: ['g/4'], duration: '16' },
        { keys: ['f/4'], duration: '16' },
        { keys: ['e/4'], duration: '16' },
        { keys: ['c/4'], duration: '16' },
        { keys: ['g/4'], duration: '16' },
        { keys: ['a/4'], duration: '16' },
        { keys: ['f/4'], duration: '16' },
        { keys: ['e/4'], duration: '16' },
        { keys: ['c/4'], duration: '8' },
        { keys: ['d/4'], duration: '8' },
        { keys: ['e/4'], duration: '8' },
      ].map(stemUp).map(vf.StaveNote.bind(vf));

      vf.Beam(<IFactoryParams>{ notes: notes.slice(0, 12) });
      vf.Tuplet(<IFactoryParams>{
        notes: notes.slice(0, 12),
        options: {
          notes_occupied: 142,
          ratioed: true,
        },
      });

      vf.Tuplet(<IFactoryParams>{
        notes: notes.slice(12, 15),
        options: {
          ratioed: true,
        },
      }).setBracketed(true);

      const voice = vf.Voice()
        .setStrict(false)
        .addTickables(notes);

      new Formatter()
        .joinVoices([voice])
        .formatToStave([voice], stave);

      vf.draw();

      ok(true, 'Awkward Test');
    },

    complex: function(options) {
      const vf: Factory = Test.makeFactory(options, 600);
      const stave = vf.Stave({ x: 10, y: 10 } as IFactoryParams).addTimeSignature('4/4');

      const notes1: Note[] = [
        { keys: ['b/4'], duration: '8d' },
        { keys: ['a/4'], duration: '16' },
        { keys: ['g/4'], duration: '8' },
        { keys: ['a/4'], duration: '16' },
        { keys: ['b/4'], duration: '16r' },
        { keys: ['g/4'], duration: '32' },
        { keys: ['f/4'], duration: '32' },
        { keys: ['g/4'], duration: '32' },
        { keys: ['f/4'], duration: '32' },
        { keys: ['a/4'], duration: '16' },
        { keys: ['f/4'], duration: '8' },
        { keys: ['b/4'], duration: '8' },
        { keys: ['a/4'], duration: '8' },
        { keys: ['g/4'], duration: '8' },
        { keys: ['b/4'], duration: '8' },
        { keys: ['a/4'], duration: '8' },
      ].map(stemUp).map(vf.StaveNote.bind(vf));

      (notes1[0] as any).addDotToAll();

      const notes2: Note[] = [
        { keys: ['c/4'] },
        { keys: ['c/4'] },
        { keys: ['c/4'] },
        { keys: ['c/4'] },
      ].map(quarterNote).map(stemDown).map(vf.StaveNote.bind(vf));

      vf.Beam({ notes: notes1.slice(0, 3) } as IFactoryParams);
      vf.Beam({ notes: notes1.slice(5, 9) } as IFactoryParams);
      vf.Beam({ notes: notes1.slice(11, 16) } as IFactoryParams);

      vf.Tuplet({
        notes: notes1.slice(0, 3),
      } as IFactoryParams);

      vf.Tuplet({
        notes: notes1.slice(3, 11),
        options: {
          num_notes: 7,
          notes_occupied: 4,
          ratioed: false,
        } as IStaveOptions,
      } as IFactoryParams);

      vf.Tuplet({
        notes: notes1.slice(11, 16),
        options: {
          notes_occupied: 4,
        } as IStaveOptions,
      } as IFactoryParams);

      const voice1 = vf.Voice()
        .setStrict(true)
        .addTickables(notes1);

      const voice2 = vf.Voice()
        .setStrict(true)
        .addTickables(notes2);

      new Formatter()
        .joinVoices([voice1, voice2])
        .formatToStave([voice1, voice2], stave);

      vf.draw();

      ok(true, 'Complex Test');
    },

    mixedTop: function(options) {
      const vf = Test.makeFactory(options);
      const stave = vf.Stave(<IFactoryParams>{ x: 10, y: 10 });

      const notes: Note[] = [
        { keys: ['a/4'], stem_direction: 1 },
        { keys: ['c/6'], stem_direction: -1 },
        { keys: ['a/4'], stem_direction: 1 },
        { keys: ['f/5'], stem_direction: 1 },
        { keys: ['a/4'], stem_direction: -1 },
        { keys: ['c/6'], stem_direction: -1 },
      ].map(quarterNote).map(vf.StaveNote.bind(vf));

      vf.Tuplet(<IFactoryParams>{
        notes: notes.slice(0, 2),
        options: {
          notes_occupied: 3,
        },
      });

      vf.Tuplet(<IFactoryParams>{
        notes: notes.slice(2, 4),
        options: {
          notes_occupied: 3,
        },
      });

      vf.Tuplet(<IFactoryParams>{
        notes: notes.slice(4, 6),
        options: {
          notes_occupied: 3,
        },
      });

      const voice = vf.Voice()
        .setStrict(false)
        .addTickables(notes);

      new Formatter()
        .joinVoices([voice])
        .formatToStave([voice], stave);

      vf.draw();

      ok(true, 'Mixed Stem Direction Tuplet');
    },

    mixedBottom: function(options) {
      const vf = Test.makeFactory(options);
      const stave = vf.Stave(<IFactoryParams>{ x: 10, y: 10 });

      const notes: Note[] = [
        { keys: ['f/3'], stem_direction: 1 },
        { keys: ['a/5'], stem_direction: -1 },
        { keys: ['a/4'], stem_direction: 1 },
        { keys: ['f/3'], stem_direction: 1 },
        { keys: ['a/4'], stem_direction: -1 },
        { keys: ['c/4'], stem_direction: -1 },
      ].map(quarterNote).map(vf.StaveNote.bind(vf));

      vf.Tuplet(<IFactoryParams>{
        notes: notes.slice(0, 2),
        options: {
          notes_occupied: 3,
        },
      });

      vf.Tuplet(<IFactoryParams>{
        notes: notes.slice(2, 4),
        options: {
          notes_occupied: 3,
        },
      });

      vf.Tuplet(<IFactoryParams>{
        notes: notes.slice(4, 6),
        options: {
          notes_occupied: 3,
        },
      });

      const voice = vf.Voice()
        .setStrict(false)
        .addTickables(notes);

      new Formatter()
        .joinVoices([voice])
        .formatToStave([voice], stave);

      vf.draw();

      ok(true, 'Mixed Stem Direction Bottom Tuplet');
    },

    nested: function(options) {
      const vf = Test.makeFactory(options);
      const stave = vf.Stave(<IFactoryParams>{ x: 10, y: 10 }).addTimeSignature('4/4');

      const notes: Note[] = [
        // Big triplet 1:
        { keys: ['b/4'], duration: '4' },
        { keys: ['a/4'], duration: '4' },
        { keys: ['g/4'], duration: '16' },
        { keys: ['a/4'], duration: '16' },
        { keys: ['f/4'], duration: '16' },
        { keys: ['a/4'], duration: '16' },
        { keys: ['g/4'], duration: '16' },
        { keys: ['b/4'], duration: '2' },
      ].map(stemUp).map(vf.StaveNote.bind(vf));

      vf.Beam(<IFactoryParams>{
        notes: notes.slice(2, 7),
      });

      vf.Tuplet(<IFactoryParams>{
        notes: notes.slice(0, 7),
        options: {
          notes_occupied: 2,
          num_notes: 3,
        },
      });

      vf.Tuplet(<IFactoryParams>{
        notes: notes.slice(2, 7),
        options: {
          notes_occupied: 4,
          num_notes: 5,
        },
      });

      // 4/4 time
      const voice = vf.Voice()
        .setStrict(true)
        .addTickables(notes);

      new Formatter()
        .joinVoices([voice])
        .formatToStave([voice], stave);

      vf.draw();

      ok(true, 'Nested Tuplets');
    },

    single: function(options) {
      const vf = Test.makeFactory(options);
      const stave = vf.Stave(<IFactoryParams>{ x: 10, y: 10 }).addTimeSignature('4/4');

      const notes: Note[] = [
        // Big triplet 1:
        { keys: ['c/4'], duration: '4' },
        { keys: ['d/4'], duration: '8' },
        { keys: ['e/4'], duration: '8' },
        { keys: ['f/4'], duration: '8' },
        { keys: ['g/4'], duration: '8' },
        { keys: ['a/4'], duration: '2' },
        { keys: ['b/4'], duration: '4' },
      ].map(stemUp).map(vf.StaveNote.bind(vf));

      vf.Beam(<IFactoryParams>{
        notes: notes.slice(1, 4),
      });

      // big quartuplet
      vf.Tuplet(<IFactoryParams>{
        notes: notes.slice(0, -1),
        options: {
          num_notes: 4,
          notes_occupied: 3,
          ratioed: true,
          bracketed: true,
        },
      });

      // first singleton
      vf.Tuplet(<IFactoryParams>{
        notes: notes.slice(0, 1),
        options: {
          num_notes: 3,
          notes_occupied: 2,
          ratioed: true,
        },
      });

      // eighth note triplet
      vf.Tuplet(<IFactoryParams>{
        notes: notes.slice(1, 4),
        options: {
          num_notes: 3,
          notes_occupied: 2,
        },
      });

      // second singleton
      vf.Tuplet(<IFactoryParams>{
        notes: notes.slice(4, 5),
        options: {
          num_notes: 3,
          notes_occupied: 2,
          ratioed: true,
          bracketed: true,
        },
      });

      // 4/4 time
      const voice = vf.Voice(<IFactoryParams>{ time: { num_beats: 4, beat_value: 4 } })
        .setStrict(true)
        .addTickables(notes);

      new Formatter()
        .joinVoices([voice])
        .formatToStave([voice], stave);

      vf.draw();

      ok(true, 'Nested Tuplets');
    },
  };
})();
