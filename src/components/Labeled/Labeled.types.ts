import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ILabeledThemeFactory, labeledTheme } from './Labeled.css';

export type ILabeledVariant = 'primary';

export interface ILabeledOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface ILabeledProps
  extends IBoxProps,
    IComponentThemeProps<ILabeledThemeFactory>,
    ILabeledOwnProps {}

export type ILabeledFactory = IComponentFactory<{
  props: ILabeledProps;
  ref: HTMLDivElement;
  theme: typeof labeledTheme;
  variant: ILabeledVariant | false;
}>;
