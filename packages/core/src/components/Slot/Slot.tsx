import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import type { ISlotThemeFactory } from './Slot.css';
import type { ISlotFactory } from './Slot.types';
import { Box } from '~/components/Box';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { Overlayable } from '~/components/Overlayable';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useMergeRefs } from '~/hooks';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { COMPONENT_NAME } from './Slot.constants';
import { slotTheme } from './Slot.css';

export const Slot = polymorphicComponentFactory<ISlotFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      hidden,
      loading,
      loadingOverlay = <IndeterminateCircularProgressIndicator />,
      animated,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ISlotThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: slotTheme,
      modifiers: {
        animated,
      },
    });

    const transitionNodeRef = useRef<HTMLDivElement>(null);
    const transitionNodeHandleRef = useMergeRefs(
      transitionNodeRef,
      forwardedRef,
    );

    return animated ? (
      <CSSTransition
        nodeRef={transitionNodeRef}
        in={!hidden}
        timeout={150} // motionTokens.duration$short2
        unmountOnExit
      >
        {(status) => (
          <Box
            {...getStyles('root', {
              modifiers: { 'animation-status': status },
            })}
            ref={transitionNodeHandleRef}
            {...other}
          >
            <Overlayable overlay={loadingOverlay} visible={loading}>
              {children}
            </Overlayable>
          </Box>
        )}
      </CSSTransition>
    ) : (
      !hidden && (
        <Overlayable
          {...getStyles('root')}
          overlay={loadingOverlay}
          visible={loading}
          {...other}
        >
          {children}
        </Overlayable>
      )
    );
  },
);

Slot.displayName = `@sixui/core/${COMPONENT_NAME}`;
Slot.theme = slotTheme;
