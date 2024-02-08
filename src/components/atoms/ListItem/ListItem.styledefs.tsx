import type { IItemStyleVarKey } from '../Item';

export type IListItemStyleKey =
  | 'host'
  | 'host$interactive'
  | 'host$selected'
  | 'host$disabled'
  | 'listItem'
  | 'listItem$interactive'
  | 'listItem$disabled'
  | 'background'
  | 'background$selected'
  | 'background$disabled';

export type IListItemStyleVarKey =
  | IItemStyleVarKey
  | 'leadingSpace'
  | 'topSpace'
  | 'bottomSpace'
  | 'trailingSpace'
  | 'containerColor'
  | 'containerShape'
  | 'containerHeight$oneLine'
  | 'containerHeight$twoLine'
  | 'containerHeight$threeLine'
  | 'containerColor$disabled'
  | 'containerOpacity$disabled'
  | 'selectedContainerColor'
  | 'textColor$disabled'
  | 'textOpacity$disabled'
  | 'textColor$focus'
  | 'textColor$hover'
  | 'textColor$pressed'
  | 'selectedTextColor'
  | 'selectedTextColor$focus'
  | 'selectedTextColor$hover'
  | 'selectedTextColor$pressed'
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
  | 'stateLayerOpacity$pressed';

export type IListItemStyleStateVarKey =
  | 'nonTextColor'
  | 'nonTextOpacity'
  | 'textColor'
  | 'textOpacity';
