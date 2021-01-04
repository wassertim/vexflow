/**
 * VexFlow - GraceNote Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */
import { Formatter, GraceNote, Note, StaveNote } from '../src';
import Test from './vexflow_test_helpers';
import { IFactoryParams } from '../src/types/factory';
import { IStaveNoteStruct } from '../src/types/note';

declare const QUnit: any;
declare function ok(...args);

export const GraceNoteTests = (function() {
  const stem_test_util = {
    durations: ['8', '16', '32', '64', '128'],
    createNote: function(d, noteT: (a) => StaveNote, keys, stem_direction, slash?) {
      const note_prop: any = {
        duration: d,
      };
      note_prop.stem_direction = stem_direction;
      note_prop.slash = slash;
      note_prop.keys = keys;
      return noteT(note_prop);
    },
  };

  return  {
    Start: function() {
      QUnit.module('Grace Notes');
      Test.runTests('Grace Note Basic', this.basic);
      Test.runTests('Grace Note Basic with Slurs', this.basicSlurred);
      Test.runTests('Grace Note Stem', this.stem);
      Test.runTests('Grace Note Stem with Beams', this.stemWithBeamed);
      Test.runTests('Grace Note Slash', this.slash);
      Test.runTests('Grace Note Slash with Beams', this.slashWithBeams);
      Test.runTests('Grace Notes Multiple Voices', this.multipleVoices);
      Test.runTests('Grace Notes Multiple Voices Multiple Draws', this.multipleVoicesMultipleDraws);
    },

    basic: function(options) {
      const vf = Test.makeFactory(options, 700, 130);
      const stave = vf.Stave(<IFactoryParams>{ x: 10, y: 10, width: 650 });

      const gracenotes: GraceNote[] = [
        { keys: ['e/4'], duration: '32' },
        { keys: ['f/4'], duration: '32' },
        { keys: ['g/4'], duration: '32' },
        { keys: ['a/4'], duration: '32' },
      ].map(vf.GraceNote.bind(vf));

      const gracenotes1: GraceNote[] = [
        { keys: ['b/4'], duration: '8', slash: false },
      ].map(vf.GraceNote.bind(vf));

      const gracenotes2: GraceNote[] = [
        { keys: ['b/4'], duration: '8', slash: true },
      ].map(vf.GraceNote.bind(vf));

      const gracenotes3: GraceNote[] = [
        { keys: ['e/4'], duration: '8' },
        { keys: ['f/4'], duration: '16' },
        { keys: ['e/4', 'g/4'], duration: '8' },
        { keys: ['a/4'], duration: '32' },
        { keys: ['b/4'], duration: '32' },
      ].map(vf.GraceNote.bind(vf));

      const gracenotes4: GraceNote[] = [
        { keys: ['g/4'], duration: '8' },
        { keys: ['g/4'], duration: '16' },
        { keys: ['g/4'], duration: '16' },
      ].map(vf.GraceNote.bind(vf));

      gracenotes[1].addAccidental(0, vf.Accidental(<IFactoryParams>{ type: '##' }));
      gracenotes3[3].addAccidental(0, vf.Accidental(<IFactoryParams>{ type: 'bb' }));
      gracenotes4[0].addDotToAll();

      const notes = [
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['b/4'], duration: '4', auto_stem: true })
          .addModifier(0, vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes }).beamNotes()),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/5'], duration: '4', auto_stem: true })
          .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: '#' }))
          .addModifier(0, vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes1 }).beamNotes()),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/5', 'd/5'], duration: '4', auto_stem: true })
          .addModifier(0, vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes2 }).beamNotes()),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['a/4'], duration: '4', auto_stem: true })
          .addModifier(0, vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes3 }).beamNotes()),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['a/4'], duration: '4', auto_stem: true })
          .addModifier(0, vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes4 }).beamNotes()),
      ];

      const voice = vf.Voice()
        .setStrict(false)
        .addTickables(notes);

      new Formatter()
        .joinVoices([voice])
        .formatToStave([voice], stave);

      vf.draw();

      ok(true, 'GraceNoteBasic');
    },

    basicSlurred: function(options) {
      const vf = Test.makeFactory(options, 700, 130);
      const stave = vf.Stave(<IFactoryParams>{ x: 10, y: 10, width: 650 });

      const gracenotes0: GraceNote[] = [
        { keys: ['e/4'], duration: '32' },
        { keys: ['f/4'], duration: '32' },
        { keys: ['g/4'], duration: '32' },
        { keys: ['a/4'], duration: '32' },
      ].map(vf.GraceNote.bind(vf));

      const gracenotes1: GraceNote[] = [
        { keys: ['b/4'], duration: '8', slash: false },
      ].map(vf.GraceNote.bind(vf));

      const gracenotes2: GraceNote[] = [
        { keys: ['b/4'], duration: '8', slash: true },
      ].map(vf.GraceNote.bind(vf));

      const gracenotes3: GraceNote[] = [
        { keys: ['e/4'], duration: '8' },
        { keys: ['f/4'], duration: '16' },
        { keys: ['e/4', 'g/4'], duration: '8' },
        { keys: ['a/4'], duration: '32' },
        { keys: ['b/4'], duration: '32' },
      ].map(vf.GraceNote.bind(vf));

      const gracenotes4: GraceNote[] = [
        { keys: ['a/4'], duration: '8' },
        { keys: ['a/4'], duration: '16' },
        { keys: ['a/4'], duration: '16' },
      ].map(vf.GraceNote.bind(vf));

      gracenotes0[1].addAccidental(0, vf.Accidental(<IFactoryParams>{ type: '#' }));
      gracenotes3[3].addAccidental(0, vf.Accidental(<IFactoryParams>{ type: 'b' }));
      gracenotes3[2].addAccidental(0, vf.Accidental(<IFactoryParams>{ type: 'n' }));
      gracenotes4[0].addDotToAll();

      const notes = [
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['b/4'], duration: '4', auto_stem: true })
          .addModifier(0, vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes0, slur: true }).beamNotes()),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/5'], duration: '4', auto_stem: true })
          .addAccidental(0, vf.Accidental(<IFactoryParams>{ type: '#' }))
          .addModifier(0, vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes1, slur: true }).beamNotes()),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['c/5', 'd/5'], duration: '4', auto_stem: true })
          .addModifier(0, vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes2, slur: true }).beamNotes()),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['a/4'], duration: '4', auto_stem: true })
          .addModifier(0, vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes3, slur: true }).beamNotes()),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['a/4'], duration: '4', auto_stem: true })
          .addModifier(0, vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes4, slur: true }).beamNotes()),
        vf.StaveNote(<IStaveNoteStruct>{ keys: ['a/4'], duration: '4', auto_stem: true }),
      ];

      const voice = vf.Voice()
        .setStrict(false)
        .addTickables(notes);

      new Formatter()
        .joinVoices([voice])
        .formatToStave([voice], stave);

      vf.draw();

      ok(true, 'GraceNoteBasic');
    },

    stem: function(options) {
      const vf = Test.makeFactory(options, 700, 130);
      const stave = vf.Stave(<IFactoryParams>{ x: 10, y: 10, width: 650 });

      function createNotes(noteT, keys, stem_direction) {
        return stem_test_util.durations.map(function(d) {
          return stem_test_util.createNote(d, noteT, keys, stem_direction);
        });
      }

      function createNoteBlock(keys, stem_direction) {
        const notes = createNotes(vf.StaveNote.bind(vf), keys, stem_direction);
        const gracenotes = createNotes(vf.GraceNote.bind(vf), keys, stem_direction);
        notes[0].addModifier(0, vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes }));
        return notes;
      }

      const voice = vf.Voice().setStrict(false);
      voice.addTickables(createNoteBlock(['g/4'], 1));
      voice.addTickables(createNoteBlock(['d/5'], -1));

      vf.Formatter().joinVoices([voice]).formatToStave([voice], stave);

      vf.draw();

      ok(true, 'GraceNoteStem');
    },

    stemWithBeamed: function(options) {
      const vf = Test.makeFactory(options, 700, 130);
      const stave = vf.Stave(<IFactoryParams>{ x: 10, y: 10, width: 650 });

      function createBeamdNotes(noteT: (a) => StaveNote, keys, stem_direction, beams, isGrace?, notesToBeam?) {
        const ret = [];
        stem_test_util.durations.map(function(d) {
          const n0 = stem_test_util.createNote(d, noteT, keys, stem_direction);
          const n1 = stem_test_util.createNote(d, noteT, keys, stem_direction);
          ret.push(n0);
          ret.push(n1);
          if (notesToBeam) {
            notesToBeam.push([n0, n1]);
          }
          if (!isGrace) {
            const tbeam = vf.Beam(<IFactoryParams>{ notes: <Note[]>[n0, n1] });
            beams.push(tbeam);
          }
          return ret;
        });
        return ret;
      }

      function createBeamdNoteBlock(keys, stem_direction, beams) {
        const bnotes = createBeamdNotes(vf.StaveNote.bind(vf), keys, stem_direction, beams);
        const notesToBeam = [];
        const gracenotes = createBeamdNotes(vf.GraceNote.bind(vf), keys, stem_direction, beams, true, notesToBeam);
        const graceNoteGroup = vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes });
        notesToBeam.map(graceNoteGroup.beamNotes.bind(graceNoteGroup));
        bnotes[0].addModifier(0, graceNoteGroup);
        return bnotes;
      }

      const beams = [];
      const voice = vf.Voice().setStrict(false);
      voice.addTickables(createBeamdNoteBlock(['g/4'], 1, beams));
      voice.addTickables(createBeamdNoteBlock(['d/5'], -1, beams));

      vf.Formatter().joinVoices([voice]).formatToStave([voice], stave);

      vf.draw();

      ok(true, 'GraceNoteStem');
    },

    slash: function(options) {
      const vf = Test.makeFactory(options, 700, 130);
      const stave = vf.Stave(<IFactoryParams>{ x: 10, y: 10, width: 650 });

      function createNotes(noteT, keys, stem_direction, slash) {
        return stem_test_util.durations.map(function(d) {
          return stem_test_util.createNote(d, noteT, keys, stem_direction, slash);
        });
      }

      function createNoteBlock(keys, stem_direction) {
        const notes = [vf.StaveNote(<IStaveNoteStruct>{ keys: ['f/4'], stem_direction: stem_direction, duration: '16' })];
        let gracenotes = createNotes(vf.GraceNote.bind(vf), keys, stem_direction, true);

        const gnotesToBeam = [];
        const duration = '8';
        const gns: StaveNote[] = [
          { keys: ['d/4', 'a/4'], stem_direction: stem_direction, duration: duration, slash: true },
          { keys: ['d/4', 'a/4'], stem_direction: stem_direction, duration: duration, slash: true },
          { keys: ['d/4', 'a/4'], stem_direction: stem_direction, duration: duration, slash: true },

          { keys: ['e/4', 'a/4'], stem_direction: stem_direction, duration: duration, slash: true },
          { keys: ['e/4', 'a/4'], stem_direction: stem_direction, duration: duration, slash: true },
          { keys: ['b/4', 'f/5'], stem_direction: stem_direction, duration: duration, slash: true },

          { keys: ['b/4', 'f/5'], stem_direction: stem_direction, duration: duration, slash: true },
          { keys: ['b/4', 'f/5'], stem_direction: stem_direction, duration: duration, slash: true },
          { keys: ['e/4', 'a/4'], stem_direction: stem_direction, duration: duration, slash: true },
        ].map(vf.GraceNote.bind(vf));

        gnotesToBeam.push([gns[0], gns[1], gns[2]]);
        gnotesToBeam.push([gns[3], gns[4], gns[5]]);
        gnotesToBeam.push([gns[6], gns[7], gns[8]]);

        gracenotes = gracenotes.concat(gns);
        const gracenoteGroup = vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes });
        gnotesToBeam.forEach(function(gnotes) {
          gracenoteGroup.beamNotes(gnotes);
        });

        notes[0].addModifier(0, gracenoteGroup);
        return notes;
      }

      const voice = vf.Voice().setStrict(false);
      voice.addTickables(createNoteBlock(['d/4', 'a/4'], 1));
      voice.addTickables(createNoteBlock(['d/4', 'a/4'], -1));

      vf.Formatter().joinVoices([voice]).formatToStave([voice], stave);

      vf.draw();

      ok(true, 'GraceNoteSlash');
    },

    slashWithBeams: function(options) {
      const vf = Test.makeFactory(options, 800, 130);
      const stave = vf.Stave(<IFactoryParams>{ x: 10, y: 10, width: 750 });

      function createNoteBlock(keys, stem_direction) {
        const notes = [vf.StaveNote(<IStaveNoteStruct>{ keys: ['f/4'], stem_direction: stem_direction, duration: '16' })];
        let gracenotes = [];

        const gnotesToBeam = [];

        ['8', '16', '32', '64'].forEach(function(duration) {
          const gns = [
            { keys: ['d/4', 'a/4'], stem_direction: stem_direction, duration: duration, slash: true },
            { keys: ['d/4', 'a/4'], stem_direction: stem_direction, duration: duration, slash: false },

            { keys: ['e/4', 'a/4'], stem_direction: stem_direction, duration: duration, slash: true },
            { keys: ['b/4', 'f/5'], stem_direction: stem_direction, duration: duration, slash: false },

            { keys: ['b/4', 'f/5'], stem_direction: stem_direction, duration: duration, slash: true },
            { keys: ['e/4', 'a/4'], stem_direction: stem_direction, duration: duration, slash: false },
          ].map(vf.GraceNote.bind(vf));

          gnotesToBeam.push([gns[0], gns[1]]);
          gnotesToBeam.push([gns[2], gns[3]]);
          gnotesToBeam.push([gns[4], gns[5]]);
          gracenotes = gracenotes.concat(gns);
        });
        const gracenoteGroup = vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes });

        gnotesToBeam.forEach(function(gnotes) {
          gracenoteGroup.beamNotes(gnotes);
        });

        notes[0].addModifier(0, gracenoteGroup);
        return notes;
      }

      const voice = vf.Voice().setStrict(false);
      voice.addTickables(createNoteBlock(['d/4', 'a/4'], 1));
      voice.addTickables(createNoteBlock(['d/4', 'a/4'], -1));

      vf.Formatter().joinVoices([voice]).formatToStave([voice], stave);

      vf.draw();

      ok(true, 'GraceNoteSlashWithBeams');
    },

    multipleVoices: function(options) {
      const vf = Test.makeFactory(options, 450, 140);
      const stave = vf.Stave(<IFactoryParams>{ x: 10, y: 10, width: 450 });

      const notes: StaveNote[] = [
        { keys: ['f/5'], stem_direction: 1, duration: '16' },
        { keys: ['f/5'], stem_direction: 1, duration: '16' },
        { keys: ['d/5'], stem_direction: 1, duration: '16' },
        { keys: ['c/5'], stem_direction: 1, duration: '16' },
        { keys: ['c/5'], stem_direction: 1, duration: '16' },
        { keys: ['d/5'], stem_direction: 1, duration: '16' },
        { keys: ['f/5'], stem_direction: 1, duration: '16' },
        { keys: ['e/5'], stem_direction: 1, duration: '16' },
      ].map(vf.StaveNote.bind(vf));

      const notes2: StaveNote[] = [
        { keys: ['f/4'], stem_direction: -1, duration: '16' },
        { keys: ['e/4'], stem_direction: -1, duration: '16' },
        { keys: ['d/4'], stem_direction: -1, duration: '16' },
        { keys: ['c/4'], stem_direction: -1, duration: '16' },
        { keys: ['c/4'], stem_direction: -1, duration: '16' },
        { keys: ['d/4'], stem_direction: -1, duration: '16' },
        { keys: ['f/4'], stem_direction: -1, duration: '16' },
        { keys: ['e/4'], stem_direction: -1, duration: '16' },
      ].map(vf.StaveNote.bind(vf));

      const gracenotes1: GraceNote[] = [
        { keys: ['b/4'], stem_direction: 1, duration: '8', slash: true },
      ].map(vf.GraceNote.bind(vf));

      const gracenotes2: GraceNote[] = [
        { keys: ['f/4'], stem_direction: -1, duration: '8', slash: true },
      ].map(vf.GraceNote.bind(vf));

      const gracenotes3: GraceNote[] = [
        { keys: ['f/4'], duration: '32', stem_direction: -1 },
        { keys: ['e/4'], duration: '32', stem_direction: -1 },
      ].map(vf.GraceNote.bind(vf));

      const gracenotes4: GraceNote[] = [
        { keys: ['f/5'], duration: '32', stem_direction: 1 },
        { keys: ['e/5'], duration: '32', stem_direction: 1 },
        { keys: ['e/5'], duration: '8', stem_direction: 1 },
      ].map(vf.GraceNote.bind(vf));

      gracenotes2[0].setStemDirection(-1);
      gracenotes2[0].addAccidental(0, vf.Accidental(<IFactoryParams>{ type: '#' }));

      notes[1].addModifier(0, vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes4 }).beamNotes());
      notes[3].addModifier(0, vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes1 }));
      notes2[1].addModifier(0, vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes2 }).beamNotes());
      notes2[5].addModifier(0, vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes3 }).beamNotes());

      const voice = vf.Voice()
        .setStrict(false)
        .addTickables(notes);

      const voice2 = vf.Voice()
        .setStrict(false)
        .addTickables(notes2);

      vf.Beam(<IFactoryParams>{ notes: <Note[]>notes.slice(0, 4) });
      vf.Beam(<IFactoryParams>{ notes: <Note[]>notes.slice(4, 8) });
      vf.Beam(<IFactoryParams>{ notes: <Note[]>notes2.slice(0, 4) });
      vf.Beam(<IFactoryParams>{ notes: <Note[]>notes2.slice(4, 8) });

      new Formatter()
        .joinVoices([voice, voice2])
        .formatToStave([voice, voice2], stave);

      vf.draw();

      ok(true, 'Sixteenth Test');
    },

    multipleVoicesMultipleDraws: function(options) {
      const vf = Test.makeFactory(options, 450, 140);
      const stave = vf.Stave(<IFactoryParams>{ x: 10, y: 10, width: 450 });

      const notes: StaveNote[] = [
        { keys: ['f/5'], stem_direction: 1, duration: '16' },
        { keys: ['f/5'], stem_direction: 1, duration: '16' },
        { keys: ['d/5'], stem_direction: 1, duration: '16' },
        { keys: ['c/5'], stem_direction: 1, duration: '16' },
        { keys: ['c/5'], stem_direction: 1, duration: '16' },
        { keys: ['d/5'], stem_direction: 1, duration: '16' },
        { keys: ['f/5'], stem_direction: 1, duration: '16' },
        { keys: ['e/5'], stem_direction: 1, duration: '16' },
      ].map(vf.StaveNote.bind(vf));

      const notes2: StaveNote[] = [
        { keys: ['f/4'], stem_direction: -1, duration: '16' },
        { keys: ['e/4'], stem_direction: -1, duration: '16' },
        { keys: ['d/4'], stem_direction: -1, duration: '16' },
        { keys: ['c/4'], stem_direction: -1, duration: '16' },
        { keys: ['c/4'], stem_direction: -1, duration: '16' },
        { keys: ['d/4'], stem_direction: -1, duration: '16' },
        { keys: ['f/4'], stem_direction: -1, duration: '16' },
        { keys: ['e/4'], stem_direction: -1, duration: '16' },
      ].map(vf.StaveNote.bind(vf));

      const gracenotes1: GraceNote[] = [
        { keys: ['b/4'], stem_direction: 1, duration: '8', slash: true },
      ].map(vf.GraceNote.bind(vf));

      const gracenotes2: GraceNote[] = [
        { keys: ['f/4'], stem_direction: -1, duration: '8', slash: true },
      ].map(vf.GraceNote.bind(vf));

      const gracenotes3: GraceNote[] = [
        { keys: ['f/4'], duration: '32', stem_direction: -1 },
        { keys: ['e/4'], duration: '32', stem_direction: -1 },
      ].map(vf.GraceNote.bind(vf));

      const gracenotes4: GraceNote[] = [
        { keys: ['f/5'], duration: '32', stem_direction: 1 },
        { keys: ['e/5'], duration: '32', stem_direction: 1 },
        { keys: ['e/5'], duration: '8', stem_direction: 1 },
      ].map(vf.GraceNote.bind(vf));

      gracenotes2[0].setStemDirection(-1);
      gracenotes2[0].addAccidental(0, vf.Accidental(<IFactoryParams>{ type: '#' }));

      notes[1].addModifier(0, vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes4 }).beamNotes());
      notes[3].addModifier(0, vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes1 }));
      notes2[1].addModifier(0, vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes2 }).beamNotes());
      notes2[5].addModifier(0, vf.GraceNoteGroup(<IFactoryParams>{ notes: <Note[]>gracenotes3 }).beamNotes());

      const voice = vf.Voice()
        .setStrict(false)
        .addTickables(notes);

      const voice2 = vf.Voice()
        .setStrict(false)
        .addTickables(notes2);

      vf.Beam(<IFactoryParams>{ notes: <Note[]>notes.slice(0, 4) });
      vf.Beam(<IFactoryParams>{ notes: <Note[]>notes.slice(4, 8) });
      vf.Beam(<IFactoryParams>{ notes: <Note[]>notes2.slice(0, 4) });
      vf.Beam(<IFactoryParams>{ notes: <Note[]>notes2.slice(4, 8) });

      new Formatter()
        .joinVoices([voice, voice2])
        .formatToStave([voice, voice2], stave);

      vf.draw();
      vf.draw();

      ok(true, 'Seventeenth Test');
    },
  };
})();
