import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import type { ISlotThemeFactory } from './Slot.css';
import type { ISlotFactory } from './Slot.types';
import { useMergeRefs } from '~/hooks';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { Overlayable } from '../Overlayable';
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
      opened,
      loading,
      loadingOverlay,
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
    });

    const transitionNodeRef = useRef<HTMLDivElement>(null);
    const transitionNodeHandleRef = useMergeRefs(
      transitionNodeRef,
      forwardedRef,
    );

    return animated ? (
      <CSSTransition
        nodeRef={transitionNodeRef}
        in={opened}
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
      opened && (
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

Slot.theme = slotTheme;
Slot.displayName = `@sixui/${COMPONENT_NAME}`;
