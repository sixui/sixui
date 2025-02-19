import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { elevationTheme, IElevationThemeFactory } from './Elevation.css';

export interface IElevationOwnProps {
  level?: 0 | 1 | 2 | 3 | 4 | 5;
  disabled?: boolean;
}

export interface IElevationProps
  extends IBoxProps,
    IComponentThemeProps<IElevationThemeFactory>,
    IElevationOwnProps {}

export type IElevationFactory = IComponentFactory<{
  props: IElevationProps;
  ref: HTMLDivElement;
  theme: typeof elevationTheme;
}>;
