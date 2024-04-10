export const chipVariants = [
  'assist',
  'filter',
  'input',
  'suggestion',
] as const;
export type IChipVariant = (typeof chipVariants)[number];

export type IChipStyleKey =
  | 'host'
  | 'host$interactive'
  | 'host$avatar'
  | 'host$disabled'
  | 'container'
  | 'flatContainer'
  | 'flatContainer$interactive'
  | 'flatContainer$disabled'
  | 'elevatedContainer'
  | 'elevatedContainer$interactive'
  | 'elevatedContainer$disabled'
  | 'selectedFlatContainer'
  | 'selectedFlatContainer$interactive'
  | 'selectedFlatContainer$disabled'
  | 'selectedElevatedContainer'
  | 'selectedElevatedContainer$interactive'
  | 'selectedElevatedContainer$disabled'
  | 'action'
  | 'action$trailing'
  | 'action$primary'
  | 'action$primary$hasLeading'
  | 'action$primary$hasTrailing'
  | 'action$primary$avatar'
  | 'icon'
  | 'icon$selected'
  | 'icon$selected$interactive'
  | 'icon$leading'
  | 'icon$leadingg$interactive'
  | 'icon$trailing'
  | 'icon$trailing$interactive'
  | 'icon$trailing$selected'
  | 'icon$trailing$selected$interactive'
  | 'icon$avatar'
  | 'icon$disabled'
  | 'labelContainer'
  | 'labelContainer$hasTrailing'
  | 'label'
  | 'label$interactive'
  | 'label$selected'
  | 'label$selected$interactive'
  | 'label$disabled'
  | 'touchTarget'
  | 'outline'
  | 'outline$interactive'
  | 'outline$selected'
  | 'outline$disabled'
  | 'invisible'
  | 'overlay';

type IOutlineStyleVarKey =
  | 'outlineWidth'
  | 'outlineColor'
  | 'outlineColor$disabled'
  | 'outlineColor$focus'
  | 'outlineColor$pressed'
  | 'outlineOpacity$disabled';

type ISelectableFlatOutlineStyleVarKey = 'selectedOutlineWidth';

type IContainerStyleVarKey = 'containerHeight' | 'containerShape';

type IFlatContainerStyleVarKey =
  | 'flatContainerColor'
  | 'flatContainerColor$disabled'
  | 'flatContainerElevation'
  | 'flatContainerElevation$disabled'
  | 'flatContainerElevation$focus'
  | 'flatContainerElevation$hover'
  | 'flatContainerElevation$pressed'
  | 'flatContainerOpacity$disabled';

type IElevatedContainerStyleVarKey =
  | 'elevatedContainerColor'
  | 'elevatedContainerColor$disabled'
  | 'elevatedContainerElevation'
  | 'elevatedContainerElevation$disabled'
  | 'elevatedContainerElevation$focus'
  | 'elevatedContainerElevation$hover'
  | 'elevatedContainerElevation$pressed'
  | 'elevatedContainerOpacity$disabled';

type ISelectableContainerStyleVarKey =
  | 'selectedFlatContainerColor'
  | 'selectedFlatContainerColor$disabled'
  | 'selectedFlatContainerElevation$disabled'
  | 'selectedFlatContainerElevation$focus'
  | 'selectedFlatContainerElevation$hover'
  | 'selectedFlatContainerElevation$pressed'
  | 'selectedFlatContainerOpacity$disabled'
  | 'selectedElevatedContainerColor';

type IStateLayerStyleVarKey =
  | 'stateLayerColor$hover'
  | 'stateLayerColor$pressed'
  | 'stateLayerOpacity$hover'
  | 'stateLayerOpacity$pressed';

type ISelectableStateLayerStyleVarKey =
  | 'selectedStateLayerColor$hover'
  | 'selectedStateLayerColor$pressed'
  | 'selectedStateLayerOpacity$hover'
  | 'selectedStateLayerOpacity$pressed';

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

type ISelectableLabelStyleVarKey =
  | 'selectedLabelTextColor'
  | 'selectedLabelTextColor$hover'
  | 'selectedLabelTextColor$focus'
  | 'selectedLabelTextColor$pressed';

type IIconStyleVarkey =
  | 'iconSize'
  | 'iconLeadingSpace'
  | 'iconColor'
  | 'iconColor$interactive'
  | 'iconColor$disabled'
  | 'iconColor$focus'
  | 'iconColor$hover'
  | 'iconColor$pressed'
  | 'iconOpacity$disabled';

type ITrailingIconStyleVarkey =
  | 'trailingIconColor'
  | 'trailingIconColor$disabled'
  | 'trailingIconColor$focus'
  | 'trailingIconColor$hover'
  | 'trailingIconColor$pressed'
  | 'trailingIconOpacity$disabled';

type ISelectableIconStyleVarKey =
  | 'selectedIconColor'
  | 'selectedIconColor$focus'
  | 'selectedIconColor$hover'
  | 'selectedIconColor$pressed';

type ISelectableTrailingIconStyleVarKey =
  | 'selectedTrailingIconColor'
  | 'selectedTrailingIconColor$focus'
  | 'selectedTrailingIconColor$hover'
  | 'selectedTrailingIconColor$pressed';

type ISelectableChipStyleVarKey =
  | IOutlineStyleVarKey
  | IContainerStyleVarKey
  | IFlatContainerStyleVarKey
  | IElevatedContainerStyleVarKey
  | IStateLayerStyleVarKey
  | ILabelStyleVarKey
  | IIconStyleVarkey
  | ITrailingIconStyleVarkey
  | IAvatarStyleVarKey
  | ISelectableFlatOutlineStyleVarKey
  | ISelectableContainerStyleVarKey
  | ISelectableIconStyleVarKey
  | ISelectableTrailingIconStyleVarKey
  | ISelectableStateLayerStyleVarKey
  | ISelectableLabelStyleVarKey;

type IAvatarStyleVarKey = 'avatarShape' | 'avatarSize';

export type IChipStyleVarKey =
  | ISelectableChipStyleVarKey
  | 'leadingSpace'
  | 'trailingSpace'
  | 'iconLabelSpace'
  | 'leadingIconLeadingSpace'
  | 'trailingIconTrailingSpace';

export type IChipStyleStateVarKey =
  | 'containerShape'
  | 'elevation'
  | 'iconColor';
