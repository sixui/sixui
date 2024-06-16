export const buttonVariants = [
  'elevated',
  'filled',
  'filledTonal',
  'outlined',
  'text',
  'danger',
  'snackbar',
] as const;
export type IButtonVariant = (typeof buttonVariants)[number];

export type IButtonStyleKey =
  | 'host'
  | 'host$disabled'
  | 'host$withLeadingIcon'
  | 'host$withTrailingIcon'
  | 'outline'
  | 'outline$disabled'
  | 'touchTarget'
  | 'icon'
  | 'icon$disabled'
  | 'icon$halfSpin'
  | 'background'
  | 'background$disabled'
  | 'label'
  | 'label$disabled'
  | 'invisible'
  | 'overlay';

type IOutlineStyleVarKey =
  | 'outlineStyle'
  | 'outlineWidth'
  | 'outlineColor'
  | 'outlineColor$disabled'
  | 'outlineColor$focus'
  | 'outlineColor$pressed'
  | 'outlineOpacity$disabled';

type IContainerStyleVarKey =
  | 'containerHeight'
  | 'containerShape'
  | 'containerColor'
  | 'containerColor$disabled'
  | 'containerElevation'
  | 'containerElevation$disabled'
  | 'containerElevation$focus'
  | 'containerElevation$hover'
  | 'containerElevation$pressed'
  | 'containerOpacity$disabled';

type IStateLayerStyleVarKey =
  | 'stateLayerColor$hover'
  | 'stateLayerColor$pressed'
  | 'stateLayerOpacity$hover'
  | 'stateLayerOpacity$pressed';

type ILabelStyleVarKey =
  | 'labelTextColor'
  | 'labelTextColor$disabled'
  | 'labelTextColor$focus'
  | 'labelTextColor$hover'
  | 'labelTextColor$pressed'
  | 'labelTextOpacity$disabled'
  | 'labelTextFont'
  | 'labelTextLineHeight'
  | 'labelTextSize'
  | 'labelTextLetterSpacing'
  | 'labelTextWeight';

type IIconStyleVarKey =
  | 'iconSize'
  | 'iconColor'
  | 'iconColor$disabled'
  | 'iconColor$focus'
  | 'iconColor$hover'
  | 'iconColor$pressed'
  | 'iconOpacity$disabled';

export type IButtonStyleVarKey =
  | IOutlineStyleVarKey
  | IContainerStyleVarKey
  | IStateLayerStyleVarKey
  | ILabelStyleVarKey
  | IIconStyleVarKey
  | 'gap'
  | 'leadingSpace'
  | 'trailingSpace'
  | 'touchTargetSpace'
  | 'leadingIconLeadingSpace'
  | 'leadingIconTrailingSpace'
  | 'trailingIconLeadingSpace'
  | 'trailingIconTrailingSpace';

export type IButtonStyleStateVarKey = 'elevation' | 'iconColor';
