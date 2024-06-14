export const iconbuttonVariants = [
  'standard',
  'filled',
  'filledTonal',
  'outlined',
  'danger',
  'snackbar',
] as const;
export type IIconButtonVariant = (typeof iconbuttonVariants)[number];

export type IIconButtonStyleKey =
  | 'host'
  | 'host$toggle'
  | 'host$toggle$selected';

export type IIconButtonStyleVarKey =
  | 'containerColor'
  | 'containerColor$disabled'
  | 'containerWidth'
  | 'containerHeight'
  | 'containerShape'
  | 'containerOpacity$disabled'
  | 'unselectedContainerColor'
  | 'selectedContainerColor'
  | 'outlineStyle'
  | 'outlineWidth'
  | 'outlineColor'
  | 'outlineColor$focus'
  | 'outlineColor$pressed'
  | 'outlineColor$disabled'
  | 'outlineOpacity$disabled'
  | 'iconSize'
  | 'iconColor'
  | 'iconColor$disabled'
  | 'iconColor$focus'
  | 'iconColor$hover'
  | 'iconColor$pressed'
  | 'iconOpacity$disabled'
  | 'toggleIconColor'
  | 'toggleIconColor$focus'
  | 'toggleIconColor$hover'
  | 'toggleIconColor$pressed'
  | 'toggleSelectedIconColor'
  | 'toggleSelectedIconColor$focus'
  | 'toggleSelectedIconColor$hover'
  | 'toggleSelectedIconColor$pressed'
  | 'stateLayerColor$hover'
  | 'stateLayerOpacity$hover'
  | 'stateLayerColor$pressed'
  | 'stateLayerOpacity$pressed'
  | 'toggleStateLayerColor$hover'
  | 'toggleStateLayerColor$pressed'
  | 'toggleSelectedStateLayerColor$hover'
  | 'toggleSelectedStateLayerColor$pressed';

export type IIconButtonStyleStateVarKey =
  | 'iconColor'
  | 'outlineColor'
  | 'stateLayerColor$hover'
  | 'stateLayerColor$pressed'
  | 'stateLayerOpacity$hover'
  | 'stateLayerOpacity$pressed';
