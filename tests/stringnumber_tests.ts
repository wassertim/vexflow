/**
 * VexFlow - StringNumber Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import Test from './vexflow_test_helpers';
import { IFactoryParams } from '../src/types/factory';
import { Barline, Note, Renderer, StaveNote, Stroke, Voice } from '../src';
import { IStaveNoteStruct } from '../src/types/note';

declare const QUnit: any;
declare function ok(...args);

export const StringNumberTests = (function() {
  return {
    Start: function() {
      const run = Test.runTests;

      QUnit.module('StringNumber');

      run('String Number In Notation', this.drawMultipleMeasures);
      run('Fret Hand Finger In Notation', this.drawFretHandFingers);
      run('Multi Voice With Strokes, String & Finger Numbers', this.multi);
      run('Complex Measure With String & Finger Numbers', this.drawAccidentals);
    },

    drawMultipleMeasures: function(options) {
      const vf = Test.makeFactory(options, 775, 200);
      const score = vf.EasyScore();

      // bar 1
      const stave1 = vf.Stave(<IFactoryParams>{ width: 300 })
        .setEndBarType(Barline.type.DOUBLE)
        .addClef('treble');

      const notes1 = <StaveNote[]>score.notes(
        '(c4 e4 g4)/4., (c5 e5 g5)/8, (c4 f4 g4)/4, (c4 f4 g4)/4',
        { stem: 'down' }
      );

      notes1[0]
        .addModifier(0, vf.StringNumber(<IFactoryParams>{ number: '5', position: 'right' }))
        .addModifier(1, vf.StringNumber(<IFactoryParams>{ number: '4', position: 'left' }))
        .addModifier(2, vf.StringNumber(<IFactoryParams>{ number: '3', position: 'right' }));

      notes1[1]
        .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addModifier(0, vf.StringNumber(<IFactoryParams>{ number: '5', position: 'below' }))
        .addAccidental(1, vf.Accidental(<IFactoryParams>{ type: '#' }).setAsCautionary())
        .addModifier(2, vf.StringNumber(<IFactoryParams>{ number: '3', position: 'above' })
          .setLastNote(notes1[3])
          .setLineEndType(Renderer.LineEndType.DOWN));

      notes1[2]
        .addModifier(0, vf.StringNumber(<IFactoryParams>{ number: '5', position: 'left' }))
        .addModifier(2, vf.StringNumber(<IFactoryParams>{ number: '3', position: 'left' }))
        .addAccidental(1, vf.Accidental(<IFactoryParams>{ type: '#' }));

      notes1[3]
        .addModifier(0, vf.StringNumber(<IFactoryParams>{ number: '5', position: 'right' }).setOffsetY(7))
        .addModifier(1, vf.StringNumber(<IFactoryParams>{ number: '4', position: 'right' }).setOffsetY(6))
        .addModifier(2, vf.StringNumber(<IFactoryParams>{ number: '3', position: 'right' }).setOffsetY(-6));

      const voice1 = score.voice(notes1);

      vf.Formatter()
        .joinVoices([voice1])
        .formatToStave([voice1], stave1);

      // bar 2 - juxtaposing second bar next to first bar
      const stave2 = vf.Stave(<IFactoryParams>{ x: stave1.width + stave1.x, y: stave1.y, width: 300 })
        .setEndBarType(Barline.type.DOUBLE);

      const notes2 = <StaveNote[]>score.notes(
        '(c4 e4 g4)/4, (c5 e5 g5), (c4 f4 g4), (c4 f4 g4)',
        { stem: 'up' }
      );

      notes2[0]
        .addModifier(0, vf.StringNumber(<IFactoryParams>{ number: '5', position: 'right' }))
        .addModifier(1, vf.StringNumber(<IFactoryParams>{ number: '4', position: 'left' }))
        .addModifier(2, vf.StringNumber(<IFactoryParams>{ number: '3', position: 'right' }));

      notes2[1]
        .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addModifier(0, vf.StringNumber(<IFactoryParams>{ number: '5', position: 'below' }))
        .addAccidental(1, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addModifier(2, vf.StringNumber(<IFactoryParams>{ number: '3', position: 'above' }).setLastNote(notes2[3]).setDashed(false));

      notes2[2]
        .addModifier(2, vf.StringNumber(<IFactoryParams>{ number: '3', position: 'left' }))
        .addAccidental(1, vf.Accidental(<IFactoryParams>{ type: '#' }));

      notes2[3]
        .addModifier(0, vf.StringNumber(<IFactoryParams>{ number: '5', position: 'right' }).setOffsetY(7))
        .addModifier(1, vf.StringNumber(<IFactoryParams>{ number: '4', position: 'right' }).setOffsetY(6))
        .addModifier(2, vf.StringNumber(<IFactoryParams>{ number: '3', position: 'right' }).setOffsetY(-6));

      const voice2 = score.voice(notes2);

      vf.Formatter()
        .joinVoices([voice2])
        .formatToStave([voice2], stave2);

      // bar 3 - juxtaposing third bar next to second bar
      const stave3 = vf.Stave(<IFactoryParams>{ x: stave2.width + stave2.x, y: stave2.y, width: 150 })
        .setEndBarType(Barline.type.END);

      const notesBar3 = <StaveNote[]>score.notes('(c4 e4 g4 a4)/1.');

      notesBar3[0]
        .addModifier(0, vf.StringNumber(<IFactoryParams>{ number: '5', position: 'below' }))
        .addModifier(1, vf.StringNumber(<IFactoryParams>{ number: '4', position: 'right' }))
        .addModifier(2, vf.StringNumber(<IFactoryParams>{ number: '3', position: 'left' }))
        .addModifier(3, vf.StringNumber(<IFactoryParams>{ number: '2', position: 'above' }));

      const voice3 = score.voice(notesBar3, { time: '6/4' });

      vf.Formatter()
        .joinVoices([voice3])
        .formatToStave([voice3], stave3);

      vf.draw();

      ok(true, 'String Number');
    },

    drawFretHandFingers: function(options) {
      const vf = Test.makeFactory(options, 725, 200);
      const score = vf.EasyScore();

      // bar 1
      const stave1 = vf.Stave(<IFactoryParams>{ width: 350 })
        .setEndBarType(Barline.type.DOUBLE)
        .addClef('treble');

      const notes1 = <StaveNote[]>score.notes(
        '(c4 e4 g4)/4, (c5 e5 g5), (c4 f4 g4), (c4 f4 g4)',
        { stem: 'down' }
      );

      notes1[0]
        .addModifier(0, vf.Fingering(<IFactoryParams>{ number: '3', position: 'left' }))
        .addModifier(1, vf.Fingering(<IFactoryParams>{ number: '2', position: 'left' }))
        .addModifier(2, vf.Fingering(<IFactoryParams>{ number: '0', position: 'left' }));

      notes1[1]
        .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addModifier(0, vf.Fingering(<IFactoryParams>{ number: '3', position: 'left' }))
        .addModifier(1, vf.Fingering(<IFactoryParams>{ number: '2', position: 'left' }))
        .addAccidental(1, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addModifier(2, vf.Fingering(<IFactoryParams>{ number: '0', position: 'left' }));

      notes1[2]
        .addModifier(0, vf.Fingering(<IFactoryParams>{ number: '3', position: 'below' }))
        .addModifier(1, vf.Fingering(<IFactoryParams>{ number: '4', position: 'left' }))
        .addModifier(1, vf.StringNumber(<IFactoryParams>{ number: '4', position: 'left' }))
        .addModifier(2, vf.Fingering(<IFactoryParams>{ number: '0', position: 'above' }))
        .addAccidental(1, vf.Accidental(<IFactoryParams>{ type: '#' }));

      notes1[3]
        .addModifier(0, vf.Fingering(<IFactoryParams>{ number: '3', position: 'right' }))
        .addModifier(0, vf.StringNumber(<IFactoryParams>{ number: '5', position: 'right' }).setOffsetY(7))
        .addModifier(1, vf.Fingering(<IFactoryParams>{ number: '4', position: 'right' }))
        .addModifier(1, vf.StringNumber(<IFactoryParams>{ number: '4', position: 'right' }).setOffsetY(6))
        .addModifier(2, vf.Fingering(<IFactoryParams>{ number: '0', position: 'right' }).setOffsetY(-5))
        .addModifier(2, vf.StringNumber(<IFactoryParams>{ number: '3', position: 'right' }).setOffsetY(-6));

      const voice1 = score.voice(notes1);

      vf.Formatter()
        .joinVoices([voice1])
        .formatToStave([voice1], stave1);

      // bar 2 - juxtaposing second bar next to first bar
      const stave2 = vf.Stave(<IFactoryParams>{ x: stave1.width + stave1.x, y: stave1.y, width: 350 })
        .setEndBarType(Barline.type.END);

      const notes2 = <StaveNote[]>score.notes(
        '(c4 e4 g4)/4., (c5 e5 g5)/8, (c4 f4 g4)/8, (c4 f4 g4)/4.[stem="down"]',
        { stem: 'up' }
      );

      notes2[0]
        .addModifier(0, vf.Fingering(<IFactoryParams>{ number: '3', position: 'right' }))
        .addModifier(1, vf.Fingering(<IFactoryParams>{ number: '2', position: 'left' }))
        .addModifier(1, vf.StringNumber(<IFactoryParams>{ number: '4', position: 'right' }))
        .addModifier(2, vf.Fingering(<IFactoryParams>{ number: '0', position: 'above' }));

      notes2[1]
        .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addModifier(0, vf.Fingering(<IFactoryParams>{ number: '3', position: 'right' }))
        .addModifier(1, vf.Fingering(<IFactoryParams>{ number: '2', position: 'left' }))
        .addAccidental(1, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addModifier(2, vf.Fingering(<IFactoryParams>{ number: '0', position: 'left' }));

      notes2[2]
        .addModifier(0, vf.Fingering(<IFactoryParams>{ number: '3', position: 'below' }))
        .addModifier(1, vf.Fingering(<IFactoryParams>{ number: '2', position: 'left' }))
        .addModifier(1, vf.StringNumber(<IFactoryParams>{ number: '4', position: 'left' }))
        .addModifier(2, vf.Fingering(<IFactoryParams>{ number: '1', position: 'right' }))
        .addAccidental(2, vf.Accidental(<IFactoryParams>{ type: '#' }));

      notes2[3]
        .addModifier(0, vf.Fingering(<IFactoryParams>{ number: '3', position: 'right' }))
        .addModifier(0, vf.StringNumber(<IFactoryParams>{ number: '5', position: 'right' }).setOffsetY(7))
        .addModifier(1, vf.Fingering(<IFactoryParams>{ number: '4', position: 'right' }))
        .addModifier(1, vf.StringNumber(<IFactoryParams>{ number: '4', position: 'right' }).setOffsetY(6))
        .addModifier(2, vf.Fingering(<IFactoryParams>{ number: '1', position: 'right' }).setOffsetY(-6))
        .addModifier(2, vf.StringNumber(<IFactoryParams>{ number: '3', position: 'right' }).setOffsetY(-6));

      const voice2 = score.voice(notes2);

      vf.Formatter()
        .joinVoices([voice2])
        .formatToStave([voice2], stave2);

      vf.draw();

      ok(true, 'String Number');
    },

    multi: function(options) {
      const vf = Test.makeFactory(options, 700, 200);
      const score = vf.EasyScore();
      const stave = vf.Stave();

      const notes1 = <StaveNote[]>score.notes(
        '(c4 e4 g4)/4, (a3 e4 g4), (c4 d4 a4), (c4 d4 a4)',
        { stem: 'up' }
      );

      notes1[0]
        .addStroke(0, new Stroke(5))
        .addModifier(0, vf.Fingering(<IFactoryParams>{ number: '3', position: 'left' }))
        .addModifier(1, vf.Fingering(<IFactoryParams>{ number: '2', position: 'left' }))
        .addModifier(2, vf.Fingering(<IFactoryParams>{ number: '0', position: 'left' }))
        .addModifier(1, vf.StringNumber(<IFactoryParams>{ number: '4', position: 'left' }))
        .addModifier(2, vf.StringNumber(<IFactoryParams>{ number: '3', position: 'above' }));

      notes1[1]
        .addStroke(0, new Stroke(6))
        .addModifier(1, vf.StringNumber(<IFactoryParams>{ number: '4', position: 'right' }))
        .addModifier(2, vf.StringNumber(<IFactoryParams>{ number: '3', position: 'above' }))
        .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addAccidental(1, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addAccidental(2, vf.Accidental(<IFactoryParams>{ type: '#' }));

      notes1[2]
        .addStroke(0, new Stroke(2))
        .addModifier(0, vf.Fingering(<IFactoryParams>{ number: '3', position: 'left' }))
        .addModifier(1, vf.Fingering(<IFactoryParams>{ number: '0', position: 'right' }))
        .addModifier(1, vf.StringNumber(<IFactoryParams>{ number: '4', position: 'right' }))
        .addModifier(2, vf.Fingering(<IFactoryParams>{ number: '1', position: 'left' }))
        .addModifier(2, vf.StringNumber(<IFactoryParams>{ number: '3', position: 'right' }));

      notes1[3]
        .addStroke(0, new Stroke(1))
        .addModifier(2, vf.StringNumber(<IFactoryParams>{ number: '3', position: 'left' }))
        .addModifier(1, vf.StringNumber(<IFactoryParams>{ number: '4', position: 'right' }));

      const notes2 = <StaveNote[]>score.notes('e3/8, e3, e3, e3, e3, e3, e3, e3', { stem: 'down' });

      notes2[0]
        .addModifier(0, vf.Fingering(<IFactoryParams>{ number: '0', position: 'left' }))
        .addModifier(0, vf.StringNumber(<IFactoryParams>{ number: '6', position: 'below' }));

      notes2[2]
        .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: '#' }));

      notes2[4]
        .addModifier(0, vf.Fingering(<IFactoryParams>{ number: '0', position: 'left' }));

      // Position string number 6 beneath the strum arrow: left (15) and down (18)
      notes2[4]
        .addModifier(0, vf.StringNumber(<IFactoryParams>{ number: '6', position: 'left' }).setOffsetX(15).setOffsetY(18));

      const voices: Voice[] = [notes1, notes2].map(score.voice.bind(score));

      vf.Formatter()
        .joinVoices(voices)
        .formatToStave(voices, stave);

      vf.Beam(<IFactoryParams>{ notes: <Note[]>notes2.slice(0, 4) });
      vf.Beam(<IFactoryParams>{ notes: <Note[]>notes2.slice(4, 8) });

      vf.draw();

      ok(true, 'Strokes Test Multi Voice');
    },

    drawAccidentals: function(options) {
      const vf = Test.makeFactory(options, 500);

      const stave = vf.Stave()
        .setEndBarType(Barline.type.DOUBLE)
        .addClef('treble');

      const notes = [
        vf.StaveNote(<IStaveNoteStruct>{
          keys: ['c/4', 'e/4', 'g/4', 'c/5', 'e/5', 'g/5'],
          stem_direction: 1,
          duration: '4'
        }),
        vf.StaveNote(<IStaveNoteStruct>{
          keys: ['c/4', 'e/4', 'g/4', 'd/5', 'e/5', 'g/5'],
          stem_direction: 1,
          duration: '4'
        }),
        vf.StaveNote(<IStaveNoteStruct>{
          keys: ['c/4', 'e/4', 'g/4', 'd/5', 'e/5', 'g/5'],
          stem_direction: -1,
          duration: '4'
        }),
        vf.StaveNote(<IStaveNoteStruct>{
          keys: ['c/4', 'e/4', 'g/4', 'd/5', 'e/5', 'g/5'],
          stem_direction: -1,
          duration: '4'
        }),
      ];

      notes[0]
        .addModifier(0, vf.Fingering(<IFactoryParams>{ number: '3', position: 'left' }))
        .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addModifier(1, vf.Fingering(<IFactoryParams>{ number: '2', position: 'left' }))
        .addModifier(1, vf.StringNumber(<IFactoryParams>{ number: '2', position: 'left' }))
        .addAccidental(1, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addModifier(2, vf.Fingering(<IFactoryParams>{ number: '0', position: 'left' }))
        .addAccidental(2, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addModifier(3, vf.Fingering(<IFactoryParams>{ number: '3', position: 'left' }))
        .addAccidental(3, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addModifier(4, vf.Fingering(<IFactoryParams>{ number: '2', position: 'right' }))
        .addModifier(4, vf.StringNumber(<IFactoryParams>{ number: '3', position: 'right' }))
        .addAccidental(4, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addModifier(5, vf.Fingering(<IFactoryParams>{ number: '0', position: 'left' }))
        .addAccidental(5, vf.Accidental(<IFactoryParams>{ type: '#' }));

      notes[1]
        .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addAccidental(1, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addAccidental(2, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addAccidental(3, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addAccidental(4, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addAccidental(5, vf.Accidental(<IFactoryParams>{ type: '#' }));

      notes[2]
        .addModifier(0, vf.Fingering(<IFactoryParams>{ number: '3', position: 'left' }))
        .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addModifier(1, vf.Fingering(<IFactoryParams>{ number: '2', position: 'left' }))
        .addModifier(1, vf.StringNumber(<IFactoryParams>{ number: '2', position: 'left' }))
        .addAccidental(1, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addModifier(2, vf.Fingering(<IFactoryParams>{ number: '0', position: 'left' }))
        .addAccidental(2, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addModifier(3, vf.Fingering(<IFactoryParams>{ number: '3', position: 'left' }))
        .addAccidental(3, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addModifier(4, vf.Fingering(<IFactoryParams>{ number: '2', position: 'right' }))
        .addModifier(4, vf.StringNumber(<IFactoryParams>{ number: '3', position: 'right' }))
        .addAccidental(4, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addModifier(5, vf.Fingering(<IFactoryParams>{ number: '0', position: 'left' }))
        .addAccidental(5, vf.Accidental(<IFactoryParams>{ type: '#' }));

      notes[3]
        .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addAccidental(1, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addAccidental(2, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addAccidental(3, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addAccidental(4, vf.Accidental(<IFactoryParams>{ type: '#' }))
        .addAccidental(5, vf.Accidental(<IFactoryParams>{ type: '#' }));

      const voice = vf.Voice().addTickables(notes);

      vf.Formatter()
        .joinVoices([voice])
        .formatToStave([voice], stave);

      vf.draw();

      ok(true, 'String Number');
    },
  };
})();
