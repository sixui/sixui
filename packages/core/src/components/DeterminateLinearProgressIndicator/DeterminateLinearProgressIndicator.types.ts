import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  determinateLinearProgressIndicatorTheme,
  IDeterminateLinearProgressIndicatorThemeFactory,
} from './DeterminateLinearProgressIndicator.css';

export interface IDeterminateLinearProgressIndicatorOwnProps {
  value: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface IDeterminateLinearProgressIndicatorProps
  extends IBoxProps,
    IComponentThemeProps<IDeterminateLinearProgressIndicatorThemeFactory>,
    IDeterminateLinearProgressIndicatorOwnProps {}

export type IDeterminateLinearProgressIndicatorFactory = IComponentFactory<{
  props: IDeterminateLinearProgressIndicatorProps;
  ref: HTMLDivElement;
  theme: typeof determinateLinearProgressIndicatorTheme;
}>;
