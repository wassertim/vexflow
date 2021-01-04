/**
 * VexFlow - Dot Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import { Beam, ModifierContext, Stave, StaveNote, TickContext } from '../src';
import Test from './vexflow_test_helpers';
import { IStaveNoteStruct } from '../src/types/note';

declare const QUnit: any;
declare function ok(...args);

export const DotTests = (function() {
  function showNote(note, stave, ctx, x) {
    note
      .setStave(stave)
      .addToModifierContext(new ModifierContext());

    new TickContext()
      .addTickable(note)
      .preFormat()
      .setX(x);

    note.setContext(ctx).draw();

    Test.plotNoteWidth(ctx, note, 140);

    return note;
  }

  function showNotes(note1, note2, stave, ctx, x) {
    const modifierContext = new ModifierContext();
    note1.setStave(stave).addToModifierContext(modifierContext);
    note2.setStave(stave).addToModifierContext(modifierContext);

    new TickContext()
      .addTickable(note1)
      .addTickable(note2)
      .setX(x)
      .preFormat();

    note1.setContext(ctx).draw();
    note2.setContext(ctx).draw();

    Test.plotNoteWidth(ctx, note1, 180);
    Test.plotNoteWidth(ctx, note2, 20);
  }

  return  {
    Start: function() {
      QUnit.module('Dot');
      Test.runTests('Basic', this.basic.bind(this));
      Test.runTests('Multi Voice', this.multiVoice.bind(this));
    },

    basic: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 1000, 240);
      ctx.setFillStyle('#221');
      ctx.setStrokeStyle('#221');

      const stave = new Stave(10, 10, 975);
      stave.setContext(ctx);
      stave.draw();

      const notes = [
        new StaveNote(<IStaveNoteStruct>{ keys: ['c/4', 'e/4', 'a/4', 'b/4'], duration: 'w' })
          .addDotToAll(),
        new StaveNote(<IStaveNoteStruct>{ keys: ['a/4', 'b/4', 'c/5'], duration: '4', stem_direction: 1 })
          .addDotToAll(),
        new StaveNote(<IStaveNoteStruct>{ keys: ['g/4', 'a/4', 'b/4'], duration: '4', stem_direction: -1 })
          .addDotToAll(),
        new StaveNote(<IStaveNoteStruct>{ keys: ['e/4', 'f/4', 'b/4', 'c/5'], duration: '4' })
          .addDotToAll(),
        new StaveNote(<IStaveNoteStruct>{ keys: ['g/4', 'a/4', 'd/5', 'e/5', 'g/5'], duration: '4', stem_direction: -1 })
          .addDotToAll(),
        new StaveNote(<IStaveNoteStruct>{ keys: ['g/4', 'b/4', 'd/5', 'e/5'], duration: '4', stem_direction: -1 })
          .addDotToAll(),
        new StaveNote(<IStaveNoteStruct>{ keys: ['e/4', 'g/4', 'b/4', 'c/5'], duration: '4', stem_direction: 1 })
          .addDotToAll(),
        new StaveNote(<IStaveNoteStruct>{ keys: ['d/4', 'e/4', 'f/4', 'a/4', 'c/5', 'e/5', 'g/5'], duration: '2' })
          .addDotToAll()
          .addDotToAll(),
        new StaveNote(<IStaveNoteStruct>{
          keys: ['f/4', 'g/4', 'a/4', 'b/4', 'c/5', 'e/5', 'g/5'],
          duration: '16',
          stem_direction: -1
        })
          .addDotToAll()
          .addDotToAll()
          .addDotToAll(),
        new StaveNote(<IStaveNoteStruct>{
          keys: ['f/4', 'g/4', 'a/4', 'b/4', 'c/5', 'e/5', 'g/5'],
          duration: '16',
          stem_direction: 1
        })
          .addDotToAll()
          .addDotToAll()
          .addDotToAll(),
        new StaveNote(<IStaveNoteStruct>{
          keys: ['e/4', 'g/4', 'a/4', 'b/4', 'c/5', 'e/5', 'f/5'],
          duration: '16',
          stem_direction: 1
        })
          .addDotToAll(),
        new StaveNote(<IStaveNoteStruct>{ keys: ['e/4', 'g/4', 'a/4', 'b/4', 'c/5'], duration: '16', stem_direction: 1 })
          .addDotToAll(),
        new StaveNote(<IStaveNoteStruct>{ keys: ['e/4', 'a/4', 'b/4', 'c/5'], duration: '16', stem_direction: 1 })
          .addDotToAll(),
      ];

      const beam = new Beam(notes.slice(notes.length - 2));

      for (let i = 0; i < notes.length; i++) {
        showNote(notes[i], stave, ctx, 30 + (i * 65));
        const dots = notes[i].getDots();
        ok(dots.length > 0, 'Note ' + i + ' has dots');

        for (let j = 0; j < dots.length; ++j) {
          ok(dots[j].width > 0, 'Dot ' + j + ' has width set');
        }
      }

      beam.setContext(ctx).draw();

      Test.plotLegendForNoteWidth(ctx, 890, 140);

      ok(true, 'Full Dot');
    },

    multiVoice: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 750, 300);
      ctx.setFillStyle('#221');
      ctx.setStrokeStyle('#221');

      const stave = new Stave(30, 40, 700).setContext(ctx).draw();

      let note1 = new StaveNote(<IStaveNoteStruct>{ keys: ['c/4', 'e/4', 'a/4'], duration: '2', stem_direction: -1 })
        .addDotToAll()
        .addDotToAll();

      let note2 = new StaveNote(<IStaveNoteStruct>{ keys: ['d/5', 'a/5', 'b/5'], duration: '2', stem_direction: 1 })
        .addDotToAll();

      showNotes(note1, note2, stave, ctx, 60);

      note1 = new StaveNote(<IStaveNoteStruct>{ keys: ['c/4', 'e/4', 'c/5'], duration: '2', stem_direction: -1 })
        .addDot(0)
        .addDot(0)
        .addDot(1)
        .addDot(1)
        .addDot(2)
        .addDot(2)
        .addDot(2);

      note2 = new StaveNote(<IStaveNoteStruct>{ keys: ['d/5', 'a/5', 'b/5'], duration: '4', stem_direction: 1 })
        .addDotToAll()
        .addDotToAll();

      showNotes(note1, note2, stave, ctx, 150);

      note1 = new StaveNote(<IStaveNoteStruct>{ keys: ['d/4', 'c/5', 'd/5'], duration: '2', stem_direction: -1 })
        .addDotToAll()
        .addDotToAll()
        .addDot(0);

      note2 = new StaveNote(<IStaveNoteStruct>{ keys: ['d/5', 'a/5', 'b/5'], duration: '4', stem_direction: 1 })
        .addDotToAll();

      showNotes(note1, note2, stave, ctx, 250);

      note1 = new StaveNote(<IStaveNoteStruct>{ keys: ['d/4', 'c/5', 'd/5'], duration: '8', stem_direction: -1 })
        .addDotToAll()
        .addDotToAll()
        .addDot(0);

      note2 = new StaveNote(<IStaveNoteStruct>{ keys: ['d/5', 'g/5', 'a/5', 'b/5'], duration: '8', stem_direction: 1 })
        .addDotToAll();

      showNotes(note1, note2, stave, ctx, 350);

      note1 = new StaveNote(<IStaveNoteStruct>{ keys: ['d/4', 'c/5', 'd/5'], duration: '8', stem_direction: -1 })
        .addDotToAll()
        .addDotToAll()
        .addDot(0);

      note2 = new StaveNote(<IStaveNoteStruct>{ keys: ['d/5', 'a/5', 'b/5'], duration: '8', stem_direction: 1 })
        .addDotToAll();

      showNotes(note1, note2, stave, ctx, 450);

      Test.plotLegendForNoteWidth(ctx, 620, 180);

      ok(true, 'Full Dot');
    },
  };
})();
