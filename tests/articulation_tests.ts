/**
 * VexFlow - Articulation Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import Test from './vexflow_test_helpers';
import { Articulation, Barline, Beam, Formatter, Stave, StaveNote, TabNote, TabStave, Vex, Voice } from '../src';
import { IStaveNoteStruct } from '../src/types/note';

declare const QUnit: any;
declare function ok(...args);
declare function expect(...args);

export const ArticulationTests = (function() {
  return {
    Start: function() {
      QUnit.module('Articulation');
      this.runTests('Articulation - Staccato/Staccatissimo', 'a.', 'av', this.drawArticulations.bind(this));
      this.runTests('Articulation - Accent/Tenuto', 'a>', 'a-', this.drawArticulations.bind(this));
      this.runTests('Articulation - Marcato/L.H. Pizzicato', 'a^', 'a+', this.drawArticulations.bind(this));
      this.runTests('Articulation - Snap Pizzicato/Fermata', 'ao', 'ao', this.drawArticulations.bind(this));
      this.runTests('Articulation - Up-stroke/Down-Stroke', 'a|', 'am', this.drawArticulations.bind(this));
      this.runTests('Articulation - Fermata Above/Below', 'a@a', 'a@u', this.drawFermata.bind(this));
      this.runTests('Articulation - Inline/Multiple', 'a.', 'a.', this.drawArticulations2.bind(this));
      this.runTests('TabNote Articulation', 'a.', 'a.', this.tabNotes.bind(this));
    },

    runTests: function(name, sym1, sym2, func) {
      const params = {
        sym1: sym1,
        sym2: sym2,
      };

      Test.runTests(name, func, params);
    },

    drawArticulations: function(options, contextBuilder) {
      const sym1 = options.params.sym1;
      const sym2 = options.params.sym2;

      expect(0);

      // Get the rendering context
      const ctx = contextBuilder(options.elementId, 625, 195);

      // bar 1
      const staveBar1 = new Stave(10, 30, 125);
      staveBar1.setContext(ctx).draw();
      const notesBar1 = [
        new StaveNote(<IStaveNoteStruct>{ keys: ['a/3'], duration: 'q', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['a/4'], duration: 'q', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: 'q', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['a/4'], duration: 'q', stem_direction: 1 }),
      ];
      notesBar1[0].addArticulation(0, new Articulation(sym1).setPosition(4));
      notesBar1[1].addArticulation(0, new Articulation(sym1).setPosition(4));
      notesBar1[2].addArticulation(0, new Articulation(sym1).setPosition(3));
      notesBar1[3].addArticulation(0, new Articulation(sym1).setPosition(3));

      // Helper function to justify and draw a 4/4 voice
      Formatter.FormatAndDraw(ctx, staveBar1, notesBar1);

      // bar 2 - juxtaposing second bar next to first bar
      const staveBar2 = new Stave(staveBar1.width + staveBar1.x, staveBar1.y, 125);
      staveBar2.setEndBarType(Barline.type.DOUBLE);
      staveBar2.setContext(ctx).draw();

      const notesBar2 = [
        new StaveNote(<IStaveNoteStruct>{ keys: ['c/5'], duration: 'q', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['a/5'], duration: 'q', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['c/5'], duration: 'q', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['a/5'], duration: 'q', stem_direction: -1 }),
      ];
      notesBar2[0].addArticulation(0, new Articulation(sym1).setPosition(3));
      notesBar2[1].addArticulation(0, new Articulation(sym1).setPosition(3));
      notesBar2[2].addArticulation(0, new Articulation(sym1).setPosition(4));
      notesBar2[3].addArticulation(0, new Articulation(sym1).setPosition(4));

      // Helper function to justify and draw a 4/4 voice
      Formatter.FormatAndDraw(ctx, staveBar2, notesBar2);

      // bar 3 - juxtaposing second bar next to first bar
      const staveBar3 = new Stave(staveBar2.width + staveBar2.x, staveBar2.y, 125);
      staveBar3.setContext(ctx).draw();

      const notesBar3 = [
        new StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: 'q', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['c/5'], duration: 'q', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: 'q', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['a/4'], duration: 'q', stem_direction: 1 }),
      ];
      notesBar3[0].addArticulation(0, new Articulation(sym2).setPosition(4));
      notesBar3[1].addArticulation(0, new Articulation(sym2).setPosition(4));
      notesBar3[2].addArticulation(0, new Articulation(sym2).setPosition(3));
      notesBar3[3].addArticulation(0, new Articulation(sym2).setPosition(3));

      // Helper function to justify and draw a 4/4 voice
      Formatter.FormatAndDraw(ctx, staveBar3, notesBar3);
      // bar 4 - juxtaposing second bar next to first bar
      const staveBar4 = new Stave(staveBar3.width + staveBar3.x, staveBar3.y, 125);
      staveBar4.setEndBarType(Barline.type.END);
      staveBar4.setContext(ctx).draw();

      const notesBar4 = [
        new StaveNote(<IStaveNoteStruct>{ keys: ['a/4'], duration: 'q', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['a/5'], duration: 'q', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['c/5'], duration: 'q', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['a/5'], duration: 'q', stem_direction: -1 }),
      ];
      notesBar4[0].addArticulation(0, new Articulation(sym2).setPosition(3));
      notesBar4[1].addArticulation(0, new Articulation(sym2).setPosition(3));
      notesBar4[2].addArticulation(0, new Articulation(sym2).setPosition(4));
      notesBar4[3].addArticulation(0, new Articulation(sym2).setPosition(4));

      // Helper function to justify and draw a 4/4 voice
      Formatter.FormatAndDraw(ctx, staveBar4, notesBar4);
    },

    drawFermata: function(options, contextBuilder) {
      const sym1 = options.params.sym1;
      const sym2 = options.params.sym2;

      expect(0);

      // Get the rendering context
      const ctx = contextBuilder(options.elementId, 400, 200);

      // bar 1
      const staveBar1 = new Stave(50, 30, 150);
      staveBar1.setContext(ctx).draw();
      const notesBar1 = [
        new StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: 'q', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['a/4'], duration: 'q', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: 'q', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['a/4'], duration: 'q', stem_direction: -1 }),
      ];
      notesBar1[0].addArticulation(0, new Articulation(sym1).setPosition(3));
      notesBar1[1].addArticulation(0, new Articulation(sym1).setPosition(3));
      notesBar1[2].addArticulation(0, new Articulation(sym2).setPosition(4));
      notesBar1[3].addArticulation(0, new Articulation(sym2).setPosition(4));

      // Helper function to justify and draw a 4/4 voice
      Formatter.FormatAndDraw(ctx, staveBar1, notesBar1);

      // bar 2 - juxtaposing second bar next to first bar
      const staveBar2 = new Stave(staveBar1.width + staveBar1.x, staveBar1.y, 150);
      staveBar2.setEndBarType(Barline.type.DOUBLE);
      staveBar2.setContext(ctx).draw();

      const notesBar2 = [
        new StaveNote(<IStaveNoteStruct>{ keys: ['c/5'], duration: 'q', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['a/5'], duration: 'q', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['c/5'], duration: 'q', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['a/5'], duration: 'q', stem_direction: -1 }),
      ];
      notesBar2[0].addArticulation(0, new Articulation(sym1).setPosition(3));
      notesBar2[1].addArticulation(0, new Articulation(sym1).setPosition(3));
      notesBar2[2].addArticulation(0, new Articulation(sym2).setPosition(4));
      notesBar2[3].addArticulation(0, new Articulation(sym2).setPosition(4));

      // Helper function to justify and draw a 4/4 voice
      Formatter.FormatAndDraw(ctx, staveBar2, notesBar2);
    },

    drawArticulations2: function(options, contextBuilder) {
      expect(0);

      // Get the rendering context
      const ctx = contextBuilder(options.elementId, 1000, 200);

      // bar 1
      const staveBar1 = new Stave(10, 30, 350);
      staveBar1.setContext(ctx).draw();
      const notesBar1 = [
        new StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '16', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['d/4'], duration: '16', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['e/4'], duration: '16', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['f/4'], duration: '16', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['g/4'], duration: '16', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['a/4'], duration: '16', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['b/4'], duration: '16', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['c/5'], duration: '16', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['d/5'], duration: '16', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['e/5'], duration: '16', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['f/5'], duration: '16', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['g/5'], duration: '16', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['a/5'], duration: '16', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['b/5'], duration: '16', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['c/6'], duration: '16', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['d/6'], duration: '16', stem_direction: -1 }),
      ];
      let i;
      for (i = 0; i < 16; i++) {
        notesBar1[i].addArticulation(0, new Articulation('a.').setPosition(4));
        notesBar1[i].addArticulation(0, new Articulation('a>').setPosition(4));

        if (i === 15) {
          notesBar1[i].addArticulation(0, new Articulation('a@u').setPosition(4));
        }
      }

      const beam1 = new Beam(notesBar1.slice(0, 8));
      const beam2 = new Beam(notesBar1.slice(8, 16));

      // Helper function to justify and draw a 4/4 voice
      Formatter.FormatAndDraw(ctx, staveBar1, notesBar1);
      beam1.setContext(ctx).draw();
      beam2.setContext(ctx).draw();

      // bar 2 - juxtaposing second bar next to first bar
      const staveBar2 = new Stave(staveBar1.width + staveBar1.x, staveBar1.y, 350);
      staveBar2.setContext(ctx).draw();
      const notesBar2 = [
        new StaveNote(<IStaveNoteStruct>{ keys: ['f/3'], duration: '16', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['g/3'], duration: '16', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['a/3'], duration: '16', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['b/3'], duration: '16', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '16', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['d/4'], duration: '16', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['e/4'], duration: '16', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['f/4'], duration: '16', stem_direction: 1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['g/4'], duration: '16', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['a/4'], duration: '16', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['b/4'], duration: '16', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['c/5'], duration: '16', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['d/5'], duration: '16', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['e/5'], duration: '16', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['f/5'], duration: '16', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['g/5'], duration: '16', stem_direction: -1 }),
      ];
      for (i = 0; i < 16; i++) {
        notesBar2[i].addArticulation(0, new Articulation('a-').setPosition(3));
        notesBar2[i].addArticulation(0, new Articulation('a^').setPosition(3));

        if (i === 15) {
          notesBar2[i].addArticulation(0, new Articulation('a@u').setPosition(4));
        }
      }

      const beam3 = new Beam(notesBar2.slice(0, 8));
      const beam4 = new Beam(notesBar2.slice(8, 16));

      // Helper function to justify and draw a 4/4 voice
      Formatter.FormatAndDraw(ctx, staveBar2, notesBar2);
      beam3.setContext(ctx).draw();
      beam4.setContext(ctx).draw();

      // bar 3 - juxtaposing second bar next to first bar
      const staveBar3 = new Stave(staveBar2.width + staveBar2.x, staveBar2.y, 75);
      staveBar3.setContext(ctx).draw();

      const notesBar3 = [
        new StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: 'w', stem_direction: 1 }),
      ];
      notesBar3[0].addArticulation(0, new Articulation('a-').setPosition(3));
      notesBar3[0].addArticulation(0, new Articulation('a>').setPosition(3));
      notesBar3[0].addArticulation(0, new Articulation('a@a').setPosition(3));

      // Helper function to justify and draw a 4/4 voice
      Formatter.FormatAndDraw(ctx, staveBar3, notesBar3);
      // bar 4 - juxtaposing second bar next to first bar
      const staveBar4 = new Stave(staveBar3.width + staveBar3.x, staveBar3.y, 150);
      staveBar4.setEndBarType(Barline.type.END);
      staveBar4.setContext(ctx).draw();

      const notesBar4 = [
        new StaveNote(<IStaveNoteStruct>{ keys: ['c/5'], duration: 'q', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['a/5'], duration: 'q', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['c/5'], duration: 'q', stem_direction: -1 }),
        new StaveNote(<IStaveNoteStruct>{ keys: ['a/5'], duration: 'q', stem_direction: -1 }),
      ];
      for (i = 0; i < 4; i++) {
        let position1 = 3;
        if (i > 1) {
          position1 = 4;
        }
        notesBar4[i].addArticulation(0, new Articulation('a-').setPosition(position1));
      }

      // Helper function to justify and draw a 4/4 voice
      Formatter.FormatAndDraw(ctx, staveBar4, notesBar4);
    },

    tabNotes: function(options, contextBuilder) {
      const ctx = new contextBuilder(options.elementId, 600, 200);
      ctx.font = '10pt Arial';
      const stave = new TabStave(10, 10, 550);
      stave.setContext(ctx);
      stave.draw();

      const specs = [
        { positions: [{ str: 3, fret: 6 }, { str: 4, fret: 25 }], duration: '8' },
        { positions: [{ str: 2, fret: 10 }, { str: 5, fret: 12 }], duration: '8' },
        { positions: [{ str: 1, fret: 6 }, { str: 3, fret: 5 }], duration: '8' },
        { positions: [{ str: 1, fret: 6 }, { str: 3, fret: 5 }], duration: '8' },
      ];

      const notes = specs.map(function(noteSpec: IStaveNoteStruct) {
        const tabNote = new TabNote(noteSpec);
        tabNote.render_options.draw_stem = true;
        return tabNote;
      });

      const notes2 = specs.map(function(noteSpec: IStaveNoteStruct) {
        const tabNote = new TabNote(noteSpec);
        tabNote.render_options.draw_stem = true;
        tabNote.setStemDirection(-1);
        return tabNote;
      });

      const notes3 = specs.map(function(noteSpec: IStaveNoteStruct) {
        const tabNote = new TabNote(noteSpec);
        return tabNote;
      });

      notes[0].addModifier(new Articulation('a>').setPosition(3), 0); // U
      notes[1].addModifier(new Articulation('a>').setPosition(4), 0); // D
      notes[2].addModifier(new Articulation('a.').setPosition(3), 0); // U
      notes[3].addModifier(new Articulation('a.').setPosition(4), 0); // D

      notes2[0].addModifier(new Articulation('a>').setPosition(3), 0);
      notes2[1].addModifier(new Articulation('a>').setPosition(4), 0);
      notes2[2].addModifier(new Articulation('a.').setPosition(3), 0);
      notes2[3].addModifier(new Articulation('a.').setPosition(4), 0);

      notes3[0].addModifier(new Articulation('a>').setPosition(3), 0);
      notes3[1].addModifier(new Articulation('a>').setPosition(4), 0);
      notes3[2].addModifier(new Articulation('a.').setPosition(3), 0);
      notes3[3].addModifier(new Articulation('a.').setPosition(4), 0);

      const voice = new Voice(Vex.Flow.TIME4_4).setMode(Voice.Mode.SOFT);

      voice.addTickables(notes);
      voice.addTickables(notes2);
      voice.addTickables(notes3);

      new Formatter()
        .joinVoices([voice])
        .formatToStave([voice], stave);

      voice.draw(ctx, stave);

      ok(true, 'TabNotes successfully drawn');
    },
  };
}());
