import type { IBoxProps } from '~/components/Box';
import type { IOrientation } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { dividerTheme, IDividerThemeFactory } from './Divider.css';

export interface IDividerOwnProps {
  orientation?: IOrientation;

  /**
   * Indents the divider with equal padding on both sides.
   */
  indent?: boolean;

  /**
   * Indents the divider with padding on the leading side.
   */
  indentStart?: boolean;

  /**
   * Indents the divider with padding on the trailing side.
   */
  indentEnd?: boolean;

  children?: React.ReactNode;
  label?: React.ReactNode;
  labelPosition?: 'top' | 'middle' | 'bottom';
  verticalAlign?: 'middle';
}

export interface IDividerProps
  extends IBoxProps,
    IComponentThemeProps<IDividerThemeFactory>,
    IDividerOwnProps {}

export type IDividerFactory = IComponentFactory<{
  props: IDividerProps;
  ref: HTMLDivElement;
  theme: typeof dividerTheme;
}>;
