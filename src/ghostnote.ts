// [VexFlow](http://vexflow.com) - Copyright (c) Mohit Muthanna 2010.
//
// ## Description
import {StemmableNote} from './stemmablenote';
import {Stave} from "./stave";
import {RuntimeError} from "./runtimeerror";

export class GhostNote extends StemmableNote {
  /** @constructor */
  constructor(parameter: any) {
    // Sanity check
    if (!parameter) {
      throw new RuntimeError('BadArguments',
        'Ghost note must have valid initialization data to identify ' +
        'duration.');
    }

    let note_struct;

    // Preserve backwards-compatibility
    if (typeof (parameter) === 'string') {
      note_struct = { duration: parameter };
    } else if (typeof (parameter) === 'object') {
      note_struct = parameter;
    } else {
      throw new RuntimeError('BadArguments',
        'Ghost note must have valid initialization data to identify ' +
        'duration.');
    }

    super(note_struct);
    this.setAttribute('type', 'GhostNote');

    // Note properties
    this.setWidth(0);
  }

  isRest(): boolean { return true; }

  setStave(stave: Stave): this {
    super.setStave(stave);
    return this;
  }

  addToModifierContext(): this { /* intentionally overridden */ return this; }

  preFormat(): this {
    this.setPreFormatted(true);
    return this;
  }

  draw(): void {
    if (!this.stave) throw new RuntimeError('NoStave', "Can't draw without a stave.");

    // Draw the modifiers
    this.setRendered();
    for (let i = 0; i < this.modifiers.length; ++i) {
      const modifier = this.modifiers[i];
      modifier.setContext(this.context);
      modifier.drawWithStyle();
    }
  }
}
