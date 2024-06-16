export const scrimVariants = ['darken', 'lighten'] as const;
export type IScrimVariant = (typeof scrimVariants)[number];

export type IScrimStyleKey =
  | 'host'
  | 'host$close'
  | 'host$darken'
  | 'host$lighten'
  | 'host$contained'
  | 'animation$onEnter'
  | 'animation$onEnterActive'
  | 'animation$onExitActive';

export type IScrimStyleVarKey =
  | 'containerColor$darken'
  | 'containerColor$lighten';
