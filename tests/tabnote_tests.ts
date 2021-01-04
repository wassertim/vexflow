/**
 * VexFlow - TabNote Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import Test from './vexflow_test_helpers';
import { Vex } from '../src';
import { IStaveNoteStruct } from '../src/types/note';
import { IStaveOptions } from '../src/types/stave';

declare const QUnit: any;
declare function ok(...args);
declare function test(...args);
declare function expect(...args);
declare function equal(...args);

export const TabNoteTests = (function() {
  const VF = Vex.Flow;
  return {
    Start: function() {
      QUnit.module('TabNote');

      test('Tick', this.ticks.bind(this));
      test('TabStave Line', this.tabStaveLine.bind(this));
      test('Width', this.width.bind(this));
      test('TickContext', this.tickContext.bind(this));

      const run = Test.runTests;
      run('TabNote Draw', this.draw.bind(this));
      run('TabNote Stems Up', this.drawStemsUp.bind(this));
      run('TabNote Stems Down', this.drawStemsDown.bind(this));
      run('TabNote Stems Up Through Stave', this.drawStemsUpThrough.bind(this));
      run('TabNote Stems Down Through Stave', this.drawStemsDownThrough.bind(this));
      run('TabNote Stems with Dots', this.drawStemsDotted.bind(this));
    },

    ticks: function() {
      const BEAT = 1 * VF.RESOLUTION / 4;

      let note = new VF.TabNote(<IStaveNoteStruct>{ positions: [{ str: 6, fret: 6 }], duration: '1' });
      equal(note.getTicks().value(), BEAT * 4, 'Whole note has 4 beats');

      note = new VF.TabNote(<IStaveNoteStruct>{ positions: [{ str: 3, fret: 4 }], duration: '4' });
      equal(note.getTicks().value(), BEAT, 'Quarter note has 1 beat');
    },

    tabStaveLine: function() {
      const note = new VF.TabNote(<IStaveNoteStruct>{
        positions: [{ str: 6, fret: 6 }, { str: 4, fret: 5 }],
        duration: '1',
      });

      const positions = note.getPositions();
      equal(positions[0].str, 6, 'String 6, Fret 6');
      equal(positions[0].fret, 6, 'String 6, Fret 6');
      equal(positions[1].str, 4, 'String 4, Fret 5');
      equal(positions[1].fret, 5, 'String 4, Fret 5');

      const stave = new VF.Stave(10, 10, 300);
      note.setStave(stave);

      const ys = note.getYs();
      equal(ys.length, 2, 'Chord should be rendered on two lines');
      equal(ys[0], 100, 'Line for String 6, Fret 6');
      equal(ys[1], 80, 'Line for String 4, Fret 5');
    },

    width: function() {
      expect(1);
      const note = new VF.TabNote(<IStaveNoteStruct>{
        positions: [{ str: 6, fret: 6 }, { str: 4, fret: 5 }],
        duration: '1',
      });

      try {
        note.getWidth();
      } catch (e) {
        equal(e.code, 'UnformattedNote', 'Unformatted note should have no width');
      }
    },

    tickContext: function() {
      const note = new VF.TabNote(<IStaveNoteStruct>{
        positions: [{ str: 6, fret: 6 }, { str: 4, fret: 5 }],
        duration: '1',
      });

      const tickContext = new VF.TickContext()
        .addTickable(note)
        .preFormat()
        .setX(10)
        .setPadding(0);

      equal(tickContext.getWidth(), 7);
    },

    showNote: function(tab_struct, stave, ctx, x) {
      const note = new VF.TabNote(tab_struct);
      const tickContext = new VF.TickContext();
      tickContext.addTickable(note).preFormat().setX(x);
      note.setContext(ctx).setStave(stave);
      note.draw();
      return note;
    },

    draw: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 600, 140);

      ctx.font = '10pt Arial';
      const stave = new VF.TabStave(10, 10, 550);
      stave.setContext(ctx);
      stave.draw();

      const showNote = this.showNote;
      const notes = [
        { positions: [{ str: 6, fret: 6 }], duration: '4' },
        { positions: [{ str: 3, fret: 6 }, { str: 4, fret: 25 }], duration: '4' },
        { positions: [{ str: 2, fret: 'x' }, { str: 5, fret: 15 }], duration: '4' },
        { positions: [{ str: 2, fret: 'x' }, { str: 5, fret: 5 }], duration: '4' },
        { positions: [{ str: 2, fret: 10 }, { str: 5, fret: 12 }], duration: '4' },
        {
          positions: [{ str: 6, fret: 0 },
            { str: 5, fret: 5 },
            { str: 4, fret: 5 },
            { str: 3, fret: 4 },
            { str: 2, fret: 3 },
            { str: 1, fret: 0 }],
          duration: '4',
        },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }], duration: '4' },
      ];

      for (let i = 0; i < notes.length; ++i) {
        const note = notes[i];
        const staveNote = showNote(note, stave, ctx, (i + 1) * 25);

        ok(staveNote.getX() > 0, 'Note ' + i + ' has X value');
        ok(staveNote.getYs().length > 0, 'Note ' + i + ' has Y values');
      }
    },

    drawStemsUp: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 600, 200);
      ctx.font = '10pt Arial';
      const stave = new VF.TabStave(10, 30, 550);
      stave.setContext(ctx);
      stave.draw();

      const specs = [
        { positions: [{ str: 3, fret: 6 }, { str: 4, fret: 25 }], duration: '4' },
        { positions: [{ str: 2, fret: 10 }, { str: 5, fret: 12 }], duration: '8' },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }], duration: '8' },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }], duration: '16' },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }], duration: '32' },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }], duration: '64' },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }], duration: '128' },
      ];

      const notes = specs.map(function(noteSpec: IStaveNoteStruct) {
        const tabNote = new VF.TabNote(noteSpec);
        tabNote.render_options.draw_stem = true;
        return tabNote;
      });

      const voice = new VF.Voice(VF.TIME4_4).setMode(VF.Voice.Mode.SOFT);
      voice.addTickables(notes);
      new VF.Formatter().joinVoices([voice]).formatToStave([voice], stave);
      voice.draw(ctx, stave);
      ok(true, 'TabNotes successfully drawn');
    },

    drawStemsDown: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 600, 200);

      ctx.font = '10pt Arial';
      const stave = new VF.TabStave(10, 10, 550);
      stave.setContext(ctx);
      stave.draw();

      const specs = [
        { positions: [{ str: 3, fret: 6 }, { str: 4, fret: 25 }], duration: '4' },
        { positions: [{ str: 2, fret: 10 }, { str: 5, fret: 12 }], duration: '8' },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }], duration: '8' },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }], duration: '16' },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }], duration: '32' },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }], duration: '64' },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }], duration: '128' },
      ];

      const notes = specs.map(function(noteSpec: IStaveNoteStruct) {
        const tabNote = new VF.TabNote(noteSpec);
        tabNote.render_options.draw_stem = true;
        tabNote.setStemDirection(-1);
        return tabNote;
      });

      const voice = new VF.Voice(VF.TIME4_4).setMode(VF.Voice.Mode.SOFT);
      voice.addTickables(notes);
      new VF.Formatter().joinVoices([voice]).formatToStave([voice], stave);
      voice.draw(ctx, stave);
      ok(true, 'All objects have been drawn');
    },

    drawStemsUpThrough: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 600, 200);
      ctx.font = '10pt Arial';
      const stave = new VF.TabStave(10, 30, 550);
      stave.setContext(ctx);
      stave.draw();

      const specs = [
        { positions: [{ str: 3, fret: 6 }, { str: 4, fret: 25 }], duration: '4' },
        { positions: [{ str: 2, fret: 10 }, { str: 5, fret: 12 }], duration: '8' },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }], duration: '8' },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }], duration: '16' },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }], duration: '32' },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }], duration: '64' },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }], duration: '128' },
      ];

      const notes = specs.map(function(noteSpec: IStaveNoteStruct) {
        const tabNote = new VF.TabNote(noteSpec);
        tabNote.render_options.draw_stem = true;
        tabNote.render_options.draw_stem_through_stave = true;
        return tabNote;
      });

      ctx.setFont('sans-serif', 10, 'bold');
      const voice = new VF.Voice(VF.TIME4_4).setMode(VF.Voice.Mode.SOFT);
      voice.addTickables(notes);
      new VF.Formatter().joinVoices([voice]).formatToStave([voice], stave);
      voice.draw(ctx, stave);
      ok(true, 'TabNotes successfully drawn');
    },

    drawStemsDownThrough: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 600, 250);

      ctx.font = '10pt Arial';
      const stave = new VF.TabStave(10, 10, 550, <IStaveOptions>{ num_lines: 8 });
      stave.setContext(ctx);
      stave.draw();

      const specs = [
        { positions: [{ str: 3, fret: 6 }, { str: 4, fret: 25 }], duration: '4' },
        { positions: [{ str: 2, fret: 10 }, { str: 5, fret: 12 }], duration: '8' },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }], duration: '8' },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }], duration: '16' },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }, { str: 6, fret: 10 }], duration: '32' },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }], duration: '64' },
        { positions: [{ str: 1, fret: 6 }, { str: 3, fret: 5 }, { str: 5, fret: 5 }, { str: 7, fret: 5 }], duration: '128' },
      ];

      const notes = specs.map(function(noteSpec: IStaveNoteStruct) {
        const tabNote = new VF.TabNote(noteSpec);
        tabNote.render_options.draw_stem = true;
        tabNote.render_options.draw_stem_through_stave = true;
        tabNote.setStemDirection(-1);
        return tabNote;
      });

      ctx.setFont('Arial', 10, 'bold');

      const voice = new VF.Voice(VF.TIME4_4).setMode(VF.Voice.Mode.SOFT);
      voice.addTickables(notes);
      new VF.Formatter().joinVoices([voice]).formatToStave([voice], stave);
      voice.draw(ctx, stave);
      ok(true, 'All objects have been drawn');
    },

    drawStemsDotted: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 600, 200);
      ctx.font = '10pt Arial';
      const stave = new VF.TabStave(10, 10, 550);
      stave.setContext(ctx);
      stave.draw();

      const specs = [
        { positions: [{ str: 3, fret: 6 }, { str: 4, fret: 25 }], duration: '4d' },
        { positions: [{ str: 2, fret: 10 }, { str: 5, fret: 12 }], duration: '8' },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }], duration: '4dd', stem_direction: -1 },
        { positions: [{ str: 1, fret: 6 }, { str: 4, fret: 5 }], duration: '16', stem_direction: -1 },
      ];

      const notes = specs.map(function(noteSpec: IStaveNoteStruct) {
        const tabNote = new VF.TabNote(noteSpec, true);
        return tabNote;
      });

      notes[0].addDot();
      notes[2].addDot();
      notes[2].addDot();

      const voice = new VF.Voice(VF.TIME4_4).setMode(VF.Voice.Mode.SOFT);
      voice.addTickables(notes);
      new VF.Formatter().joinVoices([voice]).formatToStave([voice], stave);
      voice.draw(ctx, stave);
      ok(true, 'TabNotes successfully drawn');
    },
  };
})();
