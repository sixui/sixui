export const scrimVariants = ['darken', 'lighten'] as const;
export type IScrimVariant = (typeof scrimVariants)[number];

export type IScrimStyleKey =
  | 'host'
  | 'host$close'
  | 'host$darken'
  | 'host$lighten'
  | 'host$contained';

export type IScrimStyleVarKey =
  | 'containerColor$darken'
  | 'containerColor$lighten';
