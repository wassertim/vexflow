/**
 * VexFlow - GraceTabNote Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import Test from './vexflow_test_helpers';
import { Formatter, GraceNoteGroup, GraceTabNote, TabNote, TabStave, Vex, Voice } from '../src';

declare const QUnit: any;
declare function ok(...args);

export const GraceTabNoteTests = (function() {
  return {
    Start: function() {
      QUnit.module('Grace Tab Notes');
      Test.runTests('Grace Tab Note Simple', this.simple.bind(this));
      Test.runTests('Grace Tab Note Slurred', this.slurred.bind(this));
    },

    setupContext: function(options, x) {
      const ctx = options.contextBuilder(options.elementId, 350, 140);
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

      const note0 = newNote({ positions: [{ str: 4, fret: 6 }], duration: '4' });
      const note1 = newNote({ positions: [{ str: 4, fret: 12 }], duration: '4' });
      const note2 = newNote({ positions: [{ str: 4, fret: 10 }], duration: '4' });
      const note3 = newNote({ positions: [{ str: 4, fret: 10 }], duration: '4' });

      const gracenote_group0 = [
        { positions: [{ str: 4, fret: 'x' }], duration: '8' },
      ];

      const gracenote_group1 = [
        { positions: [{ str: 4, fret: 9 }], duration: '16' },
        { positions: [{ str: 4, fret: 10 }], duration: '16' },
      ];

      const gracenote_group2 = [
        { positions: [{ str: 4, fret: 9 }], duration: '8' },
      ];
      const gracenote_group3 = [
        { positions: [{ str: 5, fret: 10 }], duration: '8' },
        { positions: [{ str: 4, fret: 9 }], duration: '8' },
      ];

      function createNote(note_prop) {
        return new GraceTabNote(note_prop);
      }

      const gracenotes0 = gracenote_group0.map(createNote);
      const gracenotes1 = gracenote_group1.map(createNote);
      const gracenotes2 = gracenote_group2.map(createNote);
      gracenotes2[0].setGhost(true);
      const gracenotes3 = gracenote_group3.map(createNote);

      note0.addModifier(new GraceNoteGroup(gracenotes0));
      note1.addModifier(new GraceNoteGroup(gracenotes1));
      note2.addModifier(new GraceNoteGroup(gracenotes2));
      note3.addModifier(new GraceNoteGroup(gracenotes3));

      const voice = new Voice(Vex.Flow.TIME4_4);
      voice.addTickables([note0, note1, note2, note3]);

      new Formatter().joinVoices([voice]).format([voice], 250);

      voice.draw(c.context, c.stave);

      ok(true, 'Simple Test');
    },

    slurred: function(options, contextBuilder) {
      options.contextBuilder = contextBuilder;
      const c = this.setupContext(options);

      function newNote(tab_struct) { return new TabNote(tab_struct); }

      const note0 = newNote({ positions: [{ str: 4, fret: 12 }], duration: 'h' });
      const note1 = newNote({ positions: [{ str: 4, fret: 10 }], duration: 'h' });

      const gracenote_group0 = [
        { positions: [{ str: 4, fret: 9 }], duration: '8' },
        { positions: [{ str: 4, fret: 10 }], duration: '8' },
      ];

      const gracenote_group1 = [
        { positions: [{ str: 4, fret: 7 }], duration: '16' },
        { positions: [{ str: 4, fret: 8 }], duration: '16' },
        { positions: [{ str: 4, fret: 9 }], duration: '16' },
      ];

      function createNote(note_prop) {
        return new GraceTabNote(note_prop);
      }

      const gracenotes0 = gracenote_group0.map(createNote);
      const gracenotes1 = gracenote_group1.map(createNote);

      note0.addModifier(new GraceNoteGroup(gracenotes0, true));
      note1.addModifier(new GraceNoteGroup(gracenotes1, true));

      const voice = new Voice(Vex.Flow.TIME4_4);
      voice.addTickables([note0, note1]);

      new Formatter().joinVoices([voice]).format([voice], 200);

      voice.draw(c.context, c.stave);

      ok(true, 'Slurred Test');
    },
  };
})();
