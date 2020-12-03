export interface IClefPropertyValue {
  line_shift: number;
}

export interface IClefType {
  point: any;
  code: string;
  line: number;
}

export interface IClefProperties {
  (clef: string): any;

  values: Record<string, IClefPropertyValue>;
}
