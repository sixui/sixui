export const listItemVariants = ['standard', 'danger'] as const;
export type IListItemVariant = (typeof listItemVariants)[number];

export type IListItemStyleKey =
  | 'host'
  | 'host$sm'
  | 'host$md'
  | 'host$lg'
  | 'host$xl'
  | 'host$interactive'
  | 'host$selected'
  | 'host$disabled'
  | 'host$leadingSpace'
  | 'host$trailingSpace'
  | 'listItem'
  | 'listItem$interactive'
  | 'listItem$disabled'
  | 'background'
  | 'background$selected'
  | 'background$disabled'
  | 'leading'
  | 'trailing'
  | 'icon'
  | 'icon$leading'
  | 'icon$leading$selected'
  | 'icon$leading$disabled'
  | 'image'
  | 'video'
  | 'icon$trailing'
  | 'icon$trailing$selected'
  | 'icon$trailing$disabled';

export type IListItemStyleVarKey =
  | 'leadingSpace'
  | 'topSpace$sm'
  | 'topSpace$md'
  | 'topSpace$lg'
  | 'topSpace$xl'
  | 'bottomSpace$sm'
  | 'bottomSpace$md'
  | 'bottomSpace$lg'
  | 'bottomSpace$xl'
  | 'trailingSpace'
  | 'containerColor'
  | 'containerOpacity'
  | 'containerShape'
  | 'containerMinHeight$sm'
  | 'containerMinHeight$md'
  | 'containerMinHeight$lg'
  | 'containerMinHeight$xl'
  | 'containerColor$disabled'
  | 'containerOpacity$disabled'
  | 'selectedContainerColor'
  | 'selectedContainerOpacity'
  | 'textColor'
  | 'textColor$disabled'
  | 'textOpacity$disabled'
  | 'textColor$focus'
  | 'textColor$hover'
  | 'textColor$pressed'
  | 'selectedTextColor'
  | 'selectedTextColor$focus'
  | 'selectedTextColor$hover'
  | 'selectedTextColor$pressed'
  | 'nonTextColor'
  | 'nonTextColor$disabled'
  | 'nonTextOpacity$disabled'
  | 'nonTextColor$focus'
  | 'nonTextColor$hover'
  | 'nonTextColor$pressed'
  | 'selectedNonTextColor'
  | 'selectedNonTextColor$focus'
  | 'selectedNonTextColor$hover'
  | 'selectedNonTextColor$pressed'
  | 'stateLayerColor$hover'
  | 'stateLayerOpacity$hover'
  | 'stateLayerColor$pressed'
  | 'stateLayerOpacity$pressed'
  | 'leadingIconColor'
  | 'leadingIconSize'
  | 'leadingIconColor$disabled'
  | 'leadingIconOpacity$disabled'
  | 'leadingIconColor$focus'
  | 'leadingIconColor$hover'
  | 'leadingIconColor$pressed'
  | 'selectedLeadingIconColor'
  | 'selectedLeadingIconColor$focus'
  | 'selectedLeadingIconColor$hover'
  | 'selectedLeadingIconColor$pressed'
  | 'trailingIconColor'
  | 'trailingIconSize'
  | 'trailingIconColor$disabled'
  | 'trailingIconOpacity$disabled'
  | 'trailingIconColor$focus'
  | 'trailingIconColor$hover'
  | 'trailingIconColor$pressed'
  | 'selectedTrailingIconColor'
  | 'selectedTrailingIconColor$focus'
  | 'selectedTrailingIconColor$hover'
  | 'selectedTrailingIconColor$pressed'
  | 'imageWidth'
  | 'imageHeight'
  | 'videoHeight';

export type IListItemStyleStateVarKey =
  | 'nonTextColor'
  | 'nonTextOpacity'
  | 'textColor'
  | 'textOpacity'
  | 'leadingSpace'
  | 'trailingSpace'
  | 'containerMinHeight'
  | 'topSpace'
  | 'bottomSpace';