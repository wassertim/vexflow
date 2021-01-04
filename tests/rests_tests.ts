/**
 * VexFlow - Rest Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 *
 */
import Test from './vexflow_test_helpers';
import { Beam, Formatter, Stave, StaveNote, Tuplet, Vex, Voice } from '../src';
import { IStaveNoteStruct } from '../src/types/note';
import { IFormatAndDrawOptions, IFormatOptions } from '../src/types/formatter';

declare const QUnit: any;
declare function ok(...args);

export const RestsTests = (function() {
  return {
    Start: function() {
      const run = Test.runTests;

      QUnit.module('Rests');

      run('Rests - Dotted', this.basic.bind(this));
      run('Auto Align Rests - Beamed Notes Stems Up', this.beamsUp.bind(this));
      run('Auto Align Rests - Beamed Notes Stems Down', this.beamsDown.bind(this));
      run('Auto Align Rests - Tuplets Stems Up', this.tuplets.bind(this));
      run('Auto Align Rests - Tuplets Stems Down', this.tupletsdown.bind(this));
      run('Auto Align Rests - Single Voice (Default)', this.staveRests.bind(this));
      run('Auto Align Rests - Single Voice (Align All)', this.staveRestsAll.bind(this));
      run('Auto Align Rests - Multi Voice', this.multi.bind(this));
    },

    setupContext: function(options, contextBuilder, x, y) {
      const ctx = new contextBuilder(options.elementId, x || 350, y || 150);
      ctx.scale(0.9, 0.9);
      ctx.fillStyle = '#221';
      ctx.strokeStyle = '#221';
      ctx.font = ' 10pt Arial';

      const stave = new Stave(10, 30, x || 350)
        .addTrebleGlyph()
        .addTimeSignature('4/4')
        .setContext(ctx)
        .draw();

      return {
        context: ctx,
        stave: stave,
      };
    },

    basic: function(options, contextBuilder) {
      const c = this.setupContext(options, contextBuilder, 700);

      const notes = [
        new StaveNote(<IStaveNoteStruct>{ keys: ['b/4'], stem_direction: 1, duration: 'wr' }).addDotToAll(),
        new StaveNote(<IStaveNoteStruct>{ keys: ['b/4'], stem_direction: 1, duration: 'hr' }).addDotToAll(),
        new StaveNote(<IStaveNoteStruct>{ keys: ['b/4'], stem_direction: 1, duration: '4r' }).addDotToAll(),
        new StaveNote(<IStaveNoteStruct>{ keys: ['b/4'], stem_direction: 1, duration: '8r' }).addDotToAll(),
        new StaveNote(<IStaveNoteStruct>{ keys: ['b/4'], stem_direction: 1, duration: '16r' }).addDotToAll(),
        new StaveNote(<IStaveNoteStruct>{ keys: ['b/4'], stem_direction: 1, duration: '32r' }).addDotToAll(),
        new StaveNote(<IStaveNoteStruct>{ keys: ['b/4'], stem_direction: 1, duration: '64r' }).addDotToAll(),
      ];

      Formatter.FormatAndDraw(c.context, c.stave, notes);

      ok(true, 'Dotted Rest Test');
    },

    beamsUp: function(options, b) {
      const c = this.setupContext(options, b, 600, 160);
      function newNote(note_struct) { return new StaveNote(note_struct); }

      const notes = [
        newNote({ keys: ['e/5'], stem_direction: 1, duration: '8' }),
        newNote({ keys: ['b/4'], stem_direction: 1, duration: '8r' }),
        newNote({ keys: ['b/5'], stem_direction: 1, duration: '8' }),
        newNote({ keys: ['c/5'], stem_direction: 1, duration: '8' }),

        newNote({ keys: ['b/4', 'd/5', 'a/5'], stem_direction: 1, duration: '8' }),
        newNote({ keys: ['b/4'], stem_direction: 1, duration: '8r' }),
        newNote({ keys: ['b/4'], stem_direction: 1, duration: '8r' }),
        newNote({ keys: ['c/4'], stem_direction: 1, duration: '8' }),

        newNote({ keys: ['b/4', 'd/5', 'a/5'], stem_direction: 1, duration: '8' }),
        newNote({ keys: ['b/4'], stem_direction: 1, duration: '8' }),
        newNote({ keys: ['b/4'], stem_direction: 1, duration: '8r' }),
        newNote({ keys: ['c/4'], stem_direction: 1, duration: '8' }),

      ];

      const beam1 = new Beam(notes.slice(0, 4));
      const beam2 = new Beam(notes.slice(4, 8));
      const beam3 = new Beam(notes.slice(8, 12));

      Formatter.FormatAndDraw(c.context, c.stave, notes);

      beam1.setContext(c.context).draw();
      beam2.setContext(c.context).draw();
      beam3.setContext(c.context).draw();

      ok(true, 'Auto Align Rests - Beams Up Test');
    },

    beamsDown: function(options, b) {
      const c = this.setupContext(options, b, 600, 160);
      function newNote(note_struct) { return new StaveNote(note_struct); }

      const notes = [
        newNote({ keys: ['a/5'], stem_direction: -1, duration: '8' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '8r' }),
        newNote({ keys: ['b/5'], stem_direction: -1, duration: '8' }),
        newNote({ keys: ['c/5'], stem_direction: -1, duration: '8' }),

        newNote({ keys: ['b/4', 'd/5', 'a/5'], stem_direction: -1, duration: '8' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '8r' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '8r' }),
        newNote({ keys: ['e/4'], stem_direction: -1, duration: '8' }),

        newNote({ keys: ['b/4', 'd/5', 'a/5'], stem_direction: -1, duration: '8' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '8' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '8r' }),
        newNote({ keys: ['e/4'], stem_direction: -1, duration: '8' }),

      ];

      const beam1 = new Beam(notes.slice(0, 4));
      const beam2 = new Beam(notes.slice(4, 8));
      const beam3 = new Beam(notes.slice(8, 12));

      Formatter.FormatAndDraw(c.context, c.stave, notes);

      beam1.setContext(c.context).draw();
      beam2.setContext(c.context).draw();
      beam3.setContext(c.context).draw();

      ok(true, 'Auto Align Rests - Beams Down Test');
    },

    tuplets: function(options, b) {
      const c = this.setupContext(options, b, 600, 160);
      function newNote(note_struct) { return new StaveNote(note_struct); }

      const notes = [
        newNote({ keys: ['b/4'], stem_direction: 1, duration: '4' }),
        newNote({ keys: ['b/4'], stem_direction: 1, duration: '4' }),
        newNote({ keys: ['a/5'], stem_direction: 1, duration: '4r' }),

        newNote({ keys: ['a/5'], stem_direction: 1, duration: '4r' }),
        newNote({ keys: ['g/5'], stem_direction: 1, duration: '4r' }),
        newNote({ keys: ['b/5'], stem_direction: 1, duration: '4' }),

        newNote({ keys: ['a/5'], stem_direction: 1, duration: '4' }),
        newNote({ keys: ['g/5'], stem_direction: 1, duration: '4r' }),
        newNote({ keys: ['b/4'], stem_direction: 1, duration: '4' }),

        newNote({ keys: ['a/5'], stem_direction: 1, duration: '4' }),
        newNote({ keys: ['b/4'], stem_direction: 1, duration: '4r' }),
        newNote({ keys: ['b/4'], stem_direction: 1, duration: '4r' }),
      ];

      const tuplet1 = new Tuplet(notes.slice(0, 3)).setTupletLocation(Tuplet.LOCATION_TOP);
      const tuplet2 = new Tuplet(notes.slice(3, 6)).setTupletLocation(Tuplet.LOCATION_TOP);
      const tuplet3 = new Tuplet(notes.slice(6, 9)).setTupletLocation(Tuplet.LOCATION_TOP);
      const tuplet4 = new Tuplet(notes.slice(9, 12)).setTupletLocation(Tuplet.LOCATION_TOP);

      Formatter.FormatAndDraw(c.context, c.stave, notes);

      tuplet1.setContext(c.context).draw();
      tuplet2.setContext(c.context).draw();
      tuplet3.setContext(c.context).draw();
      tuplet4.setContext(c.context).draw();

      ok(true, 'Auto Align Rests - Tuplets Stem Up Test');
    },

    tupletsdown: function(options, b) {
      const c = this.setupContext(options, b, 600, 160);
      function newNote(note_struct) { return new StaveNote(note_struct); }

      const notes = [
        newNote({ keys: ['a/5'], stem_direction: -1, duration: '8r' }),
        newNote({ keys: ['g/5'], stem_direction: -1, duration: '8r' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '8' }),

        newNote({ keys: ['a/5'], stem_direction: -1, duration: '8r' }),
        newNote({ keys: ['g/5'], stem_direction: -1, duration: '8' }),
        newNote({ keys: ['b/5'], stem_direction: -1, duration: '8' }),

        newNote({ keys: ['a/5'], stem_direction: -1, duration: '8' }),
        newNote({ keys: ['g/5'], stem_direction: -1, duration: '8r' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '8' }),

        newNote({ keys: ['a/5'], stem_direction: -1, duration: '8' }),
        newNote({ keys: ['g/5'], stem_direction: -1, duration: '8r' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '8r' }),
      ];

      const beam1 = new Beam(notes.slice(0, 3));
      const beam2 = new Beam(notes.slice(3, 6));
      const beam3 = new Beam(notes.slice(6, 9));
      const beam4 = new Beam(notes.slice(9, 12));

      const tuplet1 = new Tuplet(notes.slice(0, 3))
        .setTupletLocation(Tuplet.LOCATION_BOTTOM);
      const tuplet2 = new Tuplet(notes.slice(3, 6))
        .setTupletLocation(Tuplet.LOCATION_BOTTOM);
      const tuplet3 = new Tuplet(notes.slice(6, 9))
        .setTupletLocation(Tuplet.LOCATION_BOTTOM);
      const tuplet4 = new Tuplet(notes.slice(9, 12))
        .setTupletLocation(Tuplet.LOCATION_BOTTOM);

      Formatter.FormatAndDraw(c.context, c.stave, notes);

      tuplet1.setContext(c.context).draw();
      tuplet2.setContext(c.context).draw();
      tuplet3.setContext(c.context).draw();
      tuplet4.setContext(c.context).draw();

      beam1.setContext(c.context).draw();
      beam2.setContext(c.context).draw();
      beam3.setContext(c.context).draw();
      beam4.setContext(c.context).draw();

      ok(true, 'Auto Align Rests - Tuplets Stem Down Test');
    },

    staveRests: function(options, b) {
      const c = this.setupContext(options, b, 600, 160);
      function newNote(note_struct) { return new StaveNote(note_struct); }

      const notes = [
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '4r' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '4r' }),
        newNote({ keys: ['f/4'], stem_direction: -1, duration: '4' }),
        newNote({ keys: ['e/5'], stem_direction: -1, duration: '8' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '8r' }),

        newNote({ keys: ['a/5'], stem_direction: -1, duration: '8' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '8r' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '8' }),
        newNote({ keys: ['e/5'], stem_direction: -1, duration: '8' }),

        newNote({ keys: ['a/5'], stem_direction: 1, duration: '4' }),
        newNote({ keys: ['b/4'], stem_direction: 1, duration: '4r' }),
        newNote({ keys: ['b/5'], stem_direction: 1, duration: '4' }),

        newNote({ keys: ['d/5'], stem_direction: -1, duration: '4' }),
        newNote({ keys: ['g/5'], stem_direction: -1, duration: '4' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '4r' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '4r' }),
      ];

      const beam1 = new Beam(notes.slice(5, 9));
      const tuplet = new Tuplet(notes.slice(9, 12))
        .setTupletLocation(Tuplet.LOCATION_TOP);

      Formatter.FormatAndDraw(c.context, c.stave, notes);

      tuplet.setContext(c.context).draw();
      beam1.setContext(c.context).draw();

      ok(true, 'Auto Align Rests - Default Test');
    },

    staveRestsAll: function(options, b) {
      const c = this.setupContext(options, b, 600, 160);
      function newNote(note_struct) { return new StaveNote(note_struct); }

      const notes = [
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '4r' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '4r' }),
        newNote({ keys: ['f/4'], stem_direction: -1, duration: '4' }),
        newNote({ keys: ['e/5'], stem_direction: -1, duration: '8' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '8r' }),

        newNote({ keys: ['a/5'], stem_direction: -1, duration: '8' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '8r' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '8' }),
        newNote({ keys: ['e/5'], stem_direction: -1, duration: '8' }),

        newNote({ keys: ['a/5'], stem_direction: 1, duration: '4' }),
        newNote({ keys: ['b/4'], stem_direction: 1, duration: '4r' }),
        newNote({ keys: ['b/5'], stem_direction: 1, duration: '4' }),

        newNote({ keys: ['d/5'], stem_direction: -1, duration: '4' }),
        newNote({ keys: ['g/5'], stem_direction: -1, duration: '4' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '4r' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '4r' }),
      ];

      const beam1 = new Beam(notes.slice(5, 9));
      const tuplet = new Tuplet(notes.slice(9, 12))
        .setTupletLocation(Tuplet.LOCATION_TOP);

      // Set option to position rests near the notes in the voice
      Formatter.FormatAndDraw(c.context, c.stave, notes, <IFormatAndDrawOptions>{ align_rests: true });

      tuplet.setContext(c.context).draw();
      beam1.setContext(c.context).draw();

      ok(true, 'Auto Align Rests - Align All Test');
    },

    multi: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 600, 200);

      const stave = new Stave(50, 10, 500)
        .addClef('treble')
        .setContext(ctx)
        .addTimeSignature('4/4')
        .draw();

      function newNote(note_struct) {
        return new StaveNote(note_struct).setStave(stave);
      }

      const notes1 = [
        newNote({ keys: ['c/4', 'e/4', 'g/4'], duration: '4' }),
        newNote({ keys: ['b/4'], duration: '4r' }),
        newNote({ keys: ['c/4', 'd/4', 'a/4'], duration: '4' }),
        newNote({ keys: ['b/4'], duration: '4r' }),
      ];

      const notes2 = [
        newNote({ keys: ['e/3'], stem_direction: -1, duration: '8' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '8r' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '8r' }),
        newNote({ keys: ['e/3'], stem_direction: -1, duration: '8' }),
        newNote({ keys: ['e/3'], stem_direction: -1, duration: '8' }),
        newNote({ keys: ['b/4'], stem_direction: -1, duration: '8r' }),
        newNote({ keys: ['e/3'], stem_direction: -1, duration: '8' }),
        newNote({ keys: ['e/3'], stem_direction: -1, duration: '8' }),
      ];

      const voice = new Voice(Vex.Flow.TIME4_4).addTickables(notes1);
      const voice2 = new Voice(Vex.Flow.TIME4_4).addTickables(notes2);

      // Set option to position rests near the notes in each voice
      new Formatter()
        .joinVoices([voice, voice2])
        .formatToStave([voice, voice2], stave, <IFormatOptions>{ align_rests: true });

      const beam2_1 = new Beam(notes2.slice(0, 4));
      const beam2_2 = new Beam(notes2.slice(4, 8));

      voice2.draw(ctx);
      voice.draw(ctx);
      beam2_1.setContext(ctx).draw();
      beam2_2.setContext(ctx).draw();

      ok(true, 'Strokes Test Multi Voice');
    },
  };
})();
