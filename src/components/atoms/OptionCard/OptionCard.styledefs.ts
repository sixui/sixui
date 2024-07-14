import { ICardStylesKey } from '@/components/atoms/Card/Card.styles';

export type IOptionCardStyleKey =
  | ICardStylesKey
  | 'host'
  | 'host$selected'
  | 'text'
  | 'text$disabled';

export type IOptionCardStyleVarKey =
  | 'containerColor'
  | 'selectedOutlineColor'
  | 'selectedOutlineWidth'
  | 'selectedOutlineColor$disabled'
  | 'selectedOutlineOpacity$disabled'
  | 'selectedOutlineColor$focus'
  | 'selectedOutlineColor$hover'
  | 'selectedOutlineColor$pressed'
  | 'selectedOutlineColor$dragged'
  | 'textColor'
  | 'textFont'
  | 'textLineHeight'
  | 'textSize'
  | 'textLetterSpacing'
  | 'textWeight'
  | 'textColor$disabled'
  | 'textOpacity$disabled';
