/**
 * VexFlow - TickContext Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import { MockTickable } from './mocks';
import Test from './vexflow_test_helpers';
import { Annotation, Beam, Bend, Formatter, Note, Registry, Stave, StaveConnector, StaveNote, Vex, Voice } from '../src';
import { IFactoryParams } from '../src/types/factory';
import { IStaveNoteStruct } from '../src/types/note';
import { ISystemOptions, ISystemParams } from '../src/types/system';
import { IStaveOptions } from '../src/types/stave';
import { IVoiceTime } from '../src/types/voice';
import { IFormatterOptions } from '../src/types/formatter';

declare const QUnit: any;
declare function ok(...args);
declare function test(...args);
declare function equal(...args);

export const FormatterTests = (function() {
  const run = Test.runTests;
  const runSVG = Test.runSVGTest;

  return {
    Start: function() {
      QUnit.module('Formatter');
      test('TickContext Building', this.buildTickContexts.bind(this));
      runSVG('StaveNote - No Justification', this.formatStaveNotes.bind(this));
      runSVG('StaveNote - Justification', this.justifyStaveNotes.bind(this));
      runSVG('Notes with Tab', this.notesWithTab.bind(this));
      runSVG('Multiple Staves - No Justification', this.multiStaves.bind(this), { justify: false, iterations: 0, debug: true });
      runSVG('Multiple Staves - Justified', this.multiStaves.bind(this), { justify: true, iterations: 0 });
      runSVG('Multiple Staves - Justified - 6 Iterations', this.multiStaves.bind(this), { justify: true, iterations: 4, alpha: 0.01 });
      runSVG('Softmax', this.softMax.bind(this));
      runSVG('Mixtime', this.mixTime.bind(this));
      runSVG('Tight', this.tightNotes.bind(this));
      runSVG('Tight 2', this.tightNotes2.bind(this));
      runSVG('Annotations', this.annotations.bind(this));
      runSVG('Proportional Formatting - No Justification', this.proportionalFormatting.bind(this), { justify: false, debug: true, iterations: 0 });
      run('Proportional Formatting - No Tuning', this.proportionalFormatting.bind(this), { debug: true, iterations: 0 });

      Test.runSVGTest('Proportional Formatting (20 iterations)',
        this.proportionalFormatting.bind(this),
        { debug: true, iterations: 20, alpha: 0.5 }
      );
    },

    buildTickContexts: function() {
      function createTickable() {
        return new MockTickable();
      }

      const R = Vex.Flow.RESOLUTION;
      const BEAT = 1 * R / 4;

      const tickables1 = [
        createTickable().setTicks(BEAT).setWidth(10),
        createTickable().setTicks(BEAT * 2).setWidth(20),
        createTickable().setTicks(BEAT).setWidth(30),
      ];

      const tickables2 = [
        createTickable().setTicks(BEAT * 2).setWidth(10),
        createTickable().setTicks(BEAT).setWidth(20),
        createTickable().setTicks(BEAT).setWidth(30),
      ];

      const voice1 = new Voice(Vex.Flow.TIME4_4);
      const voice2 = new Voice(Vex.Flow.TIME4_4);

      voice1.addTickables(tickables1);
      voice2.addTickables(tickables2);

      const formatter = new Formatter();
      const tContexts = formatter.createTickContexts([voice1, voice2]);

      equal(tContexts.list.length, 4, 'Voices should have four tick contexts');

      // TODO: add this after pull request #68 is merged to master
      // throws(
      //   function() { formatter.getMinTotalWidth(); },
      //   Vex.RERR,
      //   "Expected to throw exception"
      // );

      ok(formatter.preCalculateMinTotalWidth([voice1, voice2]), 'Successfully runs preCalculateMinTotalWidth');
      equal(formatter.getMinTotalWidth(), 88, 'Get minimum total width without passing voices');

      formatter.preFormat();

      equal(formatter.getMinTotalWidth(), 88, 'Minimum total width');
      equal(tickables1[0].getX(), tickables2[0].getX(), 'First notes of both voices have the same X');
      equal(tickables1[2].getX(), tickables2[2].getX(), 'Last notes of both voices have the same X');
      ok(tickables1[1].getX() < tickables2[1].getX(), 'Second note of voice 2 is to the right of the second note of voice 1');
    },

    formatStaveNotes: function(options) {
      const vf = Test.makeFactory(options, 500, 280);
      const score = vf.EasyScore();

      vf.Stave(<IFactoryParams>{ y: 50 });

      const notes1 = score.notes(
        '(cb4 e#4 a4)/2, (d4 e4 f4)/4, (cn4 f#4 a4)',
        { stem: 'down' }
      );
      const notes2 = score.notes(
        '(cb5 e#5 a5)/2, (d5 e5 f5)/4, (cn5 f#5 a5)',
        { stem: 'up' }
      );

      const voices: Voice[] = [notes1, notes2].map(score.voice.bind(score));

      vf.Formatter()
        .joinVoices(voices)
        .format(voices);

      vf.draw();

      const ctx = vf.getContext();

      notes1.forEach(function(note) {
        Test.plotNoteWidth(ctx, note, 190);
      });

      notes2.forEach(function(note) {
        Test.plotNoteWidth(ctx, note, 35);
      });

      Test.plotLegendForNoteWidth(ctx, 300, 180);

      ok(true);
    },

    justifyStaveNotes: function(options) {
      const vf = Test.makeFactory(options, 420, 580);
      const ctx = vf.getContext();
      const score = vf.EasyScore();

      let y = 30;

      function justifyToWidth(width) {
        vf.Stave(<IFactoryParams>{ y: y }).addTrebleGlyph();

        const voices = [
          score.voice(score.notes(
            '(cbb4 en4 a4)/2, (d4 e4 f4)/8, (d4 f4 a4)/8, (cn4 f#4 a4)/4',
            { stem: 'down' }
          )),
          score.voice(score.notes(
            '(bb4 e#5 a5)/4, (d5 e5 f5)/2, (c##5 fb5 a5)/4',
            { stem: 'up' }
          )),
        ];

        vf.Formatter()
          .joinVoices(voices)
          .format(voices, width);

        voices[0].getTickables().forEach(function(note) {
          Test.plotNoteWidth(ctx, note, y + 140);
        });

        voices[1].getTickables().forEach(function(note) {
          Test.plotNoteWidth(ctx, note, y - 20);
        });
        y += 210;
      }

      justifyToWidth(0);
      justifyToWidth(300);
      justifyToWidth(400);

      vf.draw();

      ok(true);
    },

    notesWithTab: function(options) {
      const vf = Test.makeFactory(options, 420, 580);
      const score = vf.EasyScore();

      let y = 10;

      function justifyToWidth(width) {
        const stave = vf.Stave(<IFactoryParams>{ y: y }).addTrebleGlyph();

        const voice = score.voice(score.notes(
          'd#4/2, (c4 d4)/8, d4/8, (c#4 e4 a4)/4',
          { stem: 'up' }
        ));

        y += 100;

        vf.TabStave(<IFactoryParams>{ y: y })
          .addTabGlyph()
          .setNoteStartX(stave.getNoteStartX());

        const tabVoice = score.voice([
          vf.TabNote(<IStaveNoteStruct>{
            positions: [{ str: 3, fret: 6 }],
            duration: '2'
          }).addModifier(new Bend('Full'), 0),
          vf.TabNote(<IStaveNoteStruct>{
            positions: [{ str: 2, fret: 3 },
              { str: 3, fret: 5 }], duration: '8',
          }).addModifier(new Bend('Unison'), 1),
          vf.TabNote(<IStaveNoteStruct>{ positions: [{ str: 3, fret: 7 }], duration: '8' }),
          vf.TabNote(<IStaveNoteStruct>{
            positions: [{ str: 3, fret: 6 },
              { str: 4, fret: 7 },
              { str: 2, fret: 5 }], duration: '4',
          }),

        ]);

        vf.Formatter()
          .joinVoices([voice])
          .joinVoices([tabVoice])
          .format([voice, tabVoice], width);

        y += 150;
      }

      justifyToWidth(0);
      justifyToWidth(300);

      vf.draw();

      ok(true);
    },

    multiStaves: function(options) {
      const vf = Test.makeFactory(options, 600, 400);
      const score = vf.EasyScore();

      const stave11 = vf.Stave(<IFactoryParams>{ y: 20, width: 275 })
        .addTrebleGlyph()
        .addTimeSignature('6/8');

      const notes11 = score.notes('f4/4, d4/8, g4/4, eb4/8');
      const voice11 = score.voice(notes11, { time: '6/8' });

      const stave21 = vf.Stave(<IFactoryParams>{ y: 130, width: 275 })
        .addTrebleGlyph()
        .addTimeSignature('6/8');

      const notes21 = score.notes('d4/8, d4, d4, d4, e4, eb4');
      const voice21 = score.voice(notes21, { time: '6/8' });

      const stave31 = vf.Stave(<IFactoryParams>{ y: 250, width: 275 })
        .addClef('bass')
        .addTimeSignature('6/8');

      const notes31 = score.notes('a5/8, a5, a5, a5, a5, a5', { stem: 'down' });
      const voice31 = score.voice(notes31, { time: '6/8' });

      vf.StaveConnector(<IFactoryParams>{
        top_stave: stave21,
        bottom_stave: stave31,
        type: 'brace',
      });

      vf.Beam(<IFactoryParams>{ notes: notes21.slice(0, 3) });
      vf.Beam(<IFactoryParams>{ notes: notes21.slice(3, 6) });
      vf.Beam(<IFactoryParams>{ notes: notes31.slice(0, 3) });
      vf.Beam(<IFactoryParams>{ notes: notes31.slice(3, 6) });

      let formatter = vf.Formatter()
        .joinVoices([voice11])
        .joinVoices([voice21])
        .joinVoices([voice31]);

      if (options.params.justify) {
        formatter.formatToStave([voice11, voice21, voice31], stave11);
      } else {
        formatter.format([voice11, voice21, voice31], 0);
      }

      for (let i = 0; i < options.params.iterations; i++) {
        formatter.tune();
      }

      const stave12 = vf.Stave(<IFactoryParams>{
        x: stave11.width + stave11.x,
        y: stave11.y,
        width: stave11.width,
      });

      const notes12 = score.notes('ab4/4, bb4/8, (cb5 eb5)/4[stem="down"], d5/8[stem="down"]');
      const voice12 = score.voice(notes12, { time: '6/8' });

      vf.Stave(<IFactoryParams>{
        x: stave21.width + stave21.x,
        y: stave21.y,
        width: stave21.width,
      });

      const notes22 = score.notes('(eb4 ab4)/4., (c4 eb4 ab4)/4, db5/8', { stem: 'up' });
      const voice22 = score.voice(notes22, { time: '6/8' });

      vf.Stave(<IFactoryParams>{
        x: stave31.width + stave31.x,
        y: stave31.y,
        width: stave31.width,
      });

      const notes32 = score.notes('a5/8, a5, a5, a5, a5, a5', { stem: 'down' });
      const voice32 = score.voice(notes32, { time: '6/8' });

      formatter = vf.Formatter()
        .joinVoices([voice12])
        .joinVoices([voice22])
        .joinVoices([voice32]);

      if (options.params.justify) {
        formatter.formatToStave([voice12, voice22, voice32], stave12);
      } else {
        formatter.format([voice12, voice22, voice32], 0);
      }

      for (let j = 0; j < options.params.iterations; j++) {
        formatter.tune();
      }

      vf.Beam(<IFactoryParams>{ notes: <Note[]>notes32.slice(0, 3) });
      vf.Beam(<IFactoryParams>{ notes: <Note[]>notes32.slice(3, 6) });

      vf.draw();

      ok(true);
    },

    proportionalFormatting: function(options) {
      const debug = options.params.debug;
      Registry.enableDefaultRegistry(new Registry());

      const vf = Test.makeFactory(options, 650, 750);
      const system = vf.System(<ISystemOptions>{
        x: 50,
        width: 500,
        debugFormatter: debug,
        noJustification: !(options.params.justify === undefined && true),
        formatIterations: options.params.iterations,
        options: { alpha: options.params.alpha }
      });

      const score = vf.EasyScore();

      const newVoice = function(notes) {
        return score.voice(notes, { time: '1/4' });
      };

      const newStave = function(voice) {
        return system
          .addStave(<ISystemParams>{ voices: [voice], debugNoteMetrics: debug })
          .addClef('treble')
          .addTimeSignature('1/4');
      };

      const voices = [
        score.notes('c5/8, c5'),
        score.tuplet(score.notes('a4/8, a4, a4'), <IStaveOptions>{ notes_occupied: 2 }),
        score.notes('c5/16, c5, c5, c5'),
        score.tuplet(score.notes('a4/16, a4, a4, a4, a4'), <IStaveOptions>{ notes_occupied: 4 }),
        score.tuplet(score.notes('a4/32, a4, a4, a4, a4, a4, a4'), <IStaveOptions>{ notes_occupied: 8 }),
      ];

      voices.map(newVoice).forEach(newStave);
      system.addConnector().setType(StaveConnector.type.BRACKET);

      vf.draw();

      // var typeMap = Registry.getDefaultRegistry().index.type;
      // var table = Object.keys(typeMap).map(function(typeName) {
      //   return typeName + ': ' + Object.keys(typeMap[typeName]).length;
      // });

      // console.log(table);
      Registry.disableDefaultRegistry();
      ok(true);
    },

    softMax: function(options) {
      const vf = Test.makeFactory(options, 550, 500);
      vf.getContext().scale(0.8, 0.8);

      function draw(y, factor) {
        const score = vf.EasyScore();
        const system = vf.System(<ISystemOptions>{
          x: 100,
          y,
          width: 500,
          details: { softmaxFactor: factor }
        });

        system.addStave(<ISystemParams>{
          voices: [
            score.voice(
              score.notes('C#5/h, a4/q')
                .concat(score.beam(score.notes('Abb4/8, A4/8')))
                .concat(score.beam(score.notes('A4/16, A#4, A4, Ab4/32, A4'))),
              { time: '5/4' })
          ]
        }).addClef('treble').addTimeSignature('5/4');

        vf.draw();
        ok(true);
      }

      draw(50, 1);
      draw(150, 2);
      draw(250, 10);
      draw(350, 20);
      draw(450, 200);
    },

    mixTime: function(options) {
      const vf = Test.makeFactory(options, 420, 250);
      vf.getContext().scale(0.8, 0.8);
      const score = vf.EasyScore();
      const system = vf.System(<ISystemOptions>{
        details: { softmaxFactor: 100 },
        width: 500, debugFormatter: true
      });

      system.addStave(<ISystemParams>{
        voices: [
          score.voice(
            score.notes('C#5/q, B4')
              .concat(score.beam(score.notes('A4/8, E4, C4, D4')))
          )
        ]
      }).addClef('treble').addTimeSignature('4/4');

      system.addStave(<ISystemParams>{
        voices: [
          score.voice(
            score.notes('C#5/q, B4, B4')
              .concat(
                score.tuplet(score.beam(score.notes('A4/8, E4, C4'))))
          )
        ]
      }).addClef('treble').addTimeSignature('4/4');

      vf.draw();
      ok(true);
    },

    tightNotes: function(options) {
      const vf = Test.makeFactory(options, 420, 250);
      vf.getContext().scale(0.8, 0.8);
      const score = vf.EasyScore();
      const system = vf.System(<ISystemOptions>{
        width: 400, debugFormatter: true
      });

      system.addStave(<ISystemParams>{
        voices: [
          score.voice(
            score.beam(score.notes('B4/16, B4, B4, B4, B4, B4, B4, B4'))
              .concat(score.notes('B4/q, B4'))
          )
        ]
      }).addClef('treble').addTimeSignature('4/4');

      system.addStave(<ISystemParams>{
        voices: [
          score.voice(
            score.notes('B4/q, B4').concat(score.beam(score.notes('B4/16, B4, B4, B4, B4, B4, B4, B4')))
          )
        ]
      }).addClef('treble').addTimeSignature('4/4');

      vf.draw();
      ok(true);
    },

    tightNotes2: function(options) {
      const vf = Test.makeFactory(options, 420, 250);
      vf.getContext().scale(0.8, 0.8);
      const score = vf.EasyScore();
      const system = vf.System(<ISystemOptions>{
        width: 400, debugFormatter: true
      });

      system.addStave(<ISystemParams>{
        voices: [
          score.voice(
            score.beam(score.notes('B4/16, B4, B4, B4, B4, B4, B4, B4'))
              .concat(score.notes('B4/q, B4'))
          )
        ]
      }).addClef('treble').addTimeSignature('4/4');

      system.addStave(<ISystemParams>{
        voices: [
          score.voice(
            score.notes('B4/w')
          )
        ]
      }).addClef('treble').addTimeSignature('4/4');

      vf.draw();
      ok(true);
    },

    annotations: function(options) {
      const pageWidth = 816;
      const pageHeight = 600;
      const vf = Test.makeFactory(options, pageWidth, pageHeight);
      const context = vf.getContext();

      const lyrics1 = ['ipso', 'ipso-', 'ipso', 'ipso', 'ipsoz', 'ipso-', 'ipso', 'ipso', 'ipso', 'ip', 'ipso'];
      const lyrics2 = ['ipso', 'ipso-', 'ipsoz', 'ipso', 'ipso', 'ipso-', 'ipso', 'ipso', 'ipso', 'ip', 'ipso'];

      const smar = [{
        sm: 5,
        width: 450,
        lyrics: lyrics1,
        title: '450px,softMax:5'
      }, {
        sm: 5,
        width: 450,
        lyrics: lyrics2,
        title: '450px,softmax:5,different word order'
      },
      {
        sm: 5,
        width: 460,
        lyrics: lyrics2,
        title: '460px,softmax:5'
      }, {
        sm: 100,
        width: 460,
        lyrics: lyrics2,
        title: '460px,softmax:100'
      }];

      const rowSize = 140;
      const beats = 12;
      const beatsPer = 8;
      const beamGroup = 3;

      const durations = ['8d', '16', '8', '8d', '16', '8', '8d', '16', '8', '4', '8'];
      const beams = [];
      let y = 40;

      smar.forEach((sm) => {
        const stave = new Stave(10, y, sm.width);
        const notes = [];
        let iii = 0;
        context.fillText(sm.title, 100, y);
        y += rowSize;

        durations.forEach((dd) => {
          const newNote = new StaveNote(<IStaveNoteStruct>{ keys: ['b/4'], duration: dd });
          if (dd.indexOf('d') >= 0) { newNote.addDotToAll(); }
          if (sm.lyrics.length > iii) {
            newNote.addAnnotation(0,
              new Annotation(sm.lyrics[iii])
                .setVerticalJustification(Annotation.VerticalJustify.BOTTOM)
                .setFont('Times', 12, 'normal'));
          }
          notes.push(newNote);
          iii += 1;
        });

        notes.forEach((note) => { if (note.duration.indexOf('d') >= 0) { note.addDotToAll(); } });

        // Don't beam the last group
        let beam = [];
        notes.forEach((note) => {
          if (note.intrinsicTicks < 4096) {
            beam.push(note);
            if (beam.length >= beamGroup) {
              beams.push(
                new Beam(beam)
              );
              beam = [];
            }
          } else {
            beam = [];
          }
        });

        const voice1 = new Voice(<IVoiceTime>{
          num_beats: beats,
          beat_value: beatsPer
        }).setMode(Vex.Flow.Voice.Mode.SOFT).addTickables(notes);

        const fmt = new Formatter(<IFormatterOptions>{ softmaxFactor: sm.sm }).joinVoices([voice1]);
        fmt.format([voice1], sm.width - 11);

        stave.setContext(context).draw();
        voice1.draw(context, stave);

        beams.forEach(function(b) {
          b.setContext(context).draw();
        });
      });

      ok(true);
    }
  };
})();
