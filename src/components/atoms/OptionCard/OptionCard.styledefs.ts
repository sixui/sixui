import type { ICardStyleKey } from '@/components/atoms/Card';

export type IOptionCardStyleKey =
  | ICardStyleKey
  | 'host'
  | 'host$selected'
  | 'text'
  | 'text$disabled';

export type IOptionCardStyleVarKey =
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
