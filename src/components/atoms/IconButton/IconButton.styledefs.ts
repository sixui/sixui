export const iconbuttonVariants = [
  'standard',
  'filled',
  'filledTonal',
  'outlined',
] as const;
export type IIconButtonVariant = (typeof iconbuttonVariants)[number];

export type IIconButtonStyleKey =
  | 'host'
  | 'host$selected'
  | 'host$toggle'
  | 'host$toggle$selected'
  | 'host$disabled'
  | 'button'
  | 'icon'
  | 'icon$flip'
  | 'icon$toggle'
  | 'icon$toggle$selected'
  | 'icon$disabled'
  | 'link'
  | 'touchTarget'
  | 'background'
  | 'background$disabled'
  | 'background$selected'
  | 'background$unselected'
  | 'outline'
  | 'outline$disabled'
  | 'invisible'
  | 'overlay';

export type IIconButtonStyleVarKey =
  | 'containerColor'
  | 'containerColor$disabled'
  | 'containerWidth'
  | 'containerHeight'
  | 'containerShape'
  | 'containerOpacity$disabled'
  | 'unselectedContainerColor'
  | 'selectedContainerColor'
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
  | 'stateLayerOpacity$pressed'
  | 'stateLayerColor$pressed'
  | 'selectedStateLayerColor$hover'
  | 'selectedStateLayerOpacity$hover'
  | 'selectedStateLayerColor$pressed'
  | 'selectedStateLayerOpacity$pressed'
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
