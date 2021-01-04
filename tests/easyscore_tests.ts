/**
 * VexFlow - EasyScore Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import Test from './vexflow_test_helpers';
import { Articulation, EasyScore, FretHandFinger, Modifier, StaveConnector, StaveNote, Tuplet } from '../src';
import { ISystemParams } from '../src/types/system';

declare const QUnit: any;
declare function expect(...args);

export const EasyScoreTests = (function() {
  return {
    Start: function() {
      QUnit.module('EasyScore');
      QUnit.test('Basic', this.basic);
      QUnit.test('Accidentals', this.accidentals);
      QUnit.test('Durations', this.durations);
      QUnit.test('Chords', this.chords);
      QUnit.test('Dots', this.dots);
      QUnit.test('Options', this.options);
      Test.runTests('Draw Basic', this.drawBasicTest);
      Test.runTests('Draw Accidentals', this.drawAccidentalsTest);
      Test.runTests('Draw Beams', this.drawBeamsTest);
      Test.runTests('Draw Tuplets', this.drawTupletsTest);
      Test.runTests('Draw Dots',  this.drawDotsTest);
      Test.runTests('Draw Options', this.drawOptionsTest);
      Test.runTests('Draw Fingerings', this.drawFingeringsTest);
    },

    basic: function(assert) {
      const score = new EasyScore();
      const mustPass = ['c4', 'c#4', 'c4/r', 'c#5', 'c3/x', 'c3//x'];
      const mustFail = ['', '()', '7', '(c#4 e5 g6'];

      mustPass.forEach(function(line) { assert.equal(score.parse(line).success, true, line); });
      mustFail.forEach(function(line) { assert.equal(score.parse(line).success, false, line); });
    },

    accidentals: function(assert) {
      const score = new EasyScore();
      const mustPass = [
        'c3', 'c##3, cb3', 'Cn3', 'f3//x', '(c##3 cbb3 cn3), cb3',
        'cbbs7', 'cbb7', 'cbss7', 'cbs7', 'cb7', 'cdb7', 'cd7', 'c##7', 'c#7', 'cn7', 'c++-7',
        'c++7', 'c+-7', 'c+7', '(cbs3 bbs3 dbs3), ebs3', '(cd7 cbb3 cn3), cb3', 'co7', 'ck7',
      ];
      const mustFail = [
        'ct3', 'cdbb7', '(cq cbb3 cn3), cb3', '(cdd7 cbb3 cn3), cb3',
        'cbbbs7', 'cbbss7', 'cbsss7', 'csbs7', 'cddb7', 'cddbb7', 'cdd7', 'c##b7', 'c#bs7',
        'cnb#7', 'c+#+b-d7', 'c+--7', 'c++--7', 'c+++7', 'cbk7', 'cok7', 'cko7', 'c#s7',
      ];

      mustPass.forEach(function(line) { assert.equal(score.parse(line).success, true, line); });
      mustFail.forEach(function(line) { assert.equal(score.parse(line).success, false, line); });
    },

    durations: function(assert) {
      const score = new EasyScore();
      const mustPass = ['c3/4', 'c##3/w, cb3', 'c##3/w, cb3/q', 'c##3/q, cb3/32', '(c##3 cbb3 cn3), cb3'];
      const mustFail = ['Cn3/]', '/', '(cq cbb3 cn3), cb3', '(cdd7 cbb3 cn3), cb3'];

      mustPass.forEach(function(line) { assert.equal(score.parse(line).success, true, line); });
      mustFail.forEach(function(line) { assert.equal(score.parse(line).success, false, line); });
    },

    chords: function(assert) {
      const score = new EasyScore();
      const mustPass = [
        '(c5)', '(c3 e0 g9)',
        '(c##4 cbb4 cn4)/w, (c#5 cb2 a3)/32',
        '(d##4 cbb4 cn4)/w/r, (c#5 cb2 a3)',
        '(c##4 cbb4 cn4)/4, (c#5 cb2 a3)',
        '(c##4 cbb4 cn4)/x, (c#5 cb2 a3)',
      ];
      const mustFail = ['(c)'];

      mustPass.forEach(function(line) { assert.equal(score.parse(line).success, true, line); });
      mustFail.forEach(function(line) { assert.equal(score.parse(line).success, false, line); });
    },

    dots: function(assert) {
      const score = new EasyScore();
      const mustPass = [
        'c3/4.',
        'c##3/w.., cb3',
        'f##3/s, cb3/q...',
        'c##3/q, cb3/32',
        '(c##3 cbb3 cn3)., cb3',
        '(c5).',
        '(c##4 cbb4 cn4)/w.., (c#5 cb2 a3)/32',
      ];
      const mustFail = ['.', 'c.#', 'c#4./4'];

      mustPass.forEach(function(line) { assert.equal(score.parse(line).success, true, line); });
      mustFail.forEach(function(line) { assert.equal(score.parse(line).success, false, line); });
    },

    types: function(assert) {
      const score = new EasyScore();
      const mustPass = [
        'c3/4/x.',
        'c##3//r.., cb3',
        'c##3/x.., cb3',
        'c##3/r.., cb3',
        'd##3/w/s, cb3/q...',
        'c##3/q, cb3/32',
        '(c##3 cbb3 cn3)., cb3',
        '(c5).',
        '(c##4 cbb4 cn4)/w.., (c#5 cb2 a3)/32',
      ];
      const mustFail = ['c4/q/U', '(c##4, cbb4 cn4)/w.., (c#5 cb2 a3)/32'];

      mustPass.forEach(function(line) { assert.equal(score.parse(line).success, true, line); });
      mustFail.forEach(function(line) { assert.equal(score.parse(line).success, false, line); });
    },

    options: function(assert) {
      const score = new EasyScore();
      const mustPass = [
        'c3/4.[foo="bar"]',
        'c##3/w.., cb3[id="blah"]',
        'c##3/q, cb3/32',
        '(c##3 cbb3 cn3).[blah="bod4o"], cb3',
        '(c5)[fooooo="booo"]',
        'c#5[id="foobar"]',
      ];
      const mustFail = ['.[', 'f##3/w[], cb3/q...'];

      mustPass.forEach(function(line) { assert.equal(score.parse(line).success, true, line); });
      mustFail.forEach(function(line) { assert.equal(score.parse(line).success, false, line); });
    },

    drawBasicTest: function(options) {
      const vf = Test.makeFactory(options, 600, 350);
      const score = vf.EasyScore();
      const system = vf.System();

      const voice = score.voice.bind(score);
      const notes = score.notes.bind(score);

      system.addStave(<ISystemParams>{
        voices: [
          voice(notes('(d4 e4 g4)/q, c4/q, c4/q/r, c4/q', { stem: 'down' })),
          voice(notes('c#5/h., c5/q', { stem: 'up' })),
        ],
      }).addClef('treble');

      system.addStave(<ISystemParams>{
        voices: [voice(notes('c#3/q, cn3/q, bb3/q, d##3/q', { clef: 'bass' }))],
      }).addClef('bass');
      system.addConnector().setType(StaveConnector.type.BRACKET);

      vf.draw();
      expect(0);
    },

    drawAccidentalsTest: function(options) {
      const vf = Test.makeFactory(options, 600, 350);
      const score = vf.EasyScore();
      const system = vf.System();

      const voice = score.voice.bind(score);
      const notes = score.notes.bind(score);

      system.addStave(<ISystemParams>{
        voices: [
          voice(notes('(cbbs4 ebb4 gbss4)/q, cbs4/q, cdb4/q/r, cd4/q', { stem: 'down' })),
          voice(notes('c++-5/h., c++5/q', { stem: 'up' })),
        ],
      }).addClef('treble');

      system.addStave(<ISystemParams>{
        voices: [voice(notes('c+-3/q, c+3/q, bb3/q, d##3/q', { clef: 'bass' }))],
      }).addClef('bass');
      system.addConnector().setType(StaveConnector.type.BRACKET);

      vf.draw();
      expect(0);
    },

    drawBeamsTest: function(options) {
      const vf = Test.makeFactory(options, 600, 250);
      const score = vf.EasyScore();
      const system = vf.System();

      const voice = score.voice.bind(score);
      const notes = score.notes.bind(score);
      const beam = score.beam.bind(score);

      system.addStave(<ISystemParams>{
        voices: [
          voice(notes('(c4 e4 g4)/q, c4/q, c4/q/r, c4/q', { stem: 'down' })),
          voice(notes('c#5/h.', { stem: 'up' }).concat(beam(notes('c5/8, c5/8', { stem: 'up' })))),
        ],
      }).addClef('treble');

      vf.draw();
      expect(0);
    },

    drawTupletsTest: function(options) {
      const vf = Test.makeFactory(options, 600, 250);
      const score = vf.EasyScore();
      const system = vf.System();

      const voice = score.voice.bind(score);
      const notes = score.notes.bind(score);
      const tuplet = score.tuplet.bind(score);
      const beam = score.beam.bind(score);

      system.addStave(<ISystemParams>{
        voices: [
          voice(
            tuplet(
              notes('(c4 e4 g4)/q, cbb4/q, c4/q', { stem: 'down' }),
              { location: Tuplet.LOCATION_BOTTOM }
            ).concat(notes('c4/h', { stem: 'down' }))
          ),
          voice(
            notes('c#5/h.', { stem: 'up' })
              .concat(tuplet(beam(notes('cb5/8, cn5/8, c5/8', { stem: 'up' }))))
          ),
        ],
      }).addClef('treble');

      vf.draw();
      expect(0);
    },

    drawDotsTest: function(options) {
      const vf = Test.makeFactory(options, 600, 250);
      const score = vf.EasyScore();
      const system = vf.System();

      const voice = score.voice.bind(score);
      const notes = score.notes.bind(score);

      system.addStave(<ISystemParams>{
        voices: [
          voice(
            notes('(c4 e4 g4)/8., (c4 e4 g4)/8.., (c4 e4 g4)/8..., (c4 e4 g4)/8...., (c4 e4 g4)/16...')
          )
        ],
      }).addClef('treble');

      vf.draw();
      expect(0);
    },

    drawOptionsTest: function(options) {
      const vf = Test.makeFactory(options, 500, 200);
      const score = vf.EasyScore();
      const system = vf.System();

      const notes = <StaveNote[]>score
        .notes('B4/h[id="foobar", class="red,bold", stem="up", articulations="staccato.below,tenuto"], B4/q[articulations="accent.above"], B4/q[stem="down"]');

      system.addStave(<ISystemParams>{
        voices: [score.voice(notes)],
      });

      vf.draw();

      const assert = options.assert;
      assert.equal(notes[0].getAttribute('id'), 'foobar');
      assert.ok(notes[0].hasClass('red'));
      assert.ok(notes[0].hasClass('bold'));
      assert.equal(notes[0].modifiers[0].getCategory(), 'articulations');
      assert.equal((<Articulation>notes[0].modifiers[0]).type, 'a.');
      assert.equal((<Articulation>notes[0].modifiers[0]).position, Modifier.Position.BELOW);
      assert.equal(notes[0].modifiers[1].getCategory(), 'articulations');
      assert.equal((<Articulation>notes[0].modifiers[1]).type, 'a-');
      assert.equal((<Articulation>notes[0].modifiers[1]).position, Modifier.Position.ABOVE);
      assert.equal(notes[0].getStemDirection(), StaveNote.STEM_UP);
      assert.equal(notes[1].modifiers[0].getCategory(), 'articulations');
      assert.equal((<Articulation>notes[1].modifiers[0]).type, 'a>');
      assert.equal((<Articulation>notes[1].modifiers[0]).position, Modifier.Position.ABOVE);
      assert.equal(notes[2].getStemDirection(), StaveNote.STEM_DOWN);
    },

    drawFingeringsTest: function(options) {
      const vf = Test.makeFactory(options, 500, 200);
      const score = vf.EasyScore();
      const system = vf.System();

      const notes = score.notes('C4/q[fingerings="1"], E4[fingerings="3.above"], G4[fingerings="5.below"], (C4 E4 G4)[fingerings="1,3,5"]');

      system.addStave(<ISystemParams>{
        voices: [score.voice(notes)],
      });

      vf.draw();

      const assert = options.assert;
      assert.equal(notes[0].modifiers[0].getCategory(), 'frethandfinger');
      assert.equal((<FretHandFinger>notes[0].modifiers[0]).finger, '1');
      assert.equal((<FretHandFinger>notes[0].modifiers[0]).position, Modifier.Position.LEFT);
      assert.equal(notes[1].modifiers[0].getCategory(), 'frethandfinger');
      assert.equal((<FretHandFinger>notes[1].modifiers[0]).finger, '3');
      assert.equal((<FretHandFinger>notes[1].modifiers[0]).position, Modifier.Position.ABOVE);
      assert.equal(notes[2].modifiers[0].getCategory(), 'frethandfinger');
      assert.equal((<FretHandFinger>notes[2].modifiers[0]).finger, '5');
      assert.equal((<FretHandFinger>notes[2].modifiers[0]).position, Modifier.Position.BELOW);
      assert.equal(notes[3].modifiers[0].getCategory(), 'frethandfinger');
      assert.equal((<FretHandFinger>notes[3].modifiers[0]).finger, '1');
      assert.equal((<FretHandFinger>notes[3].modifiers[0]).position, Modifier.Position.LEFT);
      assert.equal(notes[3].modifiers[1].getCategory(), 'frethandfinger');
      assert.equal((<FretHandFinger>notes[3].modifiers[1]).finger, '3');
      assert.equal((<FretHandFinger>notes[3].modifiers[1]).position, Modifier.Position.LEFT);
      assert.equal(notes[3].modifiers[2].getCategory(), 'frethandfinger');
      assert.equal((<FretHandFinger>notes[3].modifiers[2]).finger, '5');
      assert.equal((<FretHandFinger>notes[3].modifiers[2]).position, Modifier.Position.LEFT);
    },
  };
})();
