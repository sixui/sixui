import { forwardRef, useRef } from 'react';
import { isFunction } from 'lodash';
import stylex from '@stylexjs/stylex';
import { CSSTransition } from 'react-transition-group';

import type {
  IContainerProps,
  ICssSizeValue,
  IOmit,
  ISize,
} from '@/helpers/types';
import {
  ExpandableContext,
  type IExpandableContextValue,
} from './ExpandableContext';
import { useControlledValue } from '@/hooks/useControlledValue';
import { motionVars } from '@/themes/base/vars/motion.stylex';
import { useMergeRefs } from '@floating-ui/react';
import { useElementSize } from '@/hooks/useElementSize';

export type IExpandableTriggerRenderProps = {
  expand: (expanded: boolean) => void;
  disabled?: boolean;
  expanded?: boolean;
};

export type IExpandableProps = IContainerProps &
  IOmit<IExpandableContextValue, 'expand'> & {
    trigger:
      | React.ReactNode
      | ((renderProps: IExpandableTriggerRenderProps) => React.ReactNode);
    children?: React.ReactNode;
    onChange?: (expanded: boolean) => void;
    collapsedSize?: ICssSizeValue;
  };

const styles = stylex.create({
  host: {
    overflow: 'hidden',
  },
  content: (expandedSize: Partial<ISize<ICssSizeValue>>) => ({
    overflow: 'hidden',
    width: expandedSize.width,
    height: expandedSize.height,
  }),
  animation$entering: (
    expandedSize: Partial<ISize<ICssSizeValue>>,
    transitionProperty: string,
  ) => ({
    width: expandedSize.width,
    height: expandedSize.height,
    transitionProperty,
    transitionDuration: motionVars.duration$long3,
    transitionTimingFunction: motionVars.easing$emphasizedDecelerate,
  }),
  animation$exit: (expandedSize: Partial<ISize<ICssSizeValue>>) => ({
    width: expandedSize.width,
    height: expandedSize.height,
  }),
  animation$exiting: (
    collapsedSize: Partial<ISize<ICssSizeValue>>,
    transitionProperty: string,
  ) => ({
    width: collapsedSize.width,
    height: collapsedSize.height,
    transitionProperty,
    transitionDuration: motionVars.duration$short3,
    transitionTimingFunction: motionVars.easing$emphasizedAccelerate,
  }),
  animation$exited: (
    size: Partial<ISize<ICssSizeValue>>,
    visibility: string,
  ) => ({
    width: size.width,
    height: size.height,
    visibility,
  }),
  host$collapsed: {
    overflow: 'hidden',
  },
  width: (width: number | string) => ({
    width,
  }),
  height: (height: number | string) => ({
    height,
  }),
});

export const Expandable = forwardRef<HTMLDivElement, IExpandableProps>(
  function Expandable(props, forwardedRef) {
    const {
      sx,
      trigger,
      children,
      onChange,
      disabled,
      expanded: expandedProp,
      defaultExpanded: defaultExpandedProp,
      initiallyExpanded: initiallyExpandedProp,
      orientation = 'vertical',
      collapsedSize: collapsedSizeProp = 0,
      ...other
    } = props;
    const initiallyExpandedRef = useRef(initiallyExpandedProp);
    const defaultExpanded = initiallyExpandedRef.current ?? defaultExpandedProp;
    const [expanded, setExpanded] = useControlledValue({
      controlled: expandedProp,
      default: !!defaultExpanded,
      name: 'Expandable',
    });
    const transitionNodeRef = useRef<HTMLDivElement>(null);
    const transitionNodeHandleRef = useMergeRefs([
      transitionNodeRef,
      forwardedRef,
    ]);
    const contentWrapperRef = useRef<HTMLDivElement>(null);
    const contentSize = useElementSize({
      ref: contentWrapperRef,
      observe: true,
      orientation,
    });

    const transitionProperty =
      orientation === 'horizontal' ? 'width' : 'height';
    const collapsedSize: Partial<ISize<ICssSizeValue>> =
      orientation === 'horizontal'
        ? { width: collapsedSizeProp }
        : { height: collapsedSizeProp };
    const expandedSize: Partial<ISize<ICssSizeValue>> =
      orientation === 'horizontal'
        ? { width: contentSize?.width }
        : { height: contentSize?.height };

    const expand = (expanded: boolean): void => {
      setExpanded(expanded);
      onChange?.(expanded);
    };

    const triggerElement = isFunction(trigger)
      ? trigger({
          expand,
          expanded,
          disabled,
        })
      : trigger;

    const context: IExpandableContextValue = {
      expand,
      disabled,
      expanded,
      defaultExpanded,
      orientation,
    };

    return (
      <ExpandableContext.Provider value={context}>
        {triggerElement}

        <CSSTransition
          nodeRef={transitionNodeRef}
          in={expanded}
          timeout={550} // motionVars.duration$long3
        >
          {(status) => (
            <div
              {...stylex.props(
                sx,
                styles.host,
                status === 'exited'
                  ? styles.animation$exited(
                      collapsedSize,
                      parseInt(`${collapsedSize.width}`) === 0 ||
                        parseInt(`${collapsedSize.height}`) === 0
                        ? 'hidden'
                        : 'visible',
                    )
                  : status === 'entering'
                    ? styles.animation$entering(
                        expandedSize,
                        transitionProperty,
                      )
                    : status === 'entered'
                      ? styles.animation$exit(expandedSize)
                      : status === 'exiting'
                        ? styles.animation$exiting(
                            collapsedSize,
                            transitionProperty,
                          )
                        : undefined,
              )}
              aria-expanded={expanded}
              {...other}
              ref={transitionNodeHandleRef}
            >
              <div ref={contentWrapperRef}>
                <div {...stylex.props(styles.content(expandedSize))}>
                  {children}
                </div>
              </div>
            </div>
          )}
        </CSSTransition>
      </ExpandableContext.Provider>
    );
  },
);
