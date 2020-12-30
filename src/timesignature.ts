// [VexFlow](http://vexflow.com) - Copyright (c) Mohit Muthanna 2010.
//
// ## Description
// Implements time signatures glyphs for staffs
// See tables.js for the internal time signatures
// representation
import {Glyph} from './glyph';
import {StaveModifier} from './stavemodifier';
import {IGlyphMetrics} from "./types/glyph";
import {ITimeSignature, ITimeSignatureGlyph} from "./types/timesignature";
import {RuntimeError} from "./runtimeerror";

const assertIsValidFraction = (timeSpec: string) => {
  const numbers = timeSpec.split('/').filter(number => number !== '');

  if (numbers.length !== 2) {
    throw new RuntimeError(
      'BadTimeSignature',
      `Invalid time spec: ${timeSpec}. Must be in the form "<numerator>/<denominator>"`
    );
  }

  numbers.forEach(number => {
    if (isNaN(Number(number))) {
      throw new RuntimeError(
        'BadTimeSignature', `Invalid time spec: ${timeSpec}. Must contain two valid numbers.`
      );
    }
  });
};

export class TimeSignature extends StaveModifier {
  point: number;
  bottomLine: number;
  timeSig: ITimeSignature;

  private readonly validate_args: boolean;

  private topLine: number;

  static get CATEGORY(): string {
    return 'timesignatures';
  }

  static get glyphs(): Record<string, ITimeSignatureGlyph> {
    return {
      'C': {
        code: 'timeSigCommon',
        point: 40,
        line: 2,
      },
      'C|': {
        code: 'timeSigCutCommon',
        point: 40,
        line: 2,
      },
    };
  }

  constructor(timeSpec: string = null, customPadding = 15, validate_args = true) {
    super();
    this.setAttribute('type', 'TimeSignature');
    this.validate_args = validate_args;

    if (timeSpec === null) return;

    const padding = customPadding;

    this.point = this.musicFont.lookupMetric('digits.point');
    const fontLineShift = this.musicFont.lookupMetric('digits.shiftLine', 0);
    this.topLine = 2 + fontLineShift;
    this.bottomLine = 4 + fontLineShift;
    this.setPosition(StaveModifier.Position.BEGIN);
    this.setTimeSig(timeSpec);
    this.setWidth(this.timeSig.glyph.getMetrics().width);
    this.setPadding(padding);
  }

  getCategory(): string {
    return TimeSignature.CATEGORY;
  }

  parseTimeSpec(timeSpec: string): ITimeSignature {
    if (timeSpec === 'C' || timeSpec === 'C|') {
      const {line, code, point} = TimeSignature.glyphs[timeSpec];
      return {
        line,
        num: false,
        glyph: new Glyph(code, point),
      } as ITimeSignature;
    }

    if (this.validate_args) {
      assertIsValidFraction(timeSpec);
    }

    const [topDigits, botDigits] = timeSpec
      .split('/')
      .map(number => number.split(''));

    return {
      num: true,
      glyph: this.makeTimeSignatureGlyph(topDigits, botDigits),
    } as ITimeSignature;
  }

  makeTimeSignatureGlyph(topDigits: string[], botDigits: string[]): Glyph {
    const glyph = new Glyph('timeSig0', this.point);
    glyph.topGlyphs = [];
    glyph.botGlyphs = [];

    let topWidth = 0;
    for (let i = 0; i < topDigits.length; ++i) {
      const num = topDigits[i];
      const topGlyph = new Glyph('timeSig' + num, this.point);

      glyph.topGlyphs.push(topGlyph);
      topWidth += topGlyph.getMetrics().width;
    }

    let botWidth = 0;
    for (let i = 0; i < botDigits.length; ++i) {
      const num = botDigits[i];
      const botGlyph = new Glyph('timeSig' + num, this.point);

      glyph.botGlyphs.push(botGlyph);
      botWidth += botGlyph.getMetrics().width;
    }

    const width = topWidth > botWidth ? topWidth : botWidth;
    const xMin = glyph.getMetrics().x_min;

    glyph.getMetrics = () => ({
      x_min: xMin,
      x_max: xMin + width,
      width,
    } as IGlyphMetrics);

    const topStartX = (width - topWidth) / 2.0;
    const botStartX = (width - botWidth) / 2.0;

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    glyph.renderToStave = function renderToStave(x) {
      let start_x = x + topStartX;
      for (let i = 0; i < this.topGlyphs.length; ++i) {
        const glyph = this.topGlyphs[i];
        Glyph.renderOutline(
          this.context,
          glyph.metrics.outline,
          glyph.scale,
          start_x + glyph.x_shift,
          this.stave.getYForLine(that.topLine)
        );
        start_x += glyph.getMetrics().width;
      }

      start_x = x + botStartX;
      for (let i = 0; i < this.botGlyphs.length; ++i) {
        const glyph = this.botGlyphs[i];
        that.placeGlyphOnLine(glyph, this.stave, glyph.line);
        Glyph.renderOutline(
          this.context,
          glyph.metrics.outline,
          glyph.scale,
          start_x + glyph.x_shift,
          this.stave.getYForLine(that.bottomLine)
        );
        start_x += glyph.getMetrics().width;
      }
    };

    return glyph;
  }

  getTimeSig(): ITimeSignature {
    return this.timeSig;
  }

  setTimeSig(timeSpec: string): this {
    this.timeSig = this.parseTimeSpec(timeSpec) as ITimeSignature;
    return this;
  }

  draw(): void {
    if (!this.x) {
      throw new RuntimeError('TimeSignatureError', "Can't draw time signature without x.");
    }

    if (!this.stave) {
      throw new RuntimeError('TimeSignatureError', "Can't draw time signature without stave.");
    }

    this.setRendered();
    this.timeSig.glyph.setStave(this.stave);
    this.timeSig.glyph.setContext(this.stave.context);
    this.placeGlyphOnLine(this.timeSig.glyph, this.stave, this.timeSig.line);
    this.timeSig.glyph.renderToStave(this.x);
  }
}
