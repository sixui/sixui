import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IButtonOwnProps } from '../Button';
import type {
  copyableTextTheme,
  ICopyableTextThemeFactory,
} from './CopyableText.css';

export interface ICopyableTextOwnProps extends IButtonOwnProps {
  text?: string;
  copySupportingText?: string;
  copiedSupportingText?: string;
}

export interface ICopyableTextProps
  extends IBoxProps,
    IComponentThemeProps<ICopyableTextThemeFactory>,
    ICopyableTextOwnProps {}

export type ICopyableTextFactory = IComponentFactory<{
  props: ICopyableTextProps;
  ref: HTMLButtonElement;
  theme: typeof copyableTextTheme;
}>;
