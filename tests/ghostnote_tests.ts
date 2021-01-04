/**
 * VexFlow - Rest Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import Test from './vexflow_test_helpers';
import { EasyScore, Factory } from '../src';
import { IStaveNoteStruct } from '../src/types/note';
import { IFactoryParams } from '../src/types/factory';

declare const QUnit: any;
declare function ok(...args);

function createTest(setup: (f: Factory, s: EasyScore) => void) {
  return function(options) {
    const vf = Test.makeFactory(options, 550);
    const stave = vf.Stave();
    const score = vf.EasyScore();

    setup(vf, score);

    vf.Formatter()
      .joinVoices(vf.getVoices())
      .formatToStave(vf.getVoices(), stave);

    vf.draw();

    ok(true, 'all pass');
  };
}

export const GhostNoteTests = {
  Start: function() {
    const run = Test.runTests;

    QUnit.module('GhostNote');

    run('GhostNote Basic', createTest(function(vf: Factory, score: EasyScore) {
      const voice1 = score.voice(score.notes(
        'f#5/4, f5, db5, c5, c5/8, d5, fn5, e5, d5, c5',
        { stem: 'up' }
      ), { time: '7/4' });

      score.voice([
        vf.GhostNote(<IStaveNoteStruct>{ duration: '2' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['f/4'], stem_direction: -1, duration: '4' }),
        vf.GhostNote(<IStaveNoteStruct>{ duration: '4' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['e/4'], stem_direction: -1, duration: '4' }),
        vf.GhostNote(<IStaveNoteStruct>{ duration: '8' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['d/4'], stem_direction: -1, duration: '8' })
          .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: '##' })),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], stem_direction: -1, duration: '8' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], stem_direction: -1, duration: '8' }),
      ], { time: '7/4' });

      vf.Beam(<IFactoryParams>{ notes: voice1.getTickables().slice(4, 8) });
      vf.Beam(<IFactoryParams>{ notes: voice1.getTickables().slice(8, 10) });
    }));

    run('GhostNote Dotted', createTest(function(vf, score) {
      function addAccidental(note, type) {
        note.addAccidental(0, vf.Accidental(<IFactoryParams>{ type: type }));
      }

      const voice1 = score.voice([
        vf.GhostNote(<IStaveNoteStruct>{ duration: '4d' }),
        vf.StaveNote(<IStaveNoteStruct>{ duration: '8', keys: ['f/5'], stem_direction: 1 }),
        vf.StaveNote(<IStaveNoteStruct>{ duration: '4', keys: ['d/5'], stem_direction: 1 }),
        vf.StaveNote(<IStaveNoteStruct>{ duration: '8', keys: ['c/5'], stem_direction: 1 }),
        vf.StaveNote(<IStaveNoteStruct>{ duration: '16', keys: ['c/5'], stem_direction: 1 }),
        vf.StaveNote(<IStaveNoteStruct>{ duration: '16', keys: ['d/5'], stem_direction: 1 }),
        vf.GhostNote(<IStaveNoteStruct>{ duration: '2dd' }),
        vf.StaveNote(<IStaveNoteStruct>{ duration: '8', keys: ['f/5'], stem_direction: 1 }),
      ], { time: '8/4' });

      const voice2 = score.voice([
        vf.StaveNote(<IStaveNoteStruct>{ duration: '4', keys: ['f/4'], stem_direction: -1 }),
        vf.StaveNote(<IStaveNoteStruct>{ duration: '8', keys: ['e/4'], stem_direction: -1 }),
        vf.StaveNote(<IStaveNoteStruct>{ duration: '8', keys: ['d/4'], stem_direction: -1 }),
        vf.GhostNote(<IStaveNoteStruct>{ duration: '4dd' }),
        vf.StaveNote(<IStaveNoteStruct>{ duration: '16', keys: ['c/4'], stem_direction: -1 }),
        vf.StaveNote(<IStaveNoteStruct>{ duration: '2', keys: ['c/4'], stem_direction: -1 }),
        vf.StaveNote(<IStaveNoteStruct>{ duration: '4', keys: ['d/4'], stem_direction: -1 }),
        vf.StaveNote(<IStaveNoteStruct>{ duration: '8', keys: ['f/4'], stem_direction: -1 }),
        vf.StaveNote(<IStaveNoteStruct>{ duration: '8', keys: ['e/4'], stem_direction: -1 }),
      ], { time: '8/4' });

      const notes1 = voice1.getTickables();
      const notes2 = voice2.getTickables();

      addAccidental(notes1[1], 'bb');
      addAccidental(notes1[4], '#');
      addAccidental(notes1[7], 'n');

      addAccidental(notes2[0], '#');
      addAccidental(notes2[4], 'b');
      addAccidental(notes2[5], '#');
      addAccidental(notes2[7], 'n');

      vf.Beam(<IFactoryParams>{ notes: notes1.slice(3, 6) });
      vf.Beam(<IFactoryParams>{ notes: notes2.slice(1, 3) });
      vf.Beam(<IFactoryParams>{ notes: notes2.slice(7, 9) });
    }));
  },
};
