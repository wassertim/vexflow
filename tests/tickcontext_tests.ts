/**
 * VexFlow - TickContext Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import { TickContext, Vex } from '../src';
import { MockTickable } from './mocks';

declare const QUnit: any;
declare function test(...args);
declare function equal(...args);

export const TickContextTests = (function() {
  const VF = Vex.Flow;

  return {
    Start: function() {
      QUnit.module('TickContext');
      test('Current Tick Test', this.currentTick.bind(this));
      test('Tracking Test', this.tracking.bind(this));
    },

    currentTick: function() {
      const tc = new TickContext();
      equal(tc.getCurrentTick().value(), 0, 'New tick context has no ticks');
    },

    tracking: function() {
      function createTickable() {
        return new MockTickable(VF.TIME4_4);
      }

      const R = VF.RESOLUTION;
      const BEAT = 1 * R / 4;

      const tickables = [
        createTickable().setTicks(BEAT).setWidth(10),
        createTickable().setTicks(BEAT * 2).setWidth(20),
        createTickable().setTicks(BEAT).setWidth(30),
      ];

      const tc = new TickContext();
      tc.setPadding(0);

      tc.addTickable(tickables[0]);
      equal(tc.getMaxTicks().value(), BEAT);

      tc.addTickable(tickables[1]);
      equal(tc.getMaxTicks().value(), BEAT * 2);

      tc.addTickable(tickables[2]);
      equal(tc.getMaxTicks().value(), BEAT * 2);

      equal(tc.getWidth(), 0);
      tc.preFormat();
      equal(tc.getWidth(), 30);
    },
  };
})();
