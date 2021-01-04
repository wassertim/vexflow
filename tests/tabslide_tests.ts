/**
 * VexFlow - TabSlide Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import Test from './vexflow_test_helpers';
import { Formatter, TabNote, TabSlide, TabStave, Vex, Voice } from '../src';
import { INotesStruct } from '../src/types/note';

declare const QUnit: any;
declare function ok(...args);

export const TabSlideTests = (function() {
  return {
    Start: function() {
      const runTests = Test.runTests;
      QUnit.module('TabSlide');
      runTests('Simple TabSlide', this.simple.bind(this));
      runTests('Slide Up', this.slideUp.bind(this));
      runTests('Slide Down', this.slideDown.bind(this));
    },

    tieNotes: function(notes, indices, stave, ctx) {
      const voice = new Voice(Vex.Flow.TIME4_4);
      voice.addTickables(notes);

      new Formatter().joinVoices([voice]).format([voice], 100);
      voice.draw(ctx, stave);

      const tie = new TabSlide({
        first_note: notes[0],
        last_note: notes[1],
        first_indices: indices,
        last_indices: indices,
      }, TabSlide.SLIDE_UP);

      tie.setContext(ctx);
      tie.draw();
    },

    setupContext: function(options, x: number) {
      const ctx = options.contextBuilder(options.elementId, 350, 140);
      ctx.scale(0.9, 0.9);
      ctx.fillStyle = '#221';
      ctx.strokeStyle = '#221';
      ctx.font = '10pt Arial';
      const stave = new TabStave(10, 10, x || 350)
        .addTabGlyph()
        .setContext(ctx)
        .draw();

      return { context: ctx, stave: stave };
    },

    simple: function(options, contextBuilder) {
      options.contextBuilder = contextBuilder;
      const c = this.setupContext(options);

      function newNote(tab_struct) { return new TabNote(tab_struct); }

      this.tieNotes([
        newNote({ positions: [{ str: 4, fret: 4 }], duration: 'h' }),
        newNote({ positions: [{ str: 4, fret: 6 }], duration: 'h' }),
      ], [0], c.stave, c.context);
      ok(true, 'Simple Test');
    },

    multiTest: function(options, factory: (noteStruct: INotesStruct) => TabSlide) {
      const c = this.setupContext(options, 440, 100);
      function newNote(tab_struct) { return new TabNote(tab_struct); }

      const notes = [
        newNote({ positions: [{ str: 4, fret: 4 }], duration: '8' }),
        newNote({ positions: [{ str: 4, fret: 4 }], duration: '8' }),
        newNote({ positions: [{ str: 4, fret: 4 }, { str: 5, fret: 4 }], duration: '8' }),
        newNote({ positions: [{ str: 4, fret: 6 }, { str: 5, fret: 6 }], duration: '8' }),
        newNote({ positions: [{ str: 2, fret: 14 }], duration: '8' }),
        newNote({ positions: [{ str: 2, fret: 16 }], duration: '8' }),
        newNote({ positions: [{ str: 2, fret: 14 }, { str: 3, fret: 14 }], duration: '8' }),
        newNote({ positions: [{ str: 2, fret: 16 }, { str: 3, fret: 16 }], duration: '8' }),
      ];

      const voice = new Voice(Vex.Flow.TIME4_4).addTickables(notes);
      new Formatter().joinVoices([voice]).format([voice], 300);
      voice.draw(c.context, c.stave);

      factory(<INotesStruct>{
        first_note: notes[0],
        last_note: notes[1],
        first_indices: [0],
        last_indices: [0],
      }).setContext(c.context).draw();

      ok(true, 'Single note');

      factory({
        first_note: notes[2],
        last_note: notes[3],
        first_indices: [0, 1],
        last_indices: [0, 1],
      }).setContext(c.context).draw();

      ok(true, 'Chord');

      factory({
        first_note: notes[4],
        last_note: notes[5],
        first_indices: [0],
        last_indices: [0],
      }).setContext(c.context).draw();

      ok(true, 'Single note high-fret');

      factory({
        first_note: notes[6],
        last_note: notes[7],
        first_indices: [0, 1],
        last_indices: [0, 1],
      }).setContext(c.context).draw();

      ok(true, 'Chord high-fret');
    },

    slideUp: function(options, contextBuilder) {
      options.contextBuilder = contextBuilder;
      this.multiTest(options, TabSlide.createSlideUp);
    },

    slideDown: function(options, contextBuilder) {
      options.contextBuilder = contextBuilder;
      this.multiTest(options, TabSlide.createSlideDown);
    },
  };
}());
