/**
 * VexFlow - Registry Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import { EasyScore, Element, Factory, Registry } from '../src';
import { IEasyScoreOptions } from '../src/types/easyscore';

declare const QUnit: any;

export const RegistryTests = (function() {
  return {
    Start: function() {
      QUnit.module('Registry');

      QUnit.test('Register and Clear', this.registerAndClear);
      QUnit.test('Default Registry', this.defaultRegistry);
      QUnit.test('Multiple Classes', this.classes);
    },

    registerAndClear: function(assert) {
      const registry = new Registry();
      const score = new EasyScore(<IEasyScoreOptions>{ factory: Factory.newFromElementId(null) });

      registry.register(score.notes('C4')[0], 'foobar');

      const foobar = registry.getElementById('foobar');
      assert.ok(foobar);
      assert.equal(foobar.getAttribute('id'), 'foobar');

      registry.clear();
      assert.notOk(registry.getElementById('foobar'));
      assert.throws(function() { registry.register(<any>score.notes('C4')); });

      registry.clear();
      assert.ok(registry
        .register(score.notes('C4[id="boobar"]')[0])
        .getElementById('boobar'));
    },

    defaultRegistry: function(assert) {
      const registry = new Registry();
      const score = new EasyScore(<IEasyScoreOptions>{ factory: Factory.newFromElementId(null) });

      Registry.enableDefaultRegistry(registry);
      score.notes('C4[id="foobar"]');
      const note = registry.getElementById('foobar');
      assert.ok(note);

      note.setAttribute('id', 'boobar');
      assert.ok(registry.getElementById('boobar'));
      assert.notOk(registry.getElementById('foobar'));

      registry.clear();
      assert.equal(registry.getElementsByType('StaveNote').length, 0);

      score.notes('C5');
      const elements = registry.getElementsByType('StaveNote');
      assert.equal(elements.length, 1);
    },

    classes: function(assert) {
      const registry = new Registry();
      const score = new EasyScore(<IEasyScoreOptions>{ factory: Factory.newFromElementId(null) });

      Registry.enableDefaultRegistry(registry);
      score.notes('C4[id="foobar"]');
      const note = registry.getElementById('foobar');

      note.addClass('foo');
      assert.ok(note.hasClass('foo'));
      assert.notOk(note.hasClass('boo'));
      assert.equal(registry.getElementsByClass('foo').length, 1);
      assert.equal(registry.getElementsByClass('boo').length, 0);

      note.addClass('boo');
      assert.ok(note.hasClass('foo'));
      assert.ok(note.hasClass('boo'));
      assert.equal(registry.getElementsByClass('foo').length, 1);
      assert.equal(registry.getElementsByClass('boo').length, 1);

      note.removeClass('boo');
      note.removeClass('foo');
      assert.notOk(note.hasClass('foo'));
      assert.notOk(note.hasClass('boo'));
      assert.equal(registry.getElementsByClass('foo').length, 0);
      assert.equal(registry.getElementsByClass('boo').length, 0);
    },
  };
}());
