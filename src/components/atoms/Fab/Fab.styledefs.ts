export const fabVariants = [
  'surface',
  'primary',
  'secondary',
  'tertiary',
  'branded',
] as const;
export type IFabVariant = (typeof fabVariants)[number];

export const fabSizes = ['sm', 'md', 'lg'] as const;
export type IFabSize = (typeof fabSizes)[number];

export type IFabStyleKey =
  | 'host'
  | 'host$sm'
  | 'host$md'
  | 'host$lg'
  | 'host$lowered'
  | 'host$disabled'
  | 'fab'
  | 'fab$sm'
  | 'fab$md'
  | 'fab$lg'
  | 'fab$extended'
  | 'background'
  | 'background$lowered'
  | 'background$disabled'
  | 'icon'
  | 'icon$sm'
  | 'icon$md'
  | 'icon$lg'
  | 'icon$extended'
  | 'icon$disabled'
  | 'label'
  | 'label$disabled'
  | 'touchTarget'
  | 'invisible'
  | 'overlay';

export type IFabStyleVarKey =
  | 'containerColor'
  | 'containerColor$disabled'
  | 'containerWidth$sm'
  | 'containerWidth$md'
  | 'containerWidth$lg'
  | 'containerHeight$sm'
  | 'containerHeight$md'
  | 'containerHeight$lg'
  | 'containerShape$sm'
  | 'containerShape$md'
  | 'containerShape$lg'
  | 'containerElevation'
  | 'containerElevation$disabled'
  | 'containerElevation$hover'
  | 'containerElevation$focus'
  | 'containerElevation$pressed'
  | 'containerOpacity$disabled'
  | 'loweredContainerColor'
  | 'loweredContainerElevation'
  | 'loweredContainerElevation$hover'
  | 'loweredContainerElevation$focus'
  | 'loweredContainerElevation$pressed'
  | 'iconSize$sm'
  | 'iconSize$md'
  | 'iconSize$lg'
  | 'iconColor'
  | 'iconColor$disabled'
  | 'iconColor$hover'
  | 'iconColor$focus'
  | 'iconColor$pressed'
  | 'iconOpacity$disabled'
  | 'stateLayerColor$hover'
  | 'stateLayerOpacity$hover'
  | 'stateLayerColor$pressed'
  | 'stateLayerOpacity$pressed'
  | 'labelTextColor'
  | 'labelTextColor$disabled'
  | 'labelTextColor$hover'
  | 'labelTextColor$focus'
  | 'labelTextColor$pressed'
  | 'labelTextFont'
  | 'labelTextLineHeight'
  | 'labelTextSize'
  | 'labelTextTracking'
  | 'labelTextWeight'
  | 'labelTextOpacity$disabled';

export type IFabStyleStateVarKey = 'elevation' | 'containerShape' | 'iconColor';
