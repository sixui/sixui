import type { IBoxProps } from '~/components/Box';
import type { IButtonOwnProps } from '~/components/Button';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  copyableTextTheme,
  ICopyableTextThemeFactory,
} from './CopyableText.css';
import { IOmit } from '~/utils/types';

export interface ICopyableTextOwnProps
  extends IOmit<IButtonOwnProps, 'children'> {
  children?: React.ReactNode;
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
