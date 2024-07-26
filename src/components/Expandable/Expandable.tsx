import { forwardRef, useMemo, useRef } from 'react';
import stylex from '@stylexjs/stylex';
import { CSSTransition } from 'react-transition-group';

import type { IExpandableProps } from './Expandable.types';
import type { ICssSizeValue, ISize } from '~/helpers/types';
import {
  ExpandableContext,
  type IExpandableContextValue,
} from './ExpandableContext';
import { isFunction } from '~/helpers/isFunction';
import { useControlledValue } from '~/hooks/useControlledValue';
import { motionTokens } from '~/themes/base/motion.stylex';
import { useMergeRefs } from '@floating-ui/react';
import { useElementSize } from '~/hooks/useElementSize';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { expandableStyles } from './Expandable.styles';

const localStyles = stylex.create({
  content: (expandedSize: Partial<ISize<ICssSizeValue>>) => ({
    overflow: 'hidden',
    width: expandedSize.width,
    height: expandedSize.height,
  }),
  content$expanded: {
    overflow: 'visible',
  },
  animation$entering: (
    expandedSize: Partial<ISize<ICssSizeValue>>,
    transitionProperty: string,
  ) => ({
    width: expandedSize.width,
    height: expandedSize.height,
    transitionProperty,
    transitionDuration: motionTokens.duration$long3,
    transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,
  }),
  animation$entered: (expandedSize: Partial<ISize<ICssSizeValue>>) => ({
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
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,
  }),
  animation$exited: (
    size: Partial<ISize<ICssSizeValue>>,
    visibility: string,
  ) => ({
    width: size.width,
    height: size.height,
    visibility,
  }),
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
      styles,
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

    const componentTheme = useComponentTheme('Expandable');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(expandableStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

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
          timeout={550} // motionTokens.duration$long3
        >
          {(status) => (
            <div
              {...sxf(
                componentTheme.overridenStyles,
                'host',
                expanded && status === 'entered' ? 'host$expanded' : undefined,
                status === 'exited'
                  ? localStyles.animation$exited(
                      collapsedSize,
                      parseInt(`${collapsedSize.width}`) === 0 ||
                        parseInt(`${collapsedSize.height}`) === 0
                        ? 'hidden'
                        : 'visible',
                    )
                  : status === 'entering'
                    ? localStyles.animation$entering(
                        expandedSize,
                        transitionProperty,
                      )
                    : status === 'entered'
                      ? localStyles.animation$entered(expandedSize)
                      : status === 'exiting'
                        ? localStyles.animation$exiting(
                            collapsedSize,
                            transitionProperty,
                          )
                        : undefined,
                sx,
              )}
              aria-expanded={expanded}
              {...other}
              ref={transitionNodeHandleRef}
            >
              <div
                {...stylex.props(
                  localStyles.content(expandedSize),
                  expanded && status === 'entered'
                    ? localStyles.content$expanded
                    : undefined,
                )}
              >
                <div ref={contentWrapperRef}>{children}</div>
              </div>
            </div>
          )}
        </CSSTransition>
      </ExpandableContext.Provider>
    );
  },
);
