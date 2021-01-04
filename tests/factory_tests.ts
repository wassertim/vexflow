/**
 * VexFlow - Factory Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import Test from './vexflow_test_helpers';
import { Factory, Stave, Vex } from '../src';
import { IStaveNoteStruct } from '../src/types/note';
import { ISystemParams } from '../src/types/system';
import { IStaveOptions } from '../src/types/stave';

declare const QUnit: any;
declare function expect(...args);
declare function equal(...args);

export const FactoryTests = (function() {
  return {
    Start: function() {
      QUnit.module('Factory');

      QUnit.test('Defaults', this.defaults);
      Test.runSVGTest('Draw', this.draw);
      Test.runSVGTest('Draw Tab (repeat barlines must be aligned)', this.drawTab);
    },

    defaults: function(assert) {
      assert.throws(function() {
        return new Factory(<IStaveOptions>{
          renderer: {
            width: 700,
            height: 500,
          },
        });
      });

      const vf = new Factory(<IStaveOptions>{
        renderer: {
          elementId: null,
          width: 700,
          height: 500,
        },
      });

      const options = vf.getOptions();
      assert.equal(options.renderer.width, 700);
      assert.equal(options.renderer.height, 500);
      assert.equal(options.renderer.elementId, null);
      assert.equal(options.stave.space, 10);
    },

    draw: function(options) {
      const vf = Factory.newFromElementId(options.elementId);
      vf.Stave().setClef('treble');
      vf.draw();
      expect(0);
    },

    drawTab: function(options) {
      const vf = Test.makeFactory(options, 500, 400);

      const system = vf.System();

      const stave = vf.Stave()
        .setClef('treble')
        .setKeySignature('C#')
        .setBegBarType(Vex.Flow.Barline.type.REPEAT_BEGIN);

      const voices = [
        vf.Voice().addTickables([
          vf.GhostNote(<IStaveNoteStruct>{ duration: 'w' })
        ])
      ];

      system.addStave(<ISystemParams>{
        stave: stave,
        voices: voices
      });

      const tabStave = vf.TabStave()
        .setClef('tab')
        .setBegBarType(Vex.Flow.Barline.type.REPEAT_BEGIN);

      const tabVoices = [
        vf.Voice().addTickables([
          vf.GhostNote(<IStaveNoteStruct>{ duration: 'w' })
        ])
      ];

      system.addStave(<ISystemParams>{
        stave: <Stave>tabStave,
        voices: tabVoices
      });

      vf.draw();
      equal(stave.getModifiers()[0].getX(), tabStave.getModifiers()[0].getX());
      expect(1);
    },
  };
})();
