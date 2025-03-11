import { useRef } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { CSSTransition } from 'react-transition-group';

import type { ISize } from '~/utils/types';
import type { IExpandableContextValue } from './Expandable.context';
import type { IExpandableThemeFactory } from './Expandable.css';
import type { IExpandableFactory } from './Expandable.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useElementSize } from '~/hooks/useElementSize';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { px } from '~/utils/css/px';
import { isFunction } from '~/utils/isFunction';
import { COMPONENT_NAME } from './Expandable.constants';
import { ExpandableContextProvider } from './Expandable.context';
import { expandableTheme } from './Expandable.css';

export const Expandable = componentFactory<IExpandableFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      disabled,
      expanded: expandedProp,
      defaultExpanded: defaultExpandedProp,
      initiallyExpanded: initiallyExpandedProp,
      orientation = 'vertical',
      trigger,
      onChange,
      collapsedSize: collapsedSizeProp = 0,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const initiallyExpandedRef = useRef(initiallyExpandedProp);
    const defaultExpanded = initiallyExpandedRef.current ?? defaultExpandedProp;
    const [expanded, setExpanded] = useControlledValue({
      controlled: expandedProp,
      default: !!defaultExpanded,
      name: COMPONENT_NAME,
    });
    const transitionNodeRef = useRef<HTMLDivElement>(null);
    const transitionNodeHandleRef = useMergeRefs(
      transitionNodeRef,
      forwardedRef,
    );
    const contentWrapperRef = useRef<HTMLDivElement>(null);
    const contentSize = useElementSize({
      ref: contentWrapperRef,
      observe: true,
      orientation,
    });

    const { getStyles } = useComponentTheme<IExpandableThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: expandableTheme,
      modifiers: {
        disabled,
        orientation,
      },
    });

    const transitionProperty =
      orientation === 'horizontal' ? 'width' : 'height';
    const collapsedSize: Partial<ISize<string>> =
      orientation === 'horizontal'
        ? { width: px(collapsedSizeProp) }
        : { height: px(collapsedSizeProp) };
    const expandedSize: Partial<ISize<string>> =
      orientation === 'horizontal'
        ? { width: contentSize?.width ? `${contentSize.width}px` : undefined }
        : {
            height: contentSize?.height ? `${contentSize.height}px` : undefined,
          };

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
      <ExpandableContextProvider value={context}>
        {triggerElement}

        <CSSTransition
          nodeRef={transitionNodeRef}
          in={expanded}
          timeout={550} // motionTokens.duration$long3
        >
          {(status) => (
            <Box
              {...getStyles(['root', `motion$${status}`], {
                style: assignInlineVars({
                  [expandableTheme.tokens.collapsedWidth]: collapsedSize.width,
                  [expandableTheme.tokens.collapsedHeight]:
                    collapsedSize.height,
                  [expandableTheme.tokens.expandedWidth]: expandedSize.width,
                  [expandableTheme.tokens.expandedHeight]: expandedSize.height,
                  [expandableTheme.tokens.visibility]:
                    parseInt(`${collapsedSize.width}`) === 0 ||
                    parseInt(`${collapsedSize.height}`) === 0
                      ? 'hidden'
                      : 'visible',
                  [expandableTheme.tokens.transitionProperty]:
                    transitionProperty,
                }),
              })}
              modifiers={{
                expanded: expanded && status === 'entered',
              }}
              ref={transitionNodeHandleRef}
              aria-expanded={expanded}
              {...other}
            >
              <div {...getStyles('content')}>
                <div ref={contentWrapperRef}>{children}</div>
              </div>
            </Box>
          )}
        </CSSTransition>
      </ExpandableContextProvider>
    );
  },
);

Expandable.displayName = `@sixui/core/${COMPONENT_NAME}`;
Expandable.theme = expandableTheme;
