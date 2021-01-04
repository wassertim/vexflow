/**
 * VexFlow - GlyphNote Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import Test from './vexflow_test_helpers';
import { Glyph, Registry, StaveConnector } from '../src';
import { ISystemOptions, ISystemParams } from '../src/types/system';
import { INoteStruct, IStaveNoteStruct } from '../src/types/note';
import { IGlyphNoteOptions } from '../src/types/glyphnote';

declare const QUnit: any;
declare function ok(...args);

export const GlyphNoteTests = (function() {
  const run = Test.runTests;

  return {
    Start: function() {
      QUnit.module('GlyphNote');
      run('GlyphNote Positioning', this.basic, { debug: false, noPadding: false });
      run('GlyphNote No Stave Padding', this.basic, { debug: true, noPadding: true });
      run('GlyphNote RepeatNote', this.repeatNote, { debug: false, noPadding: true });
    },

    basic: function(options) {
      Registry.enableDefaultRegistry(new Registry());

      const vf = Test.makeFactory(options, 300, 400);
      const system = vf.System(<ISystemOptions>{
        x: 50,
        width: 250,
        debugFormatter: options.params.debug,
        noPadding: options.params.noPadding,
        options: { alpha: options.params.alpha }
      });

      const score = vf.EasyScore();

      const newVoice = function(notes) {
        return score.voice(notes, { time: '1/4' });
      };

      const newStave = function(voice) {
        return system
          .addStave(<ISystemParams>{ voices: [voice], debugNoteMetrics: options.params.debug });
      };

      const voices = [
        [vf.GlyphNote(new Glyph('repeat1Bar', 40), <IStaveNoteStruct>{ duration: 'q' }, <IGlyphNoteOptions>{ line: 4 })],
        [vf.GlyphNote(new Glyph('repeat2Bars', 40), <IStaveNoteStruct>{ duration: 'q', align_center: true })],
        [
          vf.GlyphNote(new Glyph('repeatBarSlash', 40), <IStaveNoteStruct>{ duration: '16' }),
          vf.GlyphNote(new Glyph('repeatBarSlash', 40), <IStaveNoteStruct>{ duration: '16' }),
          vf.GlyphNote(new Glyph('repeat4Bars', 40), <IStaveNoteStruct>{ duration: '16' }),
          vf.GlyphNote(new Glyph('repeatBarSlash', 40), <IStaveNoteStruct>{ duration: '16' }),
        ],
      ];

      voices.map(newVoice).forEach(newStave);
      system.addConnector().setType(StaveConnector.type.BRACKET);

      vf.draw();

      Registry.disableDefaultRegistry();
      ok(true);
    },

    repeatNote: function(options) {
      Registry.enableDefaultRegistry(new Registry());

      const vf = Test.makeFactory(options, 300, 500);
      const system = vf.System(<ISystemOptions>{
        x: 50,
        width: 250,
        debugFormatter: options.params.debug,
        noPadding: options.params.noPadding,
        options: { alpha: options.params.alpha }
      });

      const score = vf.EasyScore();

      const newVoice = function(notes) {
        return score.voice(notes, { time: '1/4' });
      };

      const newStave = function(voice) {
        return system
          .addStave(<ISystemParams>{ voices: [voice], debugNoteMetrics: options.params.debug });
      };

      const voices = [
        [vf.RepeatNote('1')],
        [vf.RepeatNote('2')],
        [vf.RepeatNote('4')],
        [
          vf.RepeatNote('slash', <INoteStruct>{ duration: '16' }),
          vf.RepeatNote('slash', <INoteStruct>{ duration: '16' }),
          vf.RepeatNote('slash', <INoteStruct>{ duration: '16' }),
          vf.RepeatNote('slash', <INoteStruct>{ duration: '16' }),
        ],
      ];

      voices.map(newVoice).forEach(newStave);
      system.addConnector().setType(StaveConnector.type.BRACKET);

      vf.draw();

      Registry.disableDefaultRegistry();
      ok(true);
    },
  };
})();
