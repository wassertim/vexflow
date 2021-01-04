/**
 * VexFlow - Annotation Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import Test from './vexflow_test_helpers';
import { Annotation, Beam, Bend, Formatter, Stave, StaveNote, TabNote, TabStave, Vex, Vibrato, Voice } from '../src';
import { IStaveNoteStruct } from '../src/types/note';

declare const QUnit: any;
declare function ok(...args);

export const AnnotationTests = (function() {
  const runTests = Test.runTests;
  return  {
    Start: function() {
      QUnit.module('Annotation');
      runTests('Simple Annotation', this.simple);
      runTests('Standard Notation Annotation', this.standard);
      runTests('Harmonics', this.harmonic);
      runTests('Fingerpicking', this.picking);
      runTests('Bottom Annotation', this.bottom);
      runTests('Bottom Annotations with Beams', this.bottomWithBeam);
      runTests('Test Justification Annotation Stem Up', this.justificationStemUp);
      runTests('Test Justification Annotation Stem Down', this.justificationStemDown);
      runTests('TabNote Annotations', this.tabNotes);
    },

    simple: function(options, contextBuilder) {
      const ctx = contextBuilder(options.elementId, 500, 240);
      ctx.scale(1.5, 1.5); ctx.fillStyle = '#221'; ctx.strokeStyle = '#221';
      ctx.font = ' 10pt Arial';
      const stave = new TabStave(10, 10, 450)
        .addTabGlyph().setContext(ctx).draw();

      function newNote(tab_struct) { return new TabNote(tab_struct); }
      function newBend(text) { return new Bend(text); }
      function newAnnotation(text) { return new Annotation(text); }

      const notes = [
        newNote({
          positions: [{ str: 2, fret: 10 }, { str: 4, fret: 9 }], duration: 'h',
        })
          .addModifier(newAnnotation('T'), 0),
        newNote({
          positions: [{ str: 2, fret: 10 }], duration: 'h',
        })
          .addModifier(newAnnotation('T'), 0)
          .addModifier(newBend('Full'), 0),
      ];

      Formatter.FormatAndDraw(ctx, stave, notes);
      ok(true, 'Simple Annotation');
    },

    standard: function(options, contextBuilder) {
      const ctx = contextBuilder(options.elementId, 500, 240);
      ctx.scale(1.5, 1.5); ctx.fillStyle = '#221'; ctx.strokeStyle = '#221';
      const stave = new Stave(10, 10, 450)
        .addClef('treble').setContext(ctx).draw();

      function newNote(note_struct) { return new StaveNote(note_struct); }
      function newAnnotation(text) {
        return (new Annotation(text)).setFont('Times',
          Test.Font.size, 'italic');
      }

      const notes = [
        newNote({ keys: ['c/4', 'e/4'], duration: 'h' })
          .addAnnotation(0, newAnnotation('quiet')),
        newNote({ keys: ['c/4', 'e/4', 'c/5'], duration: 'h' })
          .addAnnotation(2, newAnnotation('Allegro')),
      ];

      Formatter.FormatAndDraw(ctx, stave, notes);
      ok(true, 'Standard Notation Annotation');
    },

    harmonic: function(options, contextBuilder) {
      const ctx = contextBuilder(options.elementId, 500, 240);
      ctx.scale(1.5, 1.5); ctx.fillStyle = '#221'; ctx.strokeStyle = '#221';
      ctx.font = ' 10pt Arial';
      const stave = new TabStave(10, 10, 450)
        .addTabGlyph().setContext(ctx).draw();

      function newNote(tab_struct) { return new TabNote(tab_struct); }
      function newAnnotation(text) { return new Annotation(text); }

      const notes = [
        newNote({
          positions: [{ str: 2, fret: 12 }, { str: 3, fret: 12 }], duration: 'h',
        })
          .addModifier(newAnnotation('Harm.'), 0),
        newNote({
          positions: [{ str: 2, fret: 9 }], duration: 'h',
        })
          .addModifier(newAnnotation('(8va)').setFont('Times',
            Test.Font.size, 'italic'), 0)
          .addModifier(newAnnotation('A.H.'), 0),
      ];

      Formatter.FormatAndDraw(ctx, stave, notes);
      ok(true, 'Simple Annotation');
    },

    picking: function(options, contextBuilder) {
      const ctx = contextBuilder(options.elementId, 500, 240);
      ctx.scale(1.5, 1.5); ctx.setFillStyle('#221'); ctx.setStrokeStyle('#221');
      ctx.setFont('Arial', Test.Font.size, '');
      const stave = new TabStave(10, 10, 450)
        .addTabGlyph().setContext(ctx).draw();

      function newNote(tab_struct) { return new TabNote(tab_struct); }
      function newAnnotation(text) {
        return new Annotation(text)
          .setFont('Times', Test.Font.size, 'italic');
      }

      const notes = [
        newNote({
          positions: [
            { str: 1, fret: 0 },
            { str: 2, fret: 1 },
            { str: 3, fret: 2 },
            { str: 4, fret: 2 },
            { str: 5, fret: 0 },
          ], duration: 'h',
        })
          .addModifier(new Vibrato().setVibratoWidth(40)),
        newNote({
          positions: [{ str: 6, fret: 9 }], duration: '8',
        })
          .addModifier(newAnnotation('p'), 0),
        newNote({
          positions: [{ str: 3, fret: 9 }], duration: '8',
        })
          .addModifier(newAnnotation('i'), 0),
        newNote({
          positions: [{ str: 2, fret: 9 }], duration: '8',
        })
          .addModifier(newAnnotation('m'), 0),
        newNote({
          positions: [{ str: 1, fret: 9 }], duration: '8',
        })
          .addModifier(newAnnotation('a'), 0),
      ];

      Formatter.FormatAndDraw(ctx, stave, notes);
      ok(true, 'Fingerpicking');
    },

    bottom: function(options, contextBuilder) {
      const ctx = contextBuilder(options.elementId, 500, 240);
      ctx.scale(1.5, 1.5); ctx.fillStyle = '#221'; ctx.strokeStyle = '#221';
      const stave = new Stave(10, 10, 300)
        .addClef('treble').setContext(ctx).draw();

      function newNote(note_struct) { return new StaveNote(note_struct); }
      function newAnnotation(text) {
        return (
          new Annotation(text))
          .setFont('Times', Test.Font.size)
          .setVerticalJustification(Annotation.VerticalJustify.BOTTOM);
      }

      const notes = [
        newNote({ keys: ['f/4'], duration: 'w' })
          .addAnnotation(0, newAnnotation('F')),
        newNote({ keys: ['a/4'], duration: 'w' })
          .addAnnotation(0, newAnnotation('A')),
        newNote({ keys: ['c/5'], duration: 'w' })
          .addAnnotation(0, newAnnotation('C')),
        newNote({ keys: ['e/5'], duration: 'w' })
          .addAnnotation(0, newAnnotation('E')),
      ];

      Formatter.FormatAndDraw(ctx, stave, notes);
      ok(true, 'Bottom Annotation');
    },

    bottomWithBeam: function(options, contextBuilder) {
      const ctx = contextBuilder(options.elementId, 500, 240);
      ctx.scale(1.5, 1.5); ctx.fillStyle = '#221'; ctx.strokeStyle = '#221';
      const stave = new Stave(10, 10, 300)
        .addClef('treble').setContext(ctx).draw();

      // Create some notes
      const notes = [
        new StaveNote(<IStaveNoteStruct>{ keys: ['a/3'], duration: '8' })
          .addModifier(0, new Annotation('good')
            .setVerticalJustification(Annotation.VerticalJustify.BOTTOM)),

        new StaveNote(<IStaveNoteStruct>{ keys: ['g/3'], duration: '8' })
          .addModifier(0, new Annotation('even')
            .setVerticalJustification(Annotation.VerticalJustify.BOTTOM)),

        new StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '8' })
          .addModifier(0, new Annotation('under')
            .setVerticalJustification(Annotation.VerticalJustify.BOTTOM)),

        new StaveNote(<IStaveNoteStruct>{ keys: ['d/4'], duration: '8' })
          .addModifier(0, new Annotation('beam')
            .setVerticalJustification(Annotation.VerticalJustify.BOTTOM)),
      ];

      const beam = new Beam(notes.slice(1));

      Formatter.FormatAndDraw(ctx, stave, notes);
      beam.setContext(ctx).draw();
      ok(true, 'Bottom Annotation with Beams');
    },

    justificationStemUp: function(options, contextBuilder) {
      const ctx = contextBuilder(options.elementId, 650, 950);
      ctx.scale(1.5, 1.5); ctx.fillStyle = '#221'; ctx.strokeStyle = '#221';

      function newNote(note_struct) { return new StaveNote(note_struct); }
      function newAnnotation(text, hJustifcation, vJustifcation) {
        return (
          new Annotation(text))
          .setFont('Arial', Test.Font.size)
          .setJustification(hJustifcation)
          .setVerticalJustification(vJustifcation);
      }

      for (let v = 1; v <= 4; ++v) {
        const stave = new Stave(10, (v - 1) * 150 + 40, 400)
          .addClef('treble').setContext(ctx).draw();

        const notes = [];

        notes.push(newNote({ keys: ['c/3'], duration: 'q' }).addAnnotation(0, newAnnotation('Text', 1, v)));
        notes.push(newNote({ keys: ['c/4'], duration: 'q' }).addAnnotation(0, newAnnotation('Text', 2, v)));
        notes.push(newNote({ keys: ['c/5'], duration: 'q' }).addAnnotation(0, newAnnotation('Text', 3, v)));
        notes.push(newNote({ keys: ['c/6'], duration: 'q' }).addAnnotation(0, newAnnotation('Text', 4, v)));

        Formatter.FormatAndDraw(ctx, stave, notes);
      }

      ok(true, 'Test Justification Annotation');
    },

    justificationStemDown: function(options, contextBuilder) {
      const ctx = contextBuilder(options.elementId, 650, 1000);
      ctx.scale(1.5, 1.5); ctx.fillStyle = '#221'; ctx.strokeStyle = '#221';

      function newNote(note_struct) { return new StaveNote(note_struct); }
      function newAnnotation(text, hJustifcation, vJustifcation) {
        return (
          new Annotation(text))
          .setFont('Arial', Test.Font.size)
          .setJustification(hJustifcation)
          .setVerticalJustification(vJustifcation);
      }

      for (let v = 1; v <= 4; ++v) {
        const stave = new Stave(10, (v - 1) * 150 + 40, 400)
          .addClef('treble').setContext(ctx).draw();

        const notes = [];

        notes.push(newNote({ keys: ['c/3'], duration: 'q', stem_direction: -1 }).addAnnotation(0, newAnnotation('Text', 1, v)));
        notes.push(newNote({ keys: ['c/4'], duration: 'q', stem_direction: -1 }).addAnnotation(0, newAnnotation('Text', 2, v)));
        notes.push(newNote({ keys: ['c/5'], duration: 'q', stem_direction: -1 }).addAnnotation(0, newAnnotation('Text', 3, v)));
        notes.push(newNote({ keys: ['c/6'], duration: 'q', stem_direction: -1 }).addAnnotation(0, newAnnotation('Text', 4, v)));

        Formatter.FormatAndDraw(ctx, stave, notes);
      }

      ok(true, 'Test Justification Annotation');
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
        return new TabNote(noteSpec);
      });

      notes[0].addModifier(new Annotation('Text').setJustification(1).setVerticalJustification(1), 0); // U
      notes[1].addModifier(new Annotation('Text').setJustification(2).setVerticalJustification(2), 0); // D
      notes[2].addModifier(new Annotation('Text').setJustification(3).setVerticalJustification(3), 0); // U
      notes[3].addModifier(new Annotation('Text').setJustification(4).setVerticalJustification(4), 0); // D

      notes2[0].addModifier(new Annotation('Text').setJustification(3).setVerticalJustification(1), 0); // U
      notes2[1].addModifier(new Annotation('Text').setJustification(3).setVerticalJustification(2), 0); // D
      notes2[2].addModifier(new Annotation('Text').setJustification(3).setVerticalJustification(3), 0); // U
      notes2[3].addModifier(new Annotation('Text').setJustification(3).setVerticalJustification(4), 0); // D

      notes3[0].addModifier(new Annotation('Text').setVerticalJustification(1), 0); // U
      notes3[1].addModifier(new Annotation('Text').setVerticalJustification(2), 0); // D
      notes3[2].addModifier(new Annotation('Text').setVerticalJustification(3), 0); // U
      notes3[3].addModifier(new Annotation('Text').setVerticalJustification(4), 0); // D

      const voice = new Voice(Vex.Flow.TIME4_4).setMode(Voice.Mode.SOFT);

      voice.addTickables(notes);
      voice.addTickables(notes2);
      voice.addTickables(notes3);

      new Formatter().joinVoices([voice])
        .formatToStave([voice], stave);

      voice.draw(ctx, stave);

      ok(true, 'TabNotes successfully drawn');
    },
  };
})();
