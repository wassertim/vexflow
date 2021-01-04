/**
 * VexFlow - MultiMeasureRest Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import Test from './vexflow_test_helpers';
import { DEFAULT_NOTATION_FONT_SCALE } from '../src/flow';
import { IMultimeasureRestRenderOptions } from '../src/types/multimeasurerest';

declare const QUnit: any;
declare function ok(...args);

export const MultiMeasureRestTests = (function() {
  return {
    Start: function() {
      QUnit.module('MultiMeasureRest');
      Test.runTests('Simple Test', this.simple0);
      Test.runTests('Stave with modifiers Test', this.staveWithModifiers);
    },

    simple0: function(options) {
      const width = 910;
      const vf = Test.makeFactory(options, width, 300);
      const params = [
        { number_of_measures: 2, show_number: false },
        { number_of_measures: 2 },
        { number_of_measures: 2, line_thickness: 8, serif_thickness: 3 },
        { number_of_measures: 1, use_symbols: true },
        { number_of_measures: 2, use_symbols: true },
        { number_of_measures: 3, use_symbols: true },
        { number_of_measures: 4, use_symbols: true },
        { number_of_measures: 5, use_symbols: true },
        { number_of_measures: 6, use_symbols: true },
        { number_of_measures: 7, use_symbols: true },
        { number_of_measures: 8, use_symbols: true },
        { number_of_measures: 9, use_symbols: true },
        { number_of_measures: 10, use_symbols: true },
        { number_of_measures: 11, use_symbols: true },
        { number_of_measures: 11, use_symbols: false, padding_left: 20, padding_right: 20 },
        { number_of_measures: 11, use_symbols: true, symbol_spacing: 5 },
        { number_of_measures: 11, use_symbols: false, line: 3, number_line: 2 },
        { number_of_measures: 11, use_symbols: true, line: 3, number_line: 2 },
        [{ options: { spacing_between_lines_px: 15 } },
          { number_of_measures: 12 },
        ],
        [{ options: { spacing_between_lines_px: 15 } },
          { number_of_measures: 9, use_symbols: true },
        ],
        [{ options: { spacing_between_lines_px: 15 } },
          { number_of_measures: 12, spacing_between_lines_px: 15, number_glyph_point: 40 * 1.5 },
        ],
        [{ options: { spacing_between_lines_px: 15 } },
          { number_of_measures: 9, spacing_between_lines_px: 15, use_symbols: true,
            number_glyph_point: 40 * 1.5 },
        ],
        [{ options: { spacing_between_lines_px: 15 } },
          { number_of_measures: 9, spacing_between_lines_px: 15, use_symbols: true,
            number_glyph_point: 40 * 1.5,
            semibrave_rest_glyph_scale: DEFAULT_NOTATION_FONT_SCALE * 1.5 },
        ],
      ];

      const staveWidth = 100;
      let x = 0;
      let y = 0;
      const mmrests = params.map(function(param: any) {
        if ((x + (staveWidth * 2)) > width) {
          x = 0;
          y += 80;
        }
        let staveParams: any = {};
        let mmrestParams = param;
        if (param.length) {
          staveParams = param[0];
          mmrestParams = param[1];
        }
        staveParams.x = x;
        x += staveWidth;
        staveParams.y = y;
        staveParams.width = staveWidth;
        const stave = vf.Stave(staveParams);
        return vf.MultiMeasureRest(mmrestParams).setStave(stave);
      });

      vf.draw();

      const xs = mmrests[0].getXs();
      const strY = mmrests[0].getStave().getYForLine(-0.5);
      const str = 'TACET';
      const context = vf.getContext();
      context.save();
      context.setFont('Times', 16, 'bold');
      const metrics = context.measureText('TACET');
      context.fillText(str, xs.left + ((xs.right - xs.left) * 0.5) - (metrics.width * 0.5), strY);
      context.restore();

      ok(true, 'Simple Test');
    },
    staveWithModifiers: function(options) {
      const width = 910;
      const vf = Test.makeFactory(options, width, 200);
      // const stave = vf.Stave({ y: 20, width: 270 });
      let x = 0;
      let y = 0;

      const params = [
        [{ clef: 'treble', params: { width: 150 } },
          { number_of_measures: 5 },
        ],
        [{ clef: 'treble', keySig: 'G', params: { width: 150 } },
          { number_of_measures: 5 },
        ],
        [{ clef: 'treble', timeSig: '4/4', keySig: 'G', params: { width: 150 } },
          { number_of_measures: 5 },
        ],
        [{ clef: 'treble', endClef: 'bass', params: { width: 150 } },
          { number_of_measures: 5 },
        ],
        [{ clef: 'treble', endKeySig: 'F', params: { width: 150 } },
          { number_of_measures: 5 },
        ],
        [{ clef: 'treble', endTimeSig: '2/4', params: { width: 150 } },
          { number_of_measures: 5 },
        ],
        [{ clef: 'treble', endClef: 'bass', endTimeSig: '2/4', params: { width: 150 } },
          { number_of_measures: 5 },
        ],
        [{ clef: 'treble', endClef: 'bass', endTimeSig: '2/4', params: { width: 150 } },
          { number_of_measures: 5, use_symbols: true },
        ],
      ];

      params.map(function(param: IMultimeasureRestRenderOptions[]) {
        const staveOptions: any = param[0];
        const staveParams: any = staveOptions.params;
        const mmrestParams = param[1];

        if (x + staveParams.width > width) {
          x = 0;
          y += 80;
        }

        staveParams.x = x;
        x += staveParams.width;
        staveParams.y = y;
        const stave = vf.Stave(staveParams);
        if (staveOptions.clef) {
          stave.addClef(staveOptions.clef);
        }
        if (staveOptions.timeSig) {
          stave.addTimeSignature(staveOptions.timeSig);
        }
        if (staveOptions.keySig) {
          stave.addKeySignature(staveOptions.keySig);
        }
        if (staveOptions.endClef) {
          stave.addEndClef(staveOptions.endClef);
        }
        if (staveOptions.endKeySig) {
          stave.setEndKeySignature(staveOptions.endKeySig);
        }
        if (staveOptions.endTimeSig) {
          stave.setEndTimeSignature(staveOptions.endTimeSig);
        }
        return vf.MultiMeasureRest(mmrestParams).setStave(stave);
      });

      vf.draw();

      ok(true, 'Stave with modifiers Test');
    },
  };
}());
