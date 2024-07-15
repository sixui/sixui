import type { IContainerProps } from '@/helpers/types';
import type { IDividerStylesKey } from './Divider.styles';

export type IDividerProps = IContainerProps<IDividerStylesKey> & {
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
