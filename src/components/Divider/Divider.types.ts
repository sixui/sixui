import type { IOrientation } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { dividerTheme, IDividerThemeFactory } from './Divider.css';

export interface IDividerOwnProps {
  orientation?: IOrientation;

  /**
   * Indents the divider with equal padding on both sides.
   */
  inset?: boolean;

  /**
   * Indents the divider with padding on the leading side.
   */
  insetStart?: boolean;

  /**
   * Indents the divider with padding on the trailing side.
   */
  insetEnd?: boolean;

  children?: React.ReactNode;
  label?: React.ReactNode;
  contentPosition?: 'top' | 'middle' | 'bottom';
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
