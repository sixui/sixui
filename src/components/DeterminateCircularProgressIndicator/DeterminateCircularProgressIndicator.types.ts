import type { IBoxProps } from '~/components/Box';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type {
  determinateCircularProgressIndicatorTheme,
  IDeterminateCircularProgressIndicatorThemeFactory,
} from './DeterminateCircularProgressIndicator.css';

export type IDeterminateCircularProgressIndicatorOwnProps = {
  value: number;
  withLabel?: boolean;
  min?: number;
  max?: number;
  zeroBased?: boolean;
  labelFormatter?: (value: number) => string;
  disabled?: boolean;
  children?: React.ReactNode;
};

export interface IDeterminateCircularProgressIndicatorProps
  extends IBoxProps,
    IComponentThemeProps<IDeterminateCircularProgressIndicatorThemeFactory>,
    IDeterminateCircularProgressIndicatorOwnProps {}

export type IDeterminateCircularProgressIndicatorFactory = IComponentFactory<{
  props: IDeterminateCircularProgressIndicatorProps;
  ref: HTMLDivElement;
  theme: typeof determinateCircularProgressIndicatorTheme;
}>;
