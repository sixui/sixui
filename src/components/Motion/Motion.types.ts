import type { Alignment, Placement, Side } from '@floating-ui/react';
import type { TransitionStatus } from 'react-transition-group';

import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IOrientation } from '~/helpers/types';
import type { IBoxProps } from '../Box';
import { motionTheme, IMotionThemeFactory } from './Motion.css';

export type IMotionStatus = 'unmounted' | 'initial' | 'open' | 'close';

export type IMotionOrigin = 'center' | 'corner' | 'edge' | 'cursor';

export type IMotionPattern = 'enterExit' | 'enterExitOffScreen';

export interface IMotionOwnProps {
  /**
   * The status of the transition. Possible values are: `unmounted`, `initial`,
   * `open`, `close`. The status can be resolved from the `TransitionStatus`
   * type of `react-transition-group`.
   */
  status: IMotionStatus | TransitionStatus;

  /**
   * The final placement of the element relative to a reference element.
   * Possible values are: `top-start`, `top`, `top-end`, `right-start`, `right`,
   * `right-end`, `bottom-end`, `bottom`, `bottom-start`, `left-end`, `left`,
   * `left-start`.
   * @defaultValue 'top'
   */
  placement?: Placement;

  /**
   * The side of the element relative to a reference element. This is an
   * alternative way to specify the placement. Possible values are: `top`,
   * `right`, `bottom`, `left`.
   */
  side?: Side;

  /**
   * The alignment of the element relative to a reference element. This is an
   * alternative way to specify the placement. Possible values are: `start`,
   * `end`.
   */
  alignment?: Alignment;

  /**
   * The origin of the transition animation. Possible values are:
   * - `center`: The transition origin is the center of the element.
   * - `corner`: The transition origin is the corner of the element, depending
   *   on the placement.
   * - `edge`: The transition origin is the edge of the element, depending on
   *   the placement.
   * - `cursor`: The transition origin is `cursorTransformOrigin` if provided,
   *   otherwise it is the center of the element.
   * @defaultValue 'center'
   */
  origin?: IMotionOrigin;

  /**
   * The orientation of the transition animation. Possible values are:
   * `horizontal` and `vertical`. If not provided, it will be determined
   * automatically based on the placement.
   */
  orientation?: IOrientation;

  /**
   * The transform origin of the transition animation when `origin` is `cursor`.
   */
  cursorTransformOrigin?: string;

  /**
   * The pattern of the transition animation. Possible values are:
   * - `enterExit`: The animated element comes from a reference element.
   * - `enterExitOffScreen`: The animated element comes from outside the screen.
   * @defaultValue 'enterExit'
   */
  pattern?: IMotionPattern;

  /**
   * Whether the element should be absolutely positioned relative to its parent.
   */
  positioned?: boolean;
}

export interface IMotionProps
  extends IBoxProps,
    IComponentThemeProps<IMotionThemeFactory>,
    IMotionOwnProps {}

export type IMotionFactory = IComponentFactory<{
  props: IMotionProps;
  ref: HTMLDivElement;
  theme: typeof motionTheme;
}>;
