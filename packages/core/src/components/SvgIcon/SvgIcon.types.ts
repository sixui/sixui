import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { ISvgIconThemeFactory, svgIconTheme } from './SvgIcon.css';

export interface ISvgIconOwnProps {
  icon: {
    name?: string;
    data: string;
  };
}

export interface ISvgIconProps
  extends IBoxProps,
    IComponentThemeProps<ISvgIconThemeFactory>,
    ISvgIconOwnProps {}

export type ISvgIconFactory = IComponentFactory<{
  props: ISvgIconProps;
  ref: HTMLDivElement;
  theme: typeof svgIconTheme;
}>;
