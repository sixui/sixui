export type ISkeletonStyleKey =
  | 'host'
  | 'host$error'
  | 'host$rectangular'
  | 'host$circular'
  | 'host$overlay'
  | 'length'
  | 'hidden'
  | 'animation$pulse'
  | 'animation$wave';

export type ISkeletonStyleVarKey =
  | 'zIndex'
  | 'containerShape'
  | 'containerColor'
  | 'containerColor$error'
  | 'animationTargetColor'
  | 'animationMaxOpacity$pulse'
  | 'animationDuration$pulse'
  | 'animationDelay$pulse'
  | 'animationMaxOpacity$wave'
  | 'animationDuration$wave'
  | 'animationDelay$wave';
