/**
 * VexFlow - StaveLine Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import Test from './vexflow_test_helpers';
import { IStaveNoteStruct } from '../src/types/note';
import { IFactoryParams } from '../src/types/factory';

declare const QUnit: any;
declare function ok(...args);

export const StaveLineTests = (function() {
  return {
    Start: function() {
      QUnit.module('StaveLine');
      Test.runTests('Simple StaveLine', this.simple0);
      Test.runTests('StaveLine Arrow Options', this.simple1);
    },

    simple0: function(options) {
      const vf = Test.makeFactory(options);
      const stave = vf.Stave().addTrebleGlyph();

      const notes = [
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '4', clef: 'treble' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/5'], duration: '4', clef: 'treble' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4', 'g/4', 'b/4'], duration: '4', clef: 'treble' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['f/4', 'a/4', 'f/5'], duration: '4', clef: 'treble' }),
      ];

      const voice = vf.Voice().addTickables(notes);

      vf.StaveLine(<IFactoryParams>{
        from: notes[0],
        to: notes[1],
        first_indices: [0],
        last_indices: [0],
        options: {
          font: { family: 'serif', size: 12, weight: 'italic' },
          text: 'gliss.',
        },
      });

      const staveLine2 = vf.StaveLine(<IFactoryParams>{
        from: notes[2],
        to: notes[3],
        first_indices: [2, 1, 0],
        last_indices: [0, 1, 2],
      });
      staveLine2.render_options.line_dash = [10, 10];

      vf.Formatter()
        .joinVoices([voice])
        .formatToStave([voice], stave);

      vf.draw();

      ok(true);
    },

    simple1: function(options) {
      const vf = Test.makeFactory(options, 770);
      const stave = vf.Stave().addTrebleGlyph();

      const notes = [
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c#/5', 'd/5'], duration: '4', clef: 'treble', stem_direction: -1 })
          .addDotToAll(),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '4', clef: 'treble' })
          .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: '#' })),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4', 'e/4', 'g/4'], duration: '4', clef: 'treble' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['f/4', 'a/4', 'c/5'], duration: '4', clef: 'treble' })
          .addAccidental(2, vf.Accidental(<IFactoryParams>{ type: '#' })),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4'], duration: '4', clef: 'treble' })
          .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: '#' })),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c#/5', 'd/5'], duration: '4', clef: 'treble', stem_direction: -1 }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/4', 'd/4', 'g/4'], duration: '4', clef: 'treble' }),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['f/4', 'a/4', 'c/5'], duration: '4', clef: 'treble' })
          .addAccidental(2, vf.Accidental(<IFactoryParams>{ type: '#' })),
      ];
      const voice = vf.Voice().setStrict(false).addTickables(notes);

      const staveLine0 = vf.StaveLine(<IFactoryParams>{
        from: notes[0],
        to: notes[1],
        first_indices: [0],
        last_indices: [0],
        options: {
          text: 'Left',
        },
      });

      const staveLine4 = vf.StaveLine(<IFactoryParams>{
        from: notes[2],
        to: notes[3],
        first_indices: [1],
        last_indices: [1],
        options: {
          text: 'Right',
        },
      });

      const staveLine1 = vf.StaveLine(<IFactoryParams>{
        from: notes[4],
        to: notes[5],
        first_indices: [0],
        last_indices: [0],
        options: {
          text: 'Center',
        },
      });

      const staveLine2 = vf.StaveLine(<IFactoryParams>{
        from: notes[6],
        to: notes[7],
        first_indices: [1],
        last_indices: [0],
      });

      const staveLine3 = vf.StaveLine(<IFactoryParams>{
        from: notes[6],
        to: notes[7],
        first_indices: [2],
        last_indices: [2],
        options: {
          text: 'Top',
        },
      });

      staveLine0.render_options.draw_end_arrow = true;
      staveLine0.render_options.text_justification = 1;
      staveLine0.render_options.text_position_vertical = 2;

      staveLine1.render_options.draw_end_arrow = true;
      staveLine1.render_options.arrowhead_length = 30;
      staveLine1.render_options.line_width = 5;
      staveLine1.render_options.text_justification = 2;
      staveLine1.render_options.text_position_vertical = 2;

      staveLine4.render_options.line_width = 2;
      staveLine4.render_options.draw_end_arrow = true;
      staveLine4.render_options.draw_start_arrow = true;
      staveLine4.render_options.arrowhead_angle = 0.5;
      staveLine4.render_options.arrowhead_length = 20;
      staveLine4.render_options.text_justification = 3;
      staveLine4.render_options.text_position_vertical = 2;

      staveLine2.render_options.draw_start_arrow = true;
      staveLine2.render_options.line_dash = [5, 4];

      staveLine3.render_options.draw_end_arrow = true;
      staveLine3.render_options.draw_start_arrow = true;
      staveLine3.render_options.color = 'red';
      staveLine3.render_options.text_position_vertical = 1;

      vf.Formatter()
        .joinVoices([voice])
        .formatToStave([voice], stave);

      vf.draw();

      ok(true);
    },
  };
}());
