import type { Placement } from '@floating-ui/react';
import type { TransitionStatus } from 'react-transition-group';

import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IOrientation } from '~/helpers/types';
import type { IBoxProps } from '../Box';
import {
  floatingTransitionTheme,
  IFloatingTransitionThemeFactory,
} from './FloatingTransition.css';

export type IFloatingTransitionStatus =
  | 'unmounted'
  | 'initial'
  | 'open'
  | 'close';

export type IFloatingTransitionOrigin = 'center' | 'corner' | 'edge' | 'cursor';

export type IFloatingTransitionPattern = 'enterExit' | 'enterExitOffScreen';

export interface IFloatingTransitionOwnProps {
  /**
   * The status of the transition. Possible values are: `unmounted`, `initial`,
   * `open`, `close`. The status can be resolved from the `TransitionStatus`
   * type of `react-transition-group`.
   */
  status: IFloatingTransitionStatus | TransitionStatus;

  /**
   * The final placement of the element relative to a reference element.
   * Possible values are: `top-start`, `top`, `top-end`, `right-start`, `right`,
   * `right-end`, `bottom-end`, `bottom`, `bottom-start`, `left-end`, `left`,
   * `left-start`.
   */
  placement: Placement;

  /**
   * The origin of the transition animation. Possible values are:
   * - `center`: The transition origin is the center of the element.
   * - `corner`: The transition origin is the corner of the element, depending
   *   on the placement.
   * - `edge`: The transition origin is the edge of the element, depending on
   *   the placement.
   * - `cursor`: The transition origin is `cursorTransformOrigin` if provided,
   *   otherwise it is the center of the element.
   */
  origin?: IFloatingTransitionOrigin;

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
   */
  pattern?: IFloatingTransitionPattern;
}

export interface IFloatingTransitionProps
  extends IBoxProps,
    IComponentThemeProps<IFloatingTransitionThemeFactory>,
    IFloatingTransitionOwnProps {}

export type IFloatingTransitionFactory = IComponentFactory<{
  props: IFloatingTransitionProps;
  ref: HTMLDivElement;
  theme: typeof floatingTransitionTheme;
}>;
