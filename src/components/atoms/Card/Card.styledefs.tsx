export const cardVariants = ['elevated', 'filled', 'outlined'] as const;
export type ICardVariant = (typeof cardVariants)[number];

export type ICardStyleKey =
  | 'host'
  | 'host$interactive'
  | 'host$disabled'
  | 'outline'
  | 'outline$interactive'
  | 'outline$disabled'
  | 'background'
  | 'background$disabled'
  | 'icon'
  | 'content';

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
  | 'outlineColor'
  | 'outlineWidth'
  | 'outlineColor$disabled'
  | 'outlineOpacity$disabled'
  | 'outlineColor$focus'
  | 'outlineColor$hover'
  | 'outlineColor$pressed'
  | 'stateLayerColor$hover'
  | 'stateLayerOpacity$hover'
  | 'stateLayerColor$pressed'
  | 'stateLayerOpacity$pressed'
  | 'iconColor'
  | 'iconSize';

export type ICardStyleStateVarKey = 'elevation';
