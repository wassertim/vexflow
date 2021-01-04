import {StaveNote} from "../stavenote";

export interface IBuilderOptions {
  clef: string;
  stem: string
}

export interface IBuilderElements {
  notes: StaveNote[];
  accidentals: any[]
}

export interface IBuilderPiece {
  duration: string;
  dots: number;
  chord: any[];
  options: any;
  type: string
}
