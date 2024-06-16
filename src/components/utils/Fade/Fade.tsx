import type { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import { CSSTransition, TransitionStatus } from 'react-transition-group';
import { cloneElement, forwardRef, useRef } from 'react';

import { motionVars } from '@/themes/base/vars/motion.stylex';
import { useForkRef } from '@/hooks/useForkRef';
import { forceReflow } from '@/helpers/forceReflow';
import { css } from '@/helpers/css';
import { getTransitionProps } from './getTransitionProps';

// FIXME:

export type IFadeProps = {
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic.
   *
   * @param node - timeouts are still used as a fallback if provided.
   */
  addEndListener?: (node: HTMLElement, done: () => void) => void;

  /**
   * By default the child component does not perform the enter transition when
   * it first mounts, regardless of the value of `in`. If you want this
   * behavior, set both `appear` and `in` to true.
   *
   * Note that there are no special appear states like `appearing/appeared`,
   * this prop only adds an additional enter transition. However, in the
   * `<CSSTransition>` component that first enter transition does result in
   * additional `.appear-*` classes, that way you can choose to style it
   * differently.
   *
   * @see https://reactcommunity.org/react-transition-group/transition#Transition-prop-appear
   */
  appear?: boolean;

  /**
   * A single child content element.
   */
  children: React.ReactElement<{
    style?: React.CSSProperties;
    ref?: React.Ref<HTMLElement>;
  }> & {
    ref?: React.Ref<HTMLElement>;
  };

  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing?: string | { enter: string; exit: string };

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout?: number | { appear: number; enter: number; exit: number };

  /**
   * Show the component; triggers the enter or exit states.
   *
   * @defaultValue false
   *
   * @see https://reactcommunity.org/react-transition-group/transition#Transition-prop-onExited
   */
  in?: boolean;

  /**
   * Callback fired before the "entering" status is applied.
   *
   * @param node - The DOM element that is transitioning.
   * @param isAppearing - Indicates if the enter stage is occurring on the
   * initial mount.
   *
   * https://reactcommunity.org/react-transition-group/transition#Transition-prop-onEnter
   */
  onEnter?: (node: HTMLElement, isAppearing?: boolean) => void;

  /**
   * Callback fired after the "entering" status is applied.
   *
   * @param node - The DOM element that is transitioning.
   * @param isAppearing - Indicates if the enter stage is occurring on the
   * initial mount.
   *
   * @see https://reactcommunity.org/react-transition-group/transition#Transition-prop-onEntering
   */
  onEntering?: (node: HTMLElement, isAppearing?: boolean) => void;

  /**
   * Callback fired after the "entered" status is applied.
   *
   * @param node - The DOM element that is transitioning.
   * @param isAppearing - Indicates if the enter stage is occurring on the
   * initial mount.
   *
   * @see https://reactcommunity.org/react-transition-group/transition#Transition-prop-onEntered
   */
  onEntered?: (node: HTMLElement, isAppearing?: boolean) => void;

  /**
   * Callback fired before the "exiting" status is applied.
   *
   * @param node - The DOM element that is transitioning.
   *
   * @see https://reactcommunity.org/react-transition-group/transition#Transition-prop-onExit
   */
  onExit?: (node: HTMLElement) => void;

  /**
   * Callback fired after the "exiting" status is applied.
   *
   * @param node - The DOM element that is transitioning.
   *
   * @see https://reactcommunity.org/react-transition-group/transition#Transition-prop-onExiting
   */
  onExiting?: (node: HTMLElement) => void;

  /**
   * Callback fired after the "exited" status is applied.
   *
   * @param node - The DOM element that is transitioning.
   *
   * @see https://reactcommunity.org/react-transition-group/transition#Transition-prop-onExited
   */
  onExited?: (node: HTMLElement) => void;

  style?: React.CSSProperties;
  classNames?: CSSTransitionClassNames;
};

const styles: Partial<Record<TransitionStatus, React.CSSProperties>> = {
  entering: {
    opacity: 1,
  },
  entered: {
    opacity: 1,
  },
};

// FIXME:
// const ENTER_DURATION = motionVars.duration$medium2;
// const EXIT_DURATION = motionVars.duration$medium2;
const EASING = 'cubic-bezier(0.2, 0, 0, 1)';

const ENTER_DURATION = '5000';
const EXIT_DURATION = '5000';

export const Fade: React.FC<IFadeProps> = forwardRef(function Fade(props, ref) {
  const defaultEasing = EASING;
  const defaultTimeout = {
    enter: parseFloat(ENTER_DURATION),
    exit: parseFloat(EXIT_DURATION),
  };

  const {
    addEndListener,
    appear,
    children,
    easing = defaultEasing,
    timeout = defaultTimeout,
    in: transitionIn,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    style,
    classNames,
  } = props;

  const nodeRef = useRef<HTMLElement>();
  const handleRef = useForkRef(nodeRef, children?.ref, ref);

  // In `react-transition-group`, when `nodeRef` prop is passed to the
  // `Transition` component, the DOM element that is transitioning is not
  // passed to the callbacks. This function normalizes the callback arguments
  // to always have the DOM element as the first argument.
  const normalizedTransitionCallback =
    (callback: (node: HTMLElement, maybeIsAppearing?: boolean) => void) =>
    (maybeIsAppearing?: boolean) => {
      const node = nodeRef.current;
      if (!node) {
        return;
      }

      callback(node, maybeIsAppearing);
    };

  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    forceReflow(node);

    const transitionProps = getTransitionProps(
      { style, timeout, easing },
      { mode: 'enter' },
    );

    // eslint-disable-next-line no-param-reassign
    node.style.transition = css.transition.toString({
      property: 'opacity',
      duration: transitionProps.duration,
      easing: transitionProps.easing ?? 'linear',
    });

    onEnter?.(node, isAppearing);
  });

  const handleEntered = onEntered
    ? normalizedTransitionCallback(onEntered)
    : undefined;

  const handleExiting = onExiting
    ? normalizedTransitionCallback(onExiting)
    : undefined;

  const handleExit = normalizedTransitionCallback((node) => {
    const transitionProps = getTransitionProps(
      { style, timeout, easing },
      { mode: 'exit' },
    );

    // eslint-disable-next-line no-param-reassign
    node.style.transition = css.transition.toString({
      property: 'opacity',
      duration: transitionProps.duration,
      easing: transitionProps.easing ?? 'linear',
    });

    onExit?.(node);
  });

  const handleExited = onExited
    ? normalizedTransitionCallback(onExited)
    : undefined;

  const handleAddEndListener = (done: () => void): void => {
    if (!nodeRef.current) {
      return;
    }

    // Old call signature before `react-transition-group` implemented `nodeRef`
    addEndListener?.(nodeRef.current, done);
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      // appear={appear}
      in={transitionIn}
      // onEnter={handleEnter}
      // onEntering={onEntering}
      // onEntered={handleEntered}
      // onExit={handleExit}
      // onExiting={handleExiting}
      // onExited={handleExited}
      addEndListener={handleAddEndListener}
      timeout={1000}
      // timeout={timeout}
      classNames={classNames}
    >
      {(state, childProps) =>
        cloneElement(children, {
          // style: {
          //   opacity: 0,
          //   visibility:
          //     state === 'exited' && !transitionIn ? 'hidden' : 'visible',
          //   ...styles[state],
          //   ...style,
          //   ...children.props.style,
          // },
          ref: handleRef,
          ...childProps,
        })
      }
    </CSSTransition>
  );
});
