import type { TransitionStatus } from 'react-transition-group';

import type { IOrientation, IPlacement } from '~/helpers/types';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IMotionThemeFactory, motionTheme } from './Motion.css';

export type IMotionStatus = 'initial' | 'unmounted' | 'open' | 'close';

export type IMotionOrigin = 'center' | 'corner' | 'edge' | 'custom';

export type IMotionPattern = 'enterExit' | 'enterExitOffScreen' | 'fade';

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
  placement?: IPlacement;

  /**
   * The origin of the transition animation. Possible values are:
   * - `center`: The transition origin is the center of the element.
   * - `corner`: The transition origin is the corner of the element, depending
   *   on the placement.
   * - `edge`: The transition origin is the edge of the element, depending on
   *   the placement.
   * - `custom`: The transition origin is `customTransformOrigin` if provided,
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
   * A custom transform origin of the transition animation when `origin` is
   * `custom`.
   */
  customTransformOrigin?: string;

  /**
   * The pattern of the transition animation. Possible values are:
   * - `enterExit`: The animated element comes from a reference element.
   * - `enterExitOffScreen`: The animated element comes from outside the screen.
   * @defaultValue 'enterExit'
   */
  pattern?: IMotionPattern;

  children?: React.ReactNode;
}

export interface IMotionProps
  extends IBoxProps,
    IComponentThemeProps<IMotionThemeFactory>,
    IMotionOwnProps {}

export type IMotionFactory = IPolymorphicComponentFactory<{
  props: IMotionProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof motionTheme;
}>;
