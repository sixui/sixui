import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  colorSchemeRoleTheme,
  IColorSchemeRoleThemeFactory,
} from './ColorSchemeRole.css';

export type IColorSchemeRoleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IColorSchemeRoleOwnProps extends IPaperOwnProps {
  label?: React.ReactNode;
  size?: IColorSchemeRoleSize;
}

export interface IColorSchemeRoleProps
  extends IBoxProps,
    IComponentThemeProps<IColorSchemeRoleThemeFactory>,
    IColorSchemeRoleOwnProps {}

export type IColorSchemeRoleFactory = IComponentFactory<{
  props: IColorSchemeRoleProps;
  ref: HTMLDivElement;
  theme: typeof colorSchemeRoleTheme;
}>;
