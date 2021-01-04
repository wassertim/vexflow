/*
  VexFlow - Ornament Tests
  Copyright Mohit Cheppudira 2010 <mohit@muthanna.com>
  Author: Cyril Silverman
*/
import Test from './vexflow_test_helpers';
import { Accidental, Beam, Formatter, Ornament, Stave, StaveNote, Voice } from '../src';
import { IStaveNoteStruct } from '../src/types/note';
import { IVoiceTime } from '../src/types/voice';
import { IFormatterOptions } from '../src/types/formatter';

declare const QUnit: any;
declare function expect(...args);

export const OrnamentTests = (function() {
  return {
    Start: function() {
      const runTests = Test.runTests;
      QUnit.module('Ornament');
      runTests('Ornaments', this.drawOrnaments);
      runTests('Ornaments Vertically Shifted', this.drawOrnamentsDisplaced);
      runTests('Ornaments - Delayed turns', this.drawOrnamentsDelayed);
      runTests('Ornaments - Delayed turns, Multiple Draws', this.drawOrnamentsDelayedMultipleDraws);
      runTests('Stacked', this.drawOrnamentsStacked);
      runTests('With Upper/Lower Accidentals', this.drawOrnamentsWithAccidentals);
      runTests('Jazz Ornaments', this.jazzOrnaments);
    },

    drawOrnaments: function(options, contextBuilder) {
      expect(0);

      // Get the rendering context
      const ctx = contextBuilder(options.elementId, 750, 195);

      // bar 1
      const staveBar1 = new Stave(10, 30, 700);
      staveBar1.setContext(ctx).draw();
      const notesBar1: StaveNote[] = [
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
      ].map((note: IStaveNoteStruct) => new StaveNote(note));

      notesBar1[0].addModifier(0, new Ornament('mordent'));
      notesBar1[1].addModifier(0, new Ornament('mordent_inverted'));
      notesBar1[2].addModifier(0, new Ornament('turn'));
      notesBar1[3].addModifier(0, new Ornament('turn_inverted'));
      notesBar1[4].addModifier(0, new Ornament('tr'));
      notesBar1[5].addModifier(0, new Ornament('upprall'));
      notesBar1[6].addModifier(0, new Ornament('downprall'));
      notesBar1[7].addModifier(0, new Ornament('prallup'));
      notesBar1[8].addModifier(0, new Ornament('pralldown'));
      notesBar1[9].addModifier(0, new Ornament('upmordent'));
      notesBar1[10].addModifier(0, new Ornament('downmordent'));
      notesBar1[11].addModifier(0, new Ornament('lineprall'));
      notesBar1[12].addModifier(0, new Ornament('prallprall'));

      // Helper function to justify and draw a 4/4 voice
      Formatter.FormatAndDraw(ctx, staveBar1, notesBar1);
    },

    drawOrnamentsDisplaced: function(options, contextBuilder) {
      expect(0);

      // Get the rendering context
      const ctx = contextBuilder(options.elementId, 750, 195);

      // bar 1
      const staveBar1 = new Stave(10, 30, 700);
      staveBar1.setContext(ctx).draw();
      const notesBar1 = [
        { keys: ['a/5'], duration: '4', stem_direction: -1 },
        { keys: ['a/5'], duration: '4', stem_direction: -1 },
        { keys: ['a/5'], duration: '4', stem_direction: -1 },
        { keys: ['a/5'], duration: '4', stem_direction: -1 },
        { keys: ['a/5'], duration: '4', stem_direction: -1 },
        { keys: ['a/5'], duration: '4', stem_direction: -1 },
        { keys: ['a/5'], duration: '4', stem_direction: -1 },
        { keys: ['a/4'], duration: '4', stem_direction: 1 },
        { keys: ['a/4'], duration: '4', stem_direction: 1 },
        { keys: ['a/4'], duration: '4', stem_direction: 1 },
        { keys: ['a/4'], duration: '4', stem_direction: 1 },
        { keys: ['a/4'], duration: '4', stem_direction: 1 },
        { keys: ['a/4'], duration: '4', stem_direction: 1 },
      ].map((note: IStaveNoteStruct) => new StaveNote(note));

      notesBar1[0].addModifier(0, new Ornament('mordent'));
      notesBar1[1].addModifier(0, new Ornament('mordent_inverted'));
      notesBar1[2].addModifier(0, new Ornament('turn'));
      notesBar1[3].addModifier(0, new Ornament('turn_inverted'));
      notesBar1[4].addModifier(0, new Ornament('tr'));
      notesBar1[5].addModifier(0, new Ornament('upprall'));
      notesBar1[6].addModifier(0, new Ornament('downprall'));
      notesBar1[7].addModifier(0, new Ornament('prallup'));
      notesBar1[8].addModifier(0, new Ornament('pralldown'));
      notesBar1[9].addModifier(0, new Ornament('upmordent'));
      notesBar1[10].addModifier(0, new Ornament('downmordent'));
      notesBar1[11].addModifier(0, new Ornament('lineprall'));
      notesBar1[12].addModifier(0, new Ornament('prallprall'));

      // Helper function to justify and draw a 4/4 voice
      Formatter.FormatAndDraw(ctx, staveBar1, notesBar1);
    },

    drawOrnamentsDelayed: function(options, contextBuilder) {
      expect(0);

      // Get the rendering context
      const ctx = contextBuilder(options.elementId, 550, 195);

      // bar 1
      const staveBar1 = new Stave(10, 30, 500);
      staveBar1.setContext(ctx).draw();
      const notesBar1 = [
        { keys: ['a/4'], duration: '4', stem_direction: 1 },
        { keys: ['a/4'], duration: '4', stem_direction: 1 },
        { keys: ['a/4'], duration: '4', stem_direction: 1 },
        { keys: ['a/4'], duration: '4', stem_direction: 1 },
      ].map((note: IStaveNoteStruct) => new StaveNote(note));

      notesBar1[0].addModifier(0, new Ornament('turn').setDelayed(true));
      notesBar1[1].addModifier(0, new Ornament('turn_inverted').setDelayed(true));
      notesBar1[2].addModifier(0, new Ornament('turn_inverted').setDelayed(true));
      notesBar1[3].addModifier(0, new Ornament('turn').setDelayed(true));

      // Helper function to justify and draw a 4/4 voice
      Formatter.FormatAndDraw(ctx, staveBar1, notesBar1);
    },

    drawOrnamentsDelayedMultipleDraws: function(options, contextBuilder) {
      expect(0);

      // Get the rendering context
      const ctx = contextBuilder(options.elementId, 550, 195);

      // bar 1
      const staveBar1 = new Stave(10, 30, 500);
      staveBar1.setContext(ctx).draw();
      const notesBar1 = [
        { keys: ['a/4'], duration: '4', stem_direction: 1 },
        { keys: ['a/4'], duration: '4', stem_direction: 1 },
        { keys: ['a/4'], duration: '4', stem_direction: 1 },
        { keys: ['a/4'], duration: '4', stem_direction: 1 },
      ].map((note: IStaveNoteStruct) => new StaveNote(note));

      notesBar1[0].addModifier(0, new Ornament('turn').setDelayed(true));
      notesBar1[1].addModifier(0, new Ornament('turn_inverted').setDelayed(true));
      notesBar1[2].addModifier(0, new Ornament('turn_inverted').setDelayed(true));
      notesBar1[3].addModifier(0, new Ornament('turn').setDelayed(true));

      // Helper function to justify and draw a 4/4 voice
      Formatter.FormatAndDraw(ctx, staveBar1, notesBar1);
      Formatter.FormatAndDraw(ctx, staveBar1, notesBar1);
    },

    drawOrnamentsStacked: function(options, contextBuilder) {
      expect(0);

      // Get the rendering context
      const ctx = contextBuilder(options.elementId, 550, 195);

      // bar 1
      const staveBar1 = new Stave(10, 30, 500);
      staveBar1.setContext(ctx).draw();
      const notesBar1 = [
        { keys: ['a/4'], duration: '4', stem_direction: 1 },
        { keys: ['a/4'], duration: '4', stem_direction: 1 },
        { keys: ['a/4'], duration: '4', stem_direction: 1 },
        { keys: ['a/4'], duration: '4', stem_direction: 1 },
      ].map((note: IStaveNoteStruct) => new StaveNote(note));

      notesBar1[0].addModifier(0, new Ornament('mordent'));
      notesBar1[1].addModifier(0, new Ornament('turn_inverted'));
      notesBar1[2].addModifier(0, new Ornament('turn'));
      notesBar1[3].addModifier(0, new Ornament('turn_inverted'));

      notesBar1[0].addModifier(0, new Ornament('turn'));
      notesBar1[1].addModifier(0, new Ornament('prallup'));
      notesBar1[2].addModifier(0, new Ornament('upmordent'));
      notesBar1[3].addModifier(0, new Ornament('lineprall'));

      // Helper function to justify and draw a 4/4 voice
      Formatter.FormatAndDraw(ctx, staveBar1, notesBar1);
    },

    drawOrnamentsWithAccidentals: function(options, contextBuilder) {
      expect(0);

      // Get the rendering context
      const ctx = contextBuilder(options.elementId, 650, 250);

      // bar 1
      const staveBar1 = new Stave(10, 60, 600);
      staveBar1.setContext(ctx).draw();
      const notesBar1 = [
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
        { keys: ['f/4'], duration: '4', stem_direction: 1 },
      ].map((note: IStaveNoteStruct) => new StaveNote(note));

      notesBar1[0].addModifier(0, new Ornament('mordent').setUpperAccidental('#').setLowerAccidental('#'));
      notesBar1[1].addModifier(0, new Ornament('turn_inverted').setLowerAccidental('b').setUpperAccidental('b'));
      notesBar1[2].addModifier(0, new Ornament('turn').setUpperAccidental('##').setLowerAccidental('##'));
      notesBar1[3].addModifier(0, new Ornament('mordent_inverted').setLowerAccidental('db').setUpperAccidental('db'));
      notesBar1[4].addModifier(0, new Ornament('turn_inverted').setUpperAccidental('++').setLowerAccidental('++'));
      notesBar1[5].addModifier(0, new Ornament('tr').setUpperAccidental('n').setLowerAccidental('n'));
      notesBar1[6].addModifier(0, new Ornament('prallup').setUpperAccidental('d').setLowerAccidental('d'));
      notesBar1[7].addModifier(0, new Ornament('lineprall').setUpperAccidental('db').setLowerAccidental('db'));
      notesBar1[8].addModifier(0, new Ornament('upmordent').setUpperAccidental('bbs').setLowerAccidental('bbs'));
      notesBar1[9].addModifier(0, new Ornament('prallprall').setUpperAccidental('bb').setLowerAccidental('bb'));
      notesBar1[10].addModifier(0, new Ornament('turn_inverted').setUpperAccidental('+').setLowerAccidental('+'));

      // Helper function to justify and draw a 4/4 voice
      Formatter.FormatAndDraw(ctx, staveBar1, notesBar1);
    },

    jazzOrnaments: function(options) {
      expect(0);
      const vf = Test.makeFactory(options, 950, 400);
      const ctx = vf.getContext();
      ctx.scale(1, 1); ctx.setFillStyle('#221'); ctx.setStrokeStyle('#221');

      function newNote(keys, duration, modifier, stemDirection) {
        const dot = duration.indexOf('d') >= 0;
        const rv =  new StaveNote(<IStaveNoteStruct>{ keys, duration, stem_direction: stemDirection })
          .addModifier(0, modifier)
          .addAccidental(0, new Accidental('b'));
        if (dot) {
          rv.addDotToAll();
        }
        return rv;
      }

      const xStart = 10;
      const xWidth = 300;
      const yStart = 10;
      const staffHeight = 70;

      function draw(modifiers, keys, x, width, y, stemDirection?) {
        const notes = [];

        const stave = new Stave(x, y, width)
          .addClef('treble').setContext(ctx).draw();

        notes.push(newNote(keys, '4d', modifiers[0], stemDirection));
        notes.push(newNote(keys, '8', modifiers[1], stemDirection));
        notes.push(newNote(keys, '4d', modifiers[2], stemDirection));
        notes.push(newNote(keys, '8', modifiers[3], stemDirection));
        if (modifiers.length > 4) {
          notes[3].addModifier(0, modifiers[4]);
        }

        Beam.generateBeams(notes);
        const voice = new Voice(<IVoiceTime>{
          num_beats: 4,
          beat_value: 4
        }).setMode(Voice.Mode.SOFT);
        voice.addTickables(notes);
        const formatter = new Formatter(<IFormatterOptions>{ softmaxFactor: 2 }).joinVoices([voice]);
        formatter.format([voice], xWidth);
        stave.setContext(ctx).draw();
        voice.draw(ctx, stave);
      }
      let mods = [];
      let curX = xStart;
      let curY = yStart;
      mods.push(new Ornament('scoop'));
      mods.push(new Ornament('doit'));
      mods.push(new Ornament('fall'));
      mods.push(new Ornament('doitLong'));

      draw(mods, ['a/5'], curX, xWidth, curY, -1);
      curX += xWidth;

      mods = [];
      mods.push(new Ornament('fallLong'));
      mods.push(new Ornament('bend'));
      mods.push(new Ornament('plungerClosed'));
      mods.push(new Ornament('plungerOpen'));
      mods.push(new Ornament('bend'));
      draw(mods, ['a/5'], curX, xWidth, curY, -1);
      curX += xWidth;

      mods = [];
      mods.push(new Ornament('flip'));
      mods.push(new Ornament('jazzTurn'));
      mods.push(new Ornament('smear'));
      mods.push(new Ornament('doit'));
      draw(mods, ['a/5'], curX, xWidth, curY, 1);

      curX = xStart;
      curY += staffHeight;

      mods = [];
      mods.push(new Ornament('scoop'));
      mods.push(new Ornament('doit'));
      mods.push(new Ornament('fall'));
      mods.push(new Ornament('doitLong'));

      draw(mods, ['e/5'], curX, xWidth, curY);
      curX += xWidth;

      mods = [];
      mods.push(new Ornament('fallLong'));
      mods.push(new Ornament('bend'));
      mods.push(new Ornament('plungerClosed'));
      mods.push(new Ornament('plungerOpen'));
      mods.push(new Ornament('bend'));
      draw(mods, ['e/5'], curX, xWidth, curY);
      curX += xWidth;

      mods = [];
      mods.push(new Ornament('flip'));
      mods.push(new Ornament('jazzTurn'));
      mods.push(new Ornament('smear'));
      mods.push(new Ornament('doit'));
      draw(mods, ['e/5'], curX, xWidth, curY);

      curX = xStart;
      curY += staffHeight;

      mods = [];
      mods.push(new Ornament('scoop'));
      mods.push(new Ornament('doit'));
      mods.push(new Ornament('fall'));
      mods.push(new Ornament('doitLong'));

      draw(mods, ['e/4'], curX, xWidth, curY);
      curX += xWidth;

      mods = [];
      mods.push(new Ornament('fallLong'));
      mods.push(new Ornament('bend'));
      mods.push(new Ornament('plungerClosed'));
      mods.push(new Ornament('plungerOpen'));
      mods.push(new Ornament('bend'));
      draw(mods, ['e/4'], curX, xWidth, curY);
      curX += xWidth;

      mods = [];
      mods.push(new Ornament('flip'));
      mods.push(new Ornament('jazzTurn'));
      mods.push(new Ornament('smear'));
      mods.push(new Ornament('doit'));
      draw(mods, ['e/4'], curX, xWidth, curY);
    },
  };
})();
