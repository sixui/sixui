import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { dividerTheme, IDividerThemeFactory } from './Divider.css';

export type IDividerOwnProps = {
  orientation?: 'horizontal' | 'vertical';

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
};

export interface IDividerProps
  extends IBoxProps,
    IComponentThemeProps<IDividerThemeFactory>,
    IDividerOwnProps {}

export type IDividerFactory = IComponentFactory<{
  props: IDividerProps;
  ref: HTMLDivElement;
  theme: typeof dividerTheme;
}>;
