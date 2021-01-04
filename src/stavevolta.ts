// [VexFlow](http://vexflow.com) - Copyright (c) Mohit Muthanna 2010.
// Author Larry Kuhns 2011

import {StaveModifier} from './stavemodifier';
import {Stave} from "./stave";
import {IFont} from "./types/font";

export enum Type {
  NONE = 1,
  BEGIN = 2,
  MID = 3,
  END = 4,
  BEGIN_END = 5,
  BEGIN_MID = 6
}

export class Volta extends StaveModifier {
  private readonly volta: number;
  private readonly number: string;

  private font: IFont;
  private y_shift: number;

  static get CATEGORY(): string {
    return 'voltas';
  }

  static get type(): typeof Type {
    return Type;
  }

  constructor(type: number, number: string, x: number, y_shift: number) {
    super();
    this.setAttribute('type', 'Volta');
    this.volta = type;
    this.x = x;
    this.y_shift = y_shift;
    this.number = number;
    this.font = {
      family: 'sans-serif',
      size: 9,
      weight: 'bold',
    } as IFont;
  }

  getCategory(): string {
    return Volta.CATEGORY;
  }

  setShiftY(y: number): this {
    this.y_shift = y;
    return this;
  }

  draw(stave?: Stave, x?: number): this {
    const ctx = stave.checkContext();
    this.setRendered();

    let width = stave.width - x; // don't include x (offset) for width
    const top_y = stave.getYForTopText(stave.options.num_lines) + this.y_shift;
    const vert_height = 1.5 * stave.options.spacing_between_lines_px;
    switch (this.volta) {
      case Volta.type.BEGIN:
        ctx.fillRect(this.x + x, top_y, 1, vert_height);
        break;
      case Volta.type.END:
        width -= 5;
        ctx.fillRect(this.x + x + width, top_y, 1, vert_height);
        break;
      case Volta.type.BEGIN_END:
        width -= 3;
        ctx.fillRect(this.x + x, top_y, 1, vert_height);
        ctx.fillRect(this.x + x + width, top_y, 1, vert_height);
        break;
      default:
        break;
    }
    // If the beginning of a volta, draw measure number
    if (this.volta === Volta.type.BEGIN || this.volta === Volta.type.BEGIN_END) {
      ctx.save();
      ctx.setFont(this.font.family, this.font.size, this.font.weight);
      ctx.fillText(this.number, this.x + x + 5, top_y + 15);
      ctx.restore();
    }

    ctx.fillRect(this.x + x, top_y, width, 1);
    return this;
  }
}
