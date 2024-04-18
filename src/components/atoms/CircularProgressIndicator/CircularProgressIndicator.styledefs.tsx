export const circularProgressIndicatorSizes = ['md', 'lg'] as const;
export type ICircularProgressIndicatorSize =
  (typeof circularProgressIndicatorSizes)[number];

export type ICircularProgressIndicatorStyleKey =
  | 'host'
  | 'host$md'
  | 'host$lg'
  | 'progress'
  | 'progress$md'
  | 'progress$lg'
  | 'layer'
  | 'spinner'
  | 'left'
  | 'right'
  | 'circle'
  | 'leftCircle'
  | 'rightCircle'
  | 'label'
  | 'label$disabled';

export type ICircularProgressIndicatorStyleVarKey =
  | 'color'
  | 'color$disabled'
  | 'size$md'
  | 'size$lg'
  | 'containerPadding$md'
  | 'containerPadding$lg'
  | 'widthPct$md'
  | 'widthPct$lg';
