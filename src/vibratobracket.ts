// [VexFlow](http://vexflow.com) - Copyright (c) Mohit Muthanna 2010.
// Author: Balazs Forian-Szabo
//
// ## Description
//
// This file implements `VibratoBrackets`
// that renders vibrato effect between two notes.
import {Element} from './element';
import {Vibrato} from './vibrato';
import {Note} from "./note";
import {IVibratoBracketData, IVibratoBracketRenderOptions} from "./types/vibratobracket";
import {LOG} from "./flow";

// To enable logging for this class. Set `Vex.Flow.VibratoBracket.DEBUG` to `true`.
function L(...args: unknown[]) {
  if (VibratoBracket.DEBUG) LOG('Vex.Flow.VibratoBracket', args);
}

export class VibratoBracket extends Element {
  static DEBUG: boolean;

  private line: number;

  private readonly start: Note;
  private readonly stop: Note;
  private readonly render_options: IVibratoBracketRenderOptions;

  // bracket_data = {
  //   start: Vex.Flow.Note (optional)
  //   stop: Vex.Flow.Note (optional)
  // };
  // Either the stop or start note must be set, or both of them.
  // A null value for the start or stop note indicates that the vibrato
  // is drawn from the beginning or until the end of the stave accordingly.
  constructor(bracket_data: IVibratoBracketData) {
    super();
    this.setAttribute('type', 'VibratoBracket');

    this.start = bracket_data.start;
    this.stop = bracket_data.stop;

    this.line = 1;

    this.render_options = {
      harsh: false,
      wave_height: 6,
      wave_width: 4,
      wave_girth: 2,
    } as IVibratoBracketRenderOptions;
  }

  // Set line position of the vibrato bracket
  setLine(line: number): this {
    this.line = line;
    return this;
  }

  setHarsh(harsh: boolean): this {
    this.render_options.harsh = harsh;
    return this;
  }

  // Draw the vibrato bracket on the rendering context
  draw(): void {
    const ctx = this.context;
    this.setRendered();

    const y = (this.start)
      ? this.start.getStave().getYForTopText(this.line)
      : this.stop.getStave().getYForTopText(this.line);

    // If start note is not set then vibrato will be drawn
    // from the beginning of the stave
    const start_x = (this.start)
      ? this.start.getAbsoluteX()
      : this.stop.getStave().getTieStartX();

    // If stop note is not set then vibrato will be drawn
    // until the end of the stave
    const stop_x = (this.stop)
      ? this.stop.getAbsoluteX() - this.stop.getWidth() - 5
      : this.start.getStave().getTieEndX() - 10;

    this.render_options.vibrato_width = stop_x - start_x;

    L('Rendering VibratoBracket: start_x:', start_x, 'stop_x:', stop_x, 'y:', y);

    Vibrato.renderVibrato(ctx, start_x, y, this.render_options);
  }
}
