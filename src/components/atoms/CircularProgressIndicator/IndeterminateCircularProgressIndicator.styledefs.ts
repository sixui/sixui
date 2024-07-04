import type { ICircularProgressIndicatorStyleKey } from './CircularProgressIndicator.styledefs';

export type IIndeterminateCircularProgressIndicatorStyleKey =
  | ICircularProgressIndicatorStyleKey
  | 'progress'
  | 'spinner'
  | 'left'
  | 'right'
  | 'circle'
  | 'circle$md'
  | 'circle$lg'
  | 'circle$disabled'
  | 'leftCircle'
  | 'rightCircle';
