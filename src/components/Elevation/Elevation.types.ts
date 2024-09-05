import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { elevationTheme, IElevationThemeFactory } from './Elevation.css';

export type IElevationOwnProps = {
  level?: 0 | 1 | 2 | 3 | 4 | 5;
  disabled?: boolean;
};

export interface IElevationProps
  extends IBoxProps,
    IComponentThemeProps<IElevationThemeFactory>,
    IElevationOwnProps {}

export type IElevationFactory = IComponentFactory<{
  props: IElevationProps;
  ref: HTMLDivElement;
  theme: typeof elevationTheme;
}>;
