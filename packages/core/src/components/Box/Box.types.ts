import type cx from 'clsx';

import type {
  IThemeSpacingValues,
  IThemeWindowSizeClassName,
} from '~/components/Theme';
import type { IInteractions } from '~/hooks/useInteractions';
import type { IModifiers } from '~/utils/getDataAttributes';
import type { ISixuiSize } from '~/utils/types';
import type { IBoxSprinkles } from './Box.css';

export type ISpacingProp = `$${keyof IThemeSpacingValues}` | string;

export type IResponsiveProp<TValue> =
  | TValue
  | Partial<Record<'base' | IThemeWindowSizeClassName, TValue>>;

export interface IBoxProps extends IBoxSprinkles {
  className?: Parameters<typeof cx>[0];
  style?: React.CSSProperties;
  modifiers?: IModifiers;

  /** Special modifiers that are specific to interactions */
  interactions?: IInteractions;

  scale?: ISixuiSize;
  density?: number;

  /** Breakpoint above which the component is hidden with `display: none` */
  hiddenFrom?: IThemeWindowSizeClassName;

  /** Breakpoint below which the component is hidden with `display: none` */
  visibleFrom?: IThemeWindowSizeClassName;
}
