import {Stave} from "../stave";
import {Voice} from "../voice";
import {Factory} from "../factory";

export interface ISystemParams {
  stave: Stave;
  voices: Voice[];
  noJustification: boolean;
  options: any;
  spaceAbove: number;
  spaceBelow: number;
  debugNoteMetrics: number;
}

export interface ISystemOptions {
  x: number;
  y: number;
  width: number;
  noJustification: boolean;
  noPadding: boolean;
  factory: Factory;
  debugFormatter: boolean;
  connector: any;
  spaceBetweenStaves: number;
  formatIterations: number;
  details: any;
  options: any;
}

export interface IDebugNoteMetrics {
  y: number;
  voice: Voice;
}
