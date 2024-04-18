import type { ICircularProgressIndicatorStyleKey } from './CircularProgressIndicator.styledefs';

export type IDeterminateCircularProgressIndicatorStyleKey =
  | ICircularProgressIndicatorStyleKey
  | 'svg'
  | 'svgCircle'
  | 'svgCircle$md'
  | 'svgCircle$lg'
  | 'track'
  | 'activeTrack'
  | 'activeTrack$disabled';
