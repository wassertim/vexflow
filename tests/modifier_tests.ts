/**
 * VexFlow - ModifierContext Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import { Modifier, ModifierContext } from '../src';

declare const QUnit: any;
declare function test(...args);
declare function equal(...args);

export const ModifierContextTests = (function() {
  return {
    Start: function() {
      QUnit.module('ModifierContext');
      test('Modifier Width Test', this.width);
      test('Modifier Management', this.management);
    },

    width: function() {
      const mc = new ModifierContext();
      equal(mc.getWidth(), 0, 'New modifier context has no width');
    },

    management: function() {
      const mc = new ModifierContext();
      const modifier1 = new Modifier();
      const modifier2 = new Modifier();

      mc.addModifier(modifier1);
      mc.addModifier(modifier2);

      const accidentals = mc.getModifiers('none');

      equal(accidentals.length, 2, 'Added two modifiers');
    },
  };
})();
