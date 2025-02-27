import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  IIndeterminateLinearProgressIndicatorThemeFactory,
  indeterminateLinearProgressIndicatorTheme,
} from './IndeterminateLinearProgressIndicator.css';

export interface IIndeterminateLinearProgressIndicatorOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface IIndeterminateLinearProgressIndicatorProps
  extends IBoxProps,
    IComponentThemeProps<IIndeterminateLinearProgressIndicatorThemeFactory>,
    IIndeterminateLinearProgressIndicatorOwnProps {}

export type IIndeterminateLinearProgressIndicatorFactory = IComponentFactory<{
  props: IIndeterminateLinearProgressIndicatorProps;
  ref: HTMLDivElement;
  theme: typeof indeterminateLinearProgressIndicatorTheme;
}>;
