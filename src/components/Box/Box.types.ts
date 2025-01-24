import type cx from 'clsx';

import type { IThemeWindowSizeClassName } from '~/components/ThemeProvider';
import type { ISixuiSize } from '~/helpers/types';
import type { IInteractions } from '~/hooks/useInteractions';
import type { IModifiers } from '~/utils/getDataAttributes';
import type { IBoxSprinkles } from './Box.css';

export interface IBoxProps extends IBoxSprinkles {
  className?: Parameters<typeof cx>[0];
  style?: React.CSSProperties;
  // FIXME: not in box
  interactions?: IInteractions;
  modifiers?: IModifiers;
  scale?: ISixuiSize;
  density?: number;

  /** Breakpoint above which the component is hidden with `display: none` */
  hiddenFrom?: IThemeWindowSizeClassName;

  /** Breakpoint below which the component is hidden with `display: none` */
  visibleFrom?: IThemeWindowSizeClassName;
}

export type IElementProps<
  TElementType extends React.ElementType,
  TPropsToOmit extends string = never,
> = Omit<React.ComponentPropsWithoutRef<TElementType>, TPropsToOmit>;
