/**
 * VexFlow - Annotation Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import Test from './vexflow_test_helpers';
import { Accidental, ChordSymbol, Formatter, Stave, StaveNote } from '../src';
import { IStaveNoteStruct } from '../src/types/note';

declare const QUnit: any;
declare function ok(...args);

export const ChordSymbolTests = (function() {
  const runSVG = Test.runSVGTest;
  return {
    Start: function() {
      QUnit.module('ChordSymbol');
      runSVG('Chord Symbol Font Size Tests', this.fontSize);
      runSVG('Top Chord Symbols', this.top);
      runSVG('Chord Symbol Kerning Tests', this.kern);
      runSVG('Top Chord Symbols Justified', this.topJustify);
      runSVG('Bottom Chord Symbols', this.bottom);
      runSVG('Bottom Stem Down Chord Symbols', this.bottomStemDown);
      runSVG('Double Bottom Chord Symbols', this.dblbottom);
    },

    kern: function(options) {
      const vf = Test.makeFactory(options, 650, 650);
      const ctx = vf.getContext();
      ctx.scale(1.5, 1.5); ctx.setFillStyle('#221'); ctx.setStrokeStyle('#221');

      function newNote(keys, duration, chordSymbol) {
        return new StaveNote(<IStaveNoteStruct>{ keys, duration }).addModifier(0, chordSymbol);
      }

      function draw(chords, y) {
        const notes = [];

        const stave = new Stave(10, y, 450)
          .addClef('treble').setContext(ctx).draw();

        notes.push(newNote(['C/4'], 'q', chords[0]));
        notes.push(newNote(['C/4'], 'q', chords[1]));
        notes.push(newNote(['C/4'], 'q', chords[2]));
        notes.push(newNote(['C/4'], 'q', chords[3]));
        Formatter.FormatAndDraw(ctx, stave, notes);
      }

      let chords = [];
      chords.push(new ChordSymbol()
        .addText('A')
        .addGlyphSuperscript('dim'));

      chords.push(new ChordSymbol()
        .addText('A')
        .addGlyphSuperscript('dim')
        .setEnableKerning(false));

      chords.push(new ChordSymbol()
        .setHorizontal('left').addText('C')
        .addGlyph('halfDiminished', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT }));

      chords.push(new ChordSymbol()
        .setHorizontal('left').addText('D')
        .addGlyph('halfDiminished', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT }));

      draw(chords, 10);

      chords = [];
      chords.push(new ChordSymbol()
        .addText('A')
        .addGlyphSuperscript('dim'));

      chords.push(new ChordSymbol()
        .addText('A')
        .addGlyphSuperscript('dim')
        .setEnableKerning(false));

      chords.push(new ChordSymbol()
        .addText('A')
        .addGlyphSuperscript('+').addTextSuperscript('5'));

      chords.push(new ChordSymbol()
        .addText('G')
        .addGlyphSuperscript('+')
        .addTextSuperscript('5'));

      draw(chords, 110);

      chords = [];
      chords.push(new ChordSymbol()
        .addText('A')
        .addGlyph('-'));

      chords.push(new ChordSymbol()
        .addText('E')
        .addGlyph('-'));

      chords.push(new ChordSymbol()
        .addText('A')
        .addGlyphOrText('(#11)', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT }));

      chords.push(new ChordSymbol()
        .addText('E')
        .addGlyphOrText('(#9)', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT }));

      draw(chords, 210);

      chords = [];
      chords.push(new ChordSymbol()
        .addGlyphOrText('F/B').addGlyphOrText('b', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT }));

      chords.push(new ChordSymbol()
        .addText('E')
        .addGlyphOrText('V/V'));

      chords.push(new ChordSymbol()
        .addText('A')
        .addGlyphOrText('(#11)', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT }));

      chords.push(new ChordSymbol()
        .addText('E')
        .addGlyphOrText('(#9)', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT }));

      draw(chords, 310);

      ok(true, 'Chord Symbol Kerning Tests');
    },

    top: function(options) {
      const vf = Test.makeFactory(options, 650, 650);
      const ctx = vf.getContext();
      ctx.scale(1.5, 1.5); ctx.setFillStyle('#221'); ctx.setStrokeStyle('#221');

      function newNote(keys, duration, chordSymbol) {
        return new StaveNote(<IStaveNoteStruct>{ keys, duration }).addModifier(0, chordSymbol);
      }

      function draw(c1, c2, y) {
        const notes = [];

        const stave = new Stave(10, y, 450)
          .addClef('treble').setContext(ctx).draw();

        notes.push(newNote(['e/4', 'a/4', 'd/5'], 'h', c1)
          .addAccidental(0, new Accidental('b')));
        notes.push(newNote(['c/4', 'e/4', 'b/4'], 'h', c2));
        Formatter.FormatAndDraw(ctx, stave, notes);
      }

      let chord1 = new ChordSymbol().addText('F7').setHorizontal('left')
        .addGlyphOrText('(#11b9)', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT });
      let chord2 = new ChordSymbol()
        .addText('C').setHorizontal('left')
        .addGlyphSuperscript('majorSeventh');
      draw(chord1, chord2, 40);

      chord1 = new ChordSymbol().addText('F7')
        .addTextSuperscript('(')
        .addGlyphOrText('#11b9', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT })
        .addTextSuperscript(')');
      chord2 = new ChordSymbol()
        .addText('C').setHorizontal('left')
        .addTextSuperscript('Maj.');
      draw(chord1, chord2, 140);

      chord1 = new ChordSymbol().addText('F7').setHorizontal('left')
        .addGlyphOrText('#11', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT })
        .addGlyphOrText('b9', { symbolModifier: ChordSymbol.symbolModifiers.SUBSCRIPT });
      chord2 = new ChordSymbol()
        .addText('C')
        .addTextSuperscript('sus4');
      draw(chord1, chord2, 240);

      ok(true, 'Top Chord Symbol');
    },

    fontSize: function(options) {
      const vf = Test.makeFactory(options, 750, 580);
      const ctx = vf.getContext();
      ctx.scale(1.5, 1.5); ctx.setFillStyle('#221'); ctx.setStrokeStyle('#221');

      function newNote(keys, duration, chordSymbol) {
        return new StaveNote(<IStaveNoteStruct>{ keys, duration }).addModifier(0, chordSymbol);
      }

      function draw(chords, y) {
        const notes = [];

        const stave = new Stave(10, y, 450)
          .addClef('treble').setContext(ctx).draw();

        notes.push(newNote(['c/4'], 'q', chords[0]));
        notes.push(newNote(['c/4'], 'q', chords[1]));
        notes.push(newNote(['c/4'], 'q', chords[2]));
        notes.push(newNote(['c/4'], 'q', chords[3]));
        Formatter.FormatAndDraw(ctx, stave, notes);
      }

      let chords = [];
      chords.push(new ChordSymbol().setFontSize(10).addText('F7')
        .addGlyph('leftParenTall')
        .addGlyphOrText('b9', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT })
        .addGlyphOrText('#11', { symbolModifier: ChordSymbol.symbolModifiers.SUBSCRIPT })
        .addGlyph('rightParenTall')
      );
      chords.push(new ChordSymbol().setFontSize(12).addText('F7')
        .addGlyphOrText('b9', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT })
        .addGlyphOrText('#11', { symbolModifier: ChordSymbol.symbolModifiers.SUBSCRIPT })
      );
      chords.push(new ChordSymbol().setFontSize(14).addText('F7')
        .addGlyph('leftParenTall')
        .addGlyphOrText('add 3', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT })
        .addGlyphOrText('omit 9', { symbolModifier: ChordSymbol.symbolModifiers.SUBSCRIPT })
        .addGlyph('rightParenTall')
      );
      chords.push(new ChordSymbol().setFontSize(16).addText('F7')
        .addGlyph('leftParenTall')
        .addGlyphOrText('b9', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT })
        .addGlyphOrText('#11', { symbolModifier: ChordSymbol.symbolModifiers.SUBSCRIPT })
        .addGlyph('rightParenTall')
      );
      draw(chords, 40);

      chords = [];
      chords.push(new ChordSymbol().setFontSize(10).addText('F7')
        .addGlyphOrText('#11', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT })
        .addGlyphOrText('b9', { symbolModifier: ChordSymbol.symbolModifiers.SUBSCRIPT })
      );
      chords.push(new ChordSymbol().setFontSize(12).addText('F7')
        .addGlyphOrText('#11', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT })
        .addGlyphOrText('b9', { symbolModifier: ChordSymbol.symbolModifiers.SUBSCRIPT })
      );
      chords.push(new ChordSymbol().setFontSize(14).addText('F7')
        .addGlyphOrText('#11', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT })
        .addGlyphOrText('b9', { symbolModifier: ChordSymbol.symbolModifiers.SUBSCRIPT })
      );
      chords.push(new ChordSymbol().setFontSize(16).addText('F7')
        .addGlyphOrText('#11', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT })
        .addGlyphOrText('b9', { symbolModifier: ChordSymbol.symbolModifiers.SUBSCRIPT })
      );
      draw(chords, 140);

      chords = [];
      chords.push(new ChordSymbol().setFontSize(10).addGlyphOrText('Ab')
        .addGlyphOrText('7(#11b9)', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT })
      );
      chords.push(new ChordSymbol().setFontSize(14).addGlyphOrText('C#')
        .addGlyphOrText('7(#11b9)', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT })
      );
      chords.push(new ChordSymbol().setFontSize(16).addGlyphOrText('Ab')
        .addGlyphOrText('7(#11b9)', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT })
      );
      chords.push(new ChordSymbol().setFontSize(18).addGlyphOrText('C#')
        .addGlyphOrText('7(#11b9)', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT })
      );
      draw(chords, 240);

      ok(true, 'Font Size Chord Symbol');
    },

    topJustify: function(options) {
      const vf = Test.makeFactory(options, 500, 680);
      const ctx = vf.getContext();
      ctx.scale(1.5, 1.5); ctx.setFillStyle('#221'); ctx.setStrokeStyle('#221');

      function newNote(keys, duration, chordSymbol) {
        return new StaveNote(<IStaveNoteStruct>{ keys, duration }).addModifier(0, chordSymbol);
      }

      function draw(chord1, chord2, y) {
        const notes = [];

        const stave = new Stave(10, y, 450)
          .addClef('treble').setContext(ctx).draw();

        notes.push(newNote(['e/4', 'a/4', 'd/5'], 'h', chord1)
          .addAccidental(0, new Accidental('b')));
        notes.push(newNote(['c/4', 'e/4', 'B/4'], 'h', chord2));
        Formatter.FormatAndDraw(ctx, stave, notes);
      }

      let chord1 = new ChordSymbol().addText('F7').setHorizontal('left')
        .addGlyphOrText('(#11b9)', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT });
      let chord2 = new ChordSymbol()
        .addText('C')
        .addGlyphSuperscript('majorSeventh')
        .setHorizontal('left');
      draw(chord1, chord2, 40);

      chord1 = new ChordSymbol().addText('F7').setHorizontal('left')
        .addGlyphOrText('(#11b9)', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT })
        .setHorizontal('center');
      chord2 = new ChordSymbol()
        .addText('C')
        .addTextSuperscript('Maj.')
        .setHorizontal('center');
      draw(chord1, chord2, 140);

      chord1 = new ChordSymbol().addText('F7').setHorizontal('left')
        .addGlyphOrText('#11', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT })
        .addGlyphOrText('b9', { symbolModifier: ChordSymbol.symbolModifiers.SUBSCRIPT })
        .setHorizontal('right');
      chord2 = new ChordSymbol()
        .addText('C')
        .addTextSuperscript('Maj.')
        .setHorizontal('right');
      draw(chord1, chord2, 240);

      chord1 = new ChordSymbol().addText('F7').setHorizontal('left')
        .addGlyphOrText('#11', { symbolModifier: ChordSymbol.symbolModifiers.SUPERSCRIPT })
        .addGlyphOrText('b9', { symbolModifier: ChordSymbol.symbolModifiers.SUBSCRIPT })
        .setHorizontal('centerStem');
      chord2 = new ChordSymbol()
        .addText('C')
        .addTextSuperscript('Maj.')
        .setHorizontal('centerStem');
      draw(chord1, chord2, 340);

      ok(true, 'Top Chord Justified');
    },

    dblbottom: function(options) {
      const vf = Test.makeFactory(options, 600, 260);
      const ctx = vf.getContext();
      ctx.scale(1.5, 1.5); ctx.setFillStyle('#221'); ctx.setStrokeStyle('#221');

      function newNote(keys, duration, chordSymbol1, chordSymbol2) {
        return new StaveNote(<IStaveNoteStruct>{ keys, duration })
          .addModifier(0, chordSymbol1)
          .addModifier(0, chordSymbol2);
      }

      function draw(chords, chords2, y) {
        const notes = [];

        const stave = new Stave(10, y, 450)
          .addClef('treble').setContext(ctx).draw();

        notes.push(newNote(['c/4', 'f/4', 'a/4'], 'q', chords[0], chords2[0]));
        notes.push(newNote(['c/4', 'e/4', 'b/4'], 'q', chords[1], chords2[1]).addAccidental(2, new Accidental('b')));
        notes.push(newNote(['c/4', 'e/4', 'g/4'], 'q', chords[2], chords2[2]));
        notes.push(newNote(['c/4', 'f/4', 'a/4'], 'q', chords[3], chords2[3]).addAccidental(1, new Accidental('#')));
        Formatter.FormatAndDraw(ctx, stave, notes);
      }

      const chords = [];
      const chords2 = [];

      chords.push(new ChordSymbol()
        .setVertical('bottom')
        .addText('I')
        .addTextSuperscript('6')
        .addTextSubscript('4'));
      chords.push(new ChordSymbol()
        .setVertical('bottom')
        .addGlyphOrText('V'));
      chords.push(new ChordSymbol()
        .addLine(12)
        .setVertical('bottom'));
      chords.push(new ChordSymbol()
        .addGlyphOrText('V/V')
        .setVertical('bottom'));

      chords2.push(new ChordSymbol()
        .setVertical('bottom')
        .addText('T'));
      chords2.push(new ChordSymbol()
        .setVertical('bottom')
        .addText('D'));
      chords2.push(new ChordSymbol()
        .setVertical('bottom')
        .addText('D'));
      chords2.push(new ChordSymbol()
        .setVertical('bottom')
        .addText('SD'));

      draw(chords, chords2, 10);
      ok(true, '2 Bottom Chord Symbol');
    },

    bottom: function(options) {
      const vf = Test.makeFactory(options, 600, 230);
      const ctx = vf.getContext();
      ctx.scale(1.5, 1.5); ctx.setFillStyle('#221'); ctx.setStrokeStyle('#221');

      function newNote(keys, duration, chordSymbol) {
        return new StaveNote(<IStaveNoteStruct>{ keys, duration }).addModifier(0, chordSymbol);
      }

      function draw(chords, y) {
        const notes = [];

        const stave = new Stave(10, y, 400)
          .addClef('treble').setContext(ctx).draw();

        notes.push(newNote(['c/4', 'f/4', 'a/4'], 'q', chords[0]));
        notes.push(newNote(['c/4', 'e/4', 'b/4'], 'q', chords[1]).addAccidental(2, new Accidental('b')));
        notes.push(newNote(['c/4', 'e/4', 'g/4'], 'q', chords[2]));
        notes.push(newNote(['c/4', 'f/4', 'a/4'], 'q', chords[3]).addAccidental(1, new Accidental('#')));
        Formatter.FormatAndDraw(ctx, stave, notes);
      }

      const chords = [];

      chords.push(new ChordSymbol()
        .setVertical('bottom')
        .addText('I')
        .addTextSuperscript('6')
        .addTextSubscript('4'));
      chords.push(new ChordSymbol()
        .setVertical('bottom')
        .addGlyphOrText('V'));
      chords.push(new ChordSymbol()
        .addLine(12)
        .setVertical('bottom'));
      chords.push(new ChordSymbol()
        .addGlyphOrText('V/V')
        .setVertical('bottom'));

      draw(chords, 10);
      ok(true, 'Bottom Chord Symbol');
    },
    bottomStemDown: function(options) {
      const vf = Test.makeFactory(options, 600, 330);
      const ctx = vf.getContext();
      ctx.scale(1.5, 1.5); ctx.setFillStyle('#221'); ctx.setStrokeStyle('#221');

      function newNote(keys, duration, chordSymbol) {
        return new StaveNote(<IStaveNoteStruct>{ keys, duration, stem_direction: -1 }).addModifier(0, chordSymbol);
      }

      function draw(chords, y) {
        const notes = [];

        const stave = new Stave(10, y, 400)
          .addClef('treble').setContext(ctx).draw();

        notes.push(newNote(['c/4', 'f/4', 'a/4'], 'q', chords[0]));
        notes.push(newNote(['c/4', 'e/4', 'b/4'], 'q', chords[1]).addAccidental(2, new Accidental('b')));
        notes.push(newNote(['c/4', 'e/4', 'g/4'], 'q', chords[2]));
        notes.push(newNote(['c/4', 'f/4', 'a/4'], 'q', chords[3]).addAccidental(1, new Accidental('#')));
        Formatter.FormatAndDraw(ctx, stave, notes);
      }

      const chords = [];

      chords.push(new ChordSymbol()
        .setVertical('bottom')
        .addGlyphOrText('F'));
      chords.push(new ChordSymbol()
        .setVertical('bottom')
        .addGlyphOrText('C7'));
      chords.push(new ChordSymbol()
        .addLine(12)
        .setVertical('bottom'));
      chords.push(new ChordSymbol()
        .addText('A').addGlyphSuperscript('dim')
        .setVertical('bottom'));

      draw(chords, 10);
      ok(true, 'Bottom Stem Down Chord Symbol');
    },
  };
})();
