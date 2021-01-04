// [VexFlow](http://vexflow.com) - Copyright (c) Mohit Muthanna 2010.
//
// ## Description
// This class implements varies types of tunings for tablature.
import {RuntimeError} from "./runtimeerror";
import {integerToNote, keyProperties} from "./flow";

export class Tuning {
  private numStrings: number;
  private tuningString: string;
  private tuningValues: number[];

  static get names(): Record<string, string> {
    return {
      'standard': 'E/5,B/4,G/4,D/4,A/3,E/3',
      'dagdad': 'D/5,A/4,G/4,D/4,A/3,D/3',
      'dropd': 'E/5,B/4,G/4,D/4,A/3,D/3',
      'eb': 'Eb/5,Bb/4,Gb/4,Db/4,Ab/3,Db/3',
      'standardBanjo': 'D/5,B/4,G/4,D/4,G/5',
    };
  }

  constructor(tuningString = 'E/5,B/4,G/4,D/4,A/3,E/3,B/2,E/2') {
    // Default to standard tuning.
    this.setTuning(tuningString);
  }

  noteToInteger(noteString: string): number {
    return keyProperties(noteString).int_value;
  }

  setTuning(noteString: string): void {
    if (Tuning.names[noteString]) {
      noteString = Tuning.names[noteString];
    }

    this.tuningString = noteString;
    this.tuningValues = [];
    this.numStrings = 0;

    const keys = noteString.split(/\s*,\s*/);
    if (keys.length === 0) {
      throw new RuntimeError('BadArguments', 'Invalid tuning string: ' + noteString);
    }

    this.numStrings = keys.length;
    for (let i = 0; i < this.numStrings; ++i) {
      this.tuningValues[i] = this.noteToInteger(keys[i]);
    }
  }

  getValueForString(stringNum: string|number): number {
    const s = typeof stringNum === "string" ? parseInt(stringNum, 10) : stringNum;
    if (s < 1 || s > this.numStrings) {
      throw new RuntimeError(
        'BadArguments', `String number must be between 1 and ${this.numStrings}:${stringNum}`
      );
    }

    return this.tuningValues[s - 1];
  }

  getValueForFret(fretNum: string|number, stringNum: string|number): number {
    const stringValue = this.getValueForString(stringNum);
    const f = typeof fretNum === "string" ? parseInt(fretNum, 10) : fretNum;

    if (f < 0) {
      throw new RuntimeError('BadArguments', 'Fret number must be 0 or higher: ' +
        fretNum);
    }

    return stringValue + f;
  }

  getNoteForFret(fretNum: string|number, stringNum: string|number): string {
    const noteValue = this.getValueForFret(fretNum, stringNum);

    const octave = Math.floor(noteValue / 12);
    const value = noteValue % 12;

    return integerToNote(value) + '/' + octave;
  }
}
