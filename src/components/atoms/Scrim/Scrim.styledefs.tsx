export const scrimVariants = ['darken', 'lighten'] as const;
export type IScrimVariant = (typeof scrimVariants)[number];

export type IScrimStyleKey =
  | 'host'
  | 'host$darken'
  | 'host$lighten'
  | 'transition$unmounted'
  | 'transition$initial'
  | 'transition$open'
  | 'transition$close';

export type IScrimStyleVarKey =
  | 'containerColor$darken'
  | 'containerColor$lighten';
