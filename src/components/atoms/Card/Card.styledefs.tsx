export const cardVariants = ['elevated', 'filled', 'outlined'] as const;
export type ICardVariant = (typeof cardVariants)[number];

export type ICardStyleKey =
  | 'host'
  | 'host$actionable'
  | 'host$disabled'
  | 'outline'
  | 'outline$actionable'
  | 'outline$disabled'
  | 'outline$dragged'
  | 'background'
  | 'background$disabled';

export type ICardStyleVarKey =
  | 'containerShape'
  | 'containerColor'
  | 'containerColor$disabled'
  | 'containerOpacity$disabled'
  | 'containerElevation'
  | 'containerElevation$disabled'
  | 'containerElevation$focus'
  | 'containerElevation$hover'
  | 'containerElevation$pressed'
  | 'containerElevation$dragged'
  | 'outlineColor'
  | 'outlineWidth'
  | 'outlineColor$disabled'
  | 'outlineOpacity$disabled'
  | 'outlineColor$focus'
  | 'outlineColor$hover'
  | 'outlineColor$pressed'
  | 'outlineColor$dragged'
  | 'stateLayerColor$hover'
  | 'stateLayerOpacity$hover'
  | 'stateLayerColor$pressed'
  | 'stateLayerOpacity$pressed'
  | 'stateLayerColor$dragged'
  | 'stateLayerOpacity$dragged';

export type ICardStyleStateVarKey = 'elevation';
