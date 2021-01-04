/**
 * VexFlow - Style Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import type { Factory } from '../src';
import { IFactoryParams } from '../src/types/factory';
import { IStaveNoteStruct } from '../src/types/note';
import Test from './vexflow_test_helpers';
import {
  Formatter,
  StaveModifier,
  Stroke,
  KeySignature,
  TimeSignature,
  Annotation,
  Articulation,
  Ornament, NoteSubGroup, TabStave, TabNote, Bend
} from '../src';

declare const QUnit: any;
declare function ok(...args);

export const StyleTests = (function() {
  const runTests = Test.runTests;

  function FS(fill, stroke?): any {
    const ret: any = { fillStyle: fill };
    if (stroke) {
      ret.strokeStyle = stroke;
    }
    return ret;
  }

  return {
    Start: function() {
      QUnit.module('Style');
      runTests('Basic Style', this.stave);
      runTests('TabNote modifiers Style', this.tab);
    },

    stave: function(options) {
      const vf: Factory = Test.makeFactory(options, 600, 150);
      const stave = vf.Stave({ x: 25, y: 20, width: 500 } as IFactoryParams);

      // Stave modifiers test.
      const keySig: KeySignature = new KeySignature('D');
      keySig.addToStave(stave);
      keySig.setStyle(FS('blue') as any);
      stave.addTimeSignature('4/4');
      const timeSig = stave.getModifiers(StaveModifier.Position.BEGIN, TimeSignature.CATEGORY);
      timeSig[0].setStyle(FS('brown'));

      const notes: any[] = [
        vf.StaveNote({ keys: ['c/4', 'e/4', 'a/4'], stem_direction: 1, duration: '4' } as IStaveNoteStruct)
          .addAccidental(0, vf.Accidental({ type: 'b' } as IFactoryParams))
          .addAccidental(1, vf.Accidental({ type: '#' } as IFactoryParams)),
        vf.StaveNote({ keys: ['c/4', 'e/4', 'a/4'], stem_direction: 1, duration: '4' } as IStaveNoteStruct)
          .addAccidental(0, vf.Accidental({ type: 'b' } as IFactoryParams))
          .addAccidental(1, vf.Accidental({ type: '#' } as IFactoryParams)),
        vf.StaveNote({ keys: ['e/4'], stem_direction: 1, duration: '4' } as IStaveNoteStruct),
        vf.StaveNote({ keys: ['f/4'], stem_direction: 1, duration: '8' } as IStaveNoteStruct),

        // voice.draw() test.
        vf.TextDynamics({ text: 'sfz', duration: '16' } as IFactoryParams).setStyle(FS('blue')),

        // GhostNote modifiers test.
        vf.GhostNote({ duration: '16' } as IStaveNoteStruct).addModifier(new Annotation('GhostNote green text').setStyle(FS('green'))),
      ];

      notes[0].setKeyStyle(0, FS('red'));
      notes[1].setKeyStyle(0, FS('red'));

      // StaveNote modifiers test.
      const mods1 = notes[1].getModifiers();
      mods1[0].setStyle(FS('green'));
      notes[0].addArticulation(0, new Articulation('a.').setPosition(4).setStyle(FS('green')));
      notes[0].addModifier(0, new Ornament('mordent').setStyle(FS('lightgreen')));

      notes[1].addModifier(0, new Annotation('blue').setStyle(FS('blue')));
      notes[1].addModifier(0,
        new NoteSubGroup([vf.ClefNote({ options: { size: 'small' } } as IFactoryParams).setStyle(FS('blue'))]));

      const voice = vf.Voice().addTickables(notes);

      vf.Formatter()
        .joinVoices([voice])
        .formatToStave([voice], stave);

      vf.draw();
      ok(true, 'Basic Style');
    },

    tab: function(options, contextBuilder) {
      const ctx = contextBuilder(options.elementId, 500, 140);
      ctx.fillStyle = '#221'; ctx.strokeStyle = '#221';
      ctx.font = ' 10pt Arial';
      const stave = new TabStave(10, 10, 450)
        .addTabGlyph();
      stave.getModifiers()[2].setStyle(FS('blue'));
      stave.setContext(ctx).draw();

      function newNote(tab_struct) { return new TabNote(tab_struct); }
      function newBend(text) { return new Bend(text); }
      function newAnnotation(text) { return new Annotation(text); }

      // TabNote modifiers test.
      const notes = [
        newNote({
          positions: [{ str: 2, fret: 10 }, { str: 4, fret: 9 }], duration: 'h',
        })
          .addModifier(newAnnotation('green text').setStyle(FS('green')), 0),
        newNote({
          positions: [{ str: 2, fret: 10 }, { str: 4, fret: 9 }], duration: 'h',
        })
          .addModifier(newBend('Full').setStyle(FS('brown')), 0)
          .addStroke(0, new Stroke(1, { all_voices: false }).setStyle(FS('blue'))),
      ];

      Formatter.FormatAndDraw(ctx, stave, notes, true);
      ok(true, 'TabNote modifiers Style');
    },
  };
})();
