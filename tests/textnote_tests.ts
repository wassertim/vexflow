/**
 * VexFlow - Text Note Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import Test from './vexflow_test_helpers';
import { IFactoryParams } from '../src/types/factory';
import { IStaveNoteStruct } from '../src/types/note';
import { Crescendo, Note, TextNote } from '../src';
import { UNICODE } from '../src/tables';
import { IFont } from '../src/types/font';

declare const QUnit: any;
declare function ok(...args);

export const TextNoteTests = (function() {
  return  {
    Start: function() {
      const runTests = Test.runTests;

      QUnit.module('TextNote');
      runTests('TextNote Formatting', this.formatTextNotes);
      runTests('TextNote Formatting 2', this.formatTextNotes2);
      runTests('TextNote Superscript and Subscript', this.superscriptAndSubscript);
      runTests('TextNote Formatting With Glyphs 0', this.formatTextGlyphs0);
      runTests('TextNote Formatting With Glyphs 1', this.formatTextGlyphs1);
      runTests('Crescendo', this.crescendo);
      runTests('Text Dynamics', this.textDynamics);
    },

    formatTextNotes: function(options) {
      const vf = Test.makeFactory(options, 400, 200);
      const stave = vf.Stave(<IFactoryParams>{ y: 40 });
      const score = vf.EasyScore();

      const voice1 = score.voice([
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4', 'e/4', 'a/4'], stem_direction: -1, duration: 'h' })
          .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: 'b' }))
          .addAccidental(1, vf.Accidental(<IFactoryParams>{ type: '#' })),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['d/4', 'e/4', 'f/4'], stem_direction: -1, duration: 'q' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4', 'f/4', 'a/4'], stem_direction: -1, duration: 'q' })
          .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: 'n' }))
          .addAccidental(1, vf.Accidental(<IFactoryParams>{ type: '#' })),
      ]);

      const voice2 = score.voice([
        vf.TextNote(<IStaveNoteStruct>{ text: 'Center Justification', duration: 'h' })
          .setJustification(TextNote.Justification.CENTER),
        vf.TextNote(<IStaveNoteStruct>{ text: 'Left Line 1', duration: 'q' })
          .setLine(1),
        vf.TextNote(<IStaveNoteStruct>{ text: 'Right', duration: 'q' })
          .setJustification(TextNote.Justification.RIGHT),
      ]);

      const formatter = vf.Formatter();
      formatter.joinVoices([voice1, voice2]).formatToStave([voice1, voice2], stave);

      vf.draw();
      ok(true);
    },

    formatTextNotes2: function(options) {
      const vf = Test.makeFactory(options, 600, 200);
      const stave = vf.Stave(<IFactoryParams>{ y: 40 });
      const score = vf.EasyScore();

      const voice1 = score.voice([
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['g/4'], stem_direction: 1, duration: '16' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['g/4'], stem_direction: 1, duration: '16' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['g/4'], stem_direction: 1, duration: '16' }),

        vf.StaveNote(<IStaveNoteStruct>{ keys: ['g/5'], stem_direction: -1, duration: '16' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['g/5'], stem_direction: -1, duration: '16' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['g/5'], stem_direction: -1, duration: '16' }),

        vf.StaveNote(<IStaveNoteStruct>{ keys: ['g/5', 'a/5'], stem_direction: -1, duration: '16' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['g/5', 'a/5'], stem_direction: -1, duration: '16' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['g/5', 'a/5'], stem_direction: -1, duration: '16' }),

        vf.StaveNote(<IStaveNoteStruct>{ keys: ['g/4', 'a/4'], stem_direction: 1, duration: '16' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['g/4', 'a/4'], stem_direction: 1, duration: '16' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['g/4', 'a/4'], stem_direction: 1, duration: '16' }),

        vf.StaveNote(<IStaveNoteStruct>{ keys: ['g/4', 'a/4'], stem_direction: 1, duration: 'q' }),
      ]);

      const voice2 = score.voice([
        vf.TextNote(<IStaveNoteStruct>{ text: 'C',  duration: '16' })
          .setJustification(TextNote.Justification.CENTER),
        vf.TextNote(<IStaveNoteStruct>{ text: 'L', duration: '16' }),
        vf.TextNote(<IStaveNoteStruct>{ text: 'R', duration: '16' }).setJustification(TextNote.Justification.RIGHT),

        vf.TextNote(<IStaveNoteStruct>{ text: 'C',  duration: '16' }).setJustification(TextNote.Justification.CENTER),
        vf.TextNote(<IStaveNoteStruct>{ text: 'L', duration: '16' }),
        vf.TextNote(<IStaveNoteStruct>{ text: 'R', duration: '16' }).setJustification(TextNote.Justification.RIGHT),

        vf.TextNote(<IStaveNoteStruct>{ text: 'C',  duration: '16' }).setJustification(TextNote.Justification.CENTER),
        vf.TextNote(<IStaveNoteStruct>{ text: 'L', duration: '16' }),
        vf.TextNote(<IStaveNoteStruct>{ text: 'R', duration: '16' }).setJustification(TextNote.Justification.RIGHT),

        vf.TextNote(<IStaveNoteStruct>{ text: 'C',  duration: '16' }).setJustification(TextNote.Justification.CENTER),
        vf.TextNote(<IStaveNoteStruct>{ text: 'L', duration: '16' }),
        vf.TextNote(<IStaveNoteStruct>{ text: 'R', duration: '16' }).setJustification(TextNote.Justification.RIGHT),

        vf.TextNote(<IStaveNoteStruct>{ text: 'R', duration: 'q' }).setJustification(TextNote.Justification.RIGHT),
      ]);

      vf.Formatter()
        .joinVoices([voice1, voice2])
        .formatToStave([voice1, voice2], stave);

      voice2.getTickables().forEach(note => Note.plotMetrics(vf.getContext(), note, 170));

      vf.draw();

      ok(true);
    },

    superscriptAndSubscript: function(options) {
      const vf = Test.makeFactory(options, 600, 230);
      const stave = vf.Stave(<IFactoryParams>{ y: 40 });
      const score = vf.EasyScore();

      const voice1 = score.voice([
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4', 'e/4', 'a/4'], stem_direction: 1, duration: 'h' })
          .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: 'b' }))
          .addAccidental(1, vf.Accidental(<IFactoryParams>{ type: '#' })),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['d/4', 'e/4', 'f/4'], stem_direction: 1, duration: 'q' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4', 'f/4', 'a/4'], stem_direction: 1, duration: 'q' })
          .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: 'n' }))
          .addAccidental(1, vf.Accidental(<IFactoryParams>{ type: '#' })),
      ]);

      const voice2 = score.voice([
        vf.TextNote(<IStaveNoteStruct>{ text: UNICODE.flat + 'I', superscript: '+5', duration: '8' }),
        vf.TextNote(<IStaveNoteStruct>{ text: 'D' + UNICODE.sharp + '/F',  duration: '4d', superscript: 'sus2' }),
        vf.TextNote(<IStaveNoteStruct>{ text: 'ii', superscript: '6', subscript: '4',  duration: '8' }),
        vf.TextNote(<IStaveNoteStruct>{ text: 'C', superscript: UNICODE.triangle + '7', subscript: '', duration: '8' }),
        vf.TextNote(<IStaveNoteStruct>{ text: 'vii', superscript: UNICODE['o-with-slash'] + '7', duration: '8' }),
        vf.TextNote(<IStaveNoteStruct>{ text: 'V', superscript: '7',   duration: '8' }),
      ]);

      voice2.getTickables().forEach(function(note: TextNote) {
        note.font = <IFont>{ family: 'Serif', size: 15, weight: '' };
        note.setLine(13);
        note.setJustification(TextNote.Justification.LEFT);
      });

      vf.Formatter()
        .joinVoices([voice1, voice2])
        .formatToStave([voice1, voice2], stave);

      vf.draw();

      ok(true);
    },

    formatTextGlyphs0: function(options) {
      const vf = Test.makeFactory(options, 600, 230);
      const stave = vf.Stave(<IFactoryParams>{ y: 40 });
      const score = vf.EasyScore();

      const voice1 = score.voice([
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4', 'e/4', 'a/4'], stem_direction: -1, duration: 'h' })
          .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: 'b' }))
          .addAccidental(1, vf.Accidental(<IFactoryParams>{ type: '#' })),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['d/4', 'e/4', 'f/4'], stem_direction: -1, duration: '8' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4', 'f/4', 'a/4'], stem_direction: -1, duration: '8' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4', 'f/4', 'a/4'], stem_direction: -1, duration: '8' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4', 'f/4', 'a/4'], stem_direction: -1, duration: '8' }),
      ]);

      const voice2 = score.voice([
        vf.TextNote(<IStaveNoteStruct>{ text: 'Center',  duration: '8' })
          .setJustification(TextNote.Justification.CENTER),
        vf.TextNote(<IStaveNoteStruct>{ glyph: 'f', duration: '8' }),
        vf.TextNote(<IStaveNoteStruct>{ glyph: 'p', duration: '8' }),
        vf.TextNote(<IStaveNoteStruct>{ glyph: 'm', duration: '8' }),
        vf.TextNote(<IStaveNoteStruct>{ glyph: 'z', duration: '8' }),

        vf.TextNote(<IStaveNoteStruct>{ glyph: 'mordent_upper', duration: '16' }),
        vf.TextNote(<IStaveNoteStruct>{ glyph: 'mordent_lower', duration: '16' }),
        vf.TextNote(<IStaveNoteStruct>{ glyph: 'segno', duration: '8' }),
        vf.TextNote(<IStaveNoteStruct>{ glyph: 'coda', duration: '8' }),
      ]);

      voice2.getTickables().forEach((n: TextNote) => n.setJustification(TextNote.Justification.CENTER));

      vf.Formatter()
        .joinVoices([voice1, voice2])
        .formatToStave([voice1, voice2], stave);

      vf.draw();

      ok(true);
    },

    formatTextGlyphs1: function(options) {
      const vf = Test.makeFactory(options, 600, 230);
      const stave = vf.Stave(<IFactoryParams>{ y: 40 });
      const score = vf.EasyScore();

      const voice1 = score.voice([
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4', 'e/4', 'a/4'], stem_direction: -1, duration: 'h' })
          .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: 'b' }))
          .addAccidental(1, vf.Accidental(<IFactoryParams>{ type: '#' })),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['d/4', 'e/4', 'f/4'], stem_direction: -1, duration: '8' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4', 'f/4', 'a/4'], stem_direction: -1, duration: '8' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4', 'f/4', 'a/4'], stem_direction: -1, duration: '8' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4', 'f/4', 'a/4'], stem_direction: -1, duration: '8' }),
      ]);

      const voice2 = score.voice([
        vf.TextNote(<IStaveNoteStruct>{ glyph: 'turn',  duration: '16' }),
        vf.TextNote(<IStaveNoteStruct>{ glyph: 'turn_inverted',  duration: '16' }),
        vf.TextNote(<IStaveNoteStruct>{ glyph: 'pedal_open', duration: '8' }).setLine(10),
        vf.TextNote(<IStaveNoteStruct>{ glyph: 'pedal_close', duration: '8' }).setLine(10),
        vf.TextNote(<IStaveNoteStruct>{ glyph: 'caesura_curved', duration: '8' }).setLine(3),
        vf.TextNote(<IStaveNoteStruct>{ glyph: 'caesura_straight', duration: '8' }).setLine(3),
        vf.TextNote(<IStaveNoteStruct>{ glyph: 'breath', duration: '8' }).setLine(2),
        vf.TextNote(<IStaveNoteStruct>{ glyph: 'tick', duration: '8' }).setLine(3),
        vf.TextNote(<IStaveNoteStruct>{ glyph: 'tr', duration: '8', smooth: true })
          .setJustification(TextNote.Justification.CENTER),
      ]);

      voice2.getTickables().forEach((n: TextNote) => n.setJustification(TextNote.Justification.CENTER));

      vf.Formatter()
        .joinVoices([voice1, voice2])
        .formatToStave([voice1, voice2], stave);

      vf.draw();

      ok(true);
    },

    crescendo: function(options) {
      const vf = Test.makeFactory(options, 600, 230);
      const stave = vf.Stave(<IFactoryParams>{ y: 40 });
      const score = vf.EasyScore();

      const voice = score.voice([
        vf.TextNote(<IStaveNoteStruct>{ glyph: 'p', duration: '16' }),
        new Crescendo(<IStaveNoteStruct>{ duration: '4d' })
          .setLine(0)
          .setHeight(25)
          .setStave(stave),
        vf.TextNote(<IStaveNoteStruct>{ glyph: 'f', duration: '16' }),
        new Crescendo(<IStaveNoteStruct>{ duration: '4' })
          .setLine(5)
          .setStave(stave),
        new Crescendo(<IStaveNoteStruct>{ duration: '4' })
          .setLine(10)
          .setDecrescendo(true)
          .setHeight(5)
          .setStave(stave),
      ]);

      vf.Formatter()
        .joinVoices([voice])
        .formatToStave([voice], stave);

      vf.draw();

      ok(true);
    },

    textDynamics: function(options) {
      const vf = Test.makeFactory(options, 600, 230);
      const stave = vf.Stave(<IFactoryParams>{ y: 40 });
      const score = vf.EasyScore();

      const voice = score.voice([
        vf.TextDynamics(<IFactoryParams>{ text: 'sfz', duration: '4' }),
        vf.TextDynamics(<IFactoryParams>{ text: 'rfz', duration: '4' }),
        vf.TextDynamics(<IFactoryParams>{ text: 'mp',  duration: '4' }),
        vf.TextDynamics(<IFactoryParams>{ text: 'ppp', duration: '4' }),

        vf.TextDynamics(<IFactoryParams>{ text: 'fff', duration: '4' }),
        vf.TextDynamics(<IFactoryParams>{ text: 'mf',  duration: '4' }),
        vf.TextDynamics(<IFactoryParams>{ text: 'sff', duration: '4' }),
      ], { time: '7/4' });

      vf.Formatter()
        .joinVoices([voice])
        .formatToStave([voice], stave);

      vf.draw();

      ok(true);
    },
  };
})();
