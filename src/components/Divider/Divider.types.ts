import type { IBaseProps } from '../Base';
import type { IDividerStylesKey } from './Divider.styles';

export type IDividerProps = IBaseProps<IDividerStylesKey> & {
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
