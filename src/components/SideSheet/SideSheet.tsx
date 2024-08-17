import { forwardRef, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useMergeRefs } from '@floating-ui/react';

import type { ISideSheetProps } from './SideSheet.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { useStyles } from '~/hooks/useStyles';
import { SideSheetContent } from '../SideSheetContent';
import { Drawer } from '../Drawer';
import { sideSheetStyles } from './SideSheet.styles';
import { useSideSheet } from './useSideSheet';

export const SideSheet = createPolymorphicComponent<'div', ISideSheetProps>(
  forwardRef<HTMLDivElement, ISideSheetProps>(
    function SideSheet(props, forwardedRef) {
      const {
        innerStyles,
        styles,
        sx,
        root,
        opened,
        onClose,
        onOpen,
        disabled,
        anchor,
        variant,
        ...other
      } = props;

      const { combineStyles, getStyles, globalStyles } = useStyles({
        name: 'SideSheet',
        styles: [sideSheetStyles, styles],
      });

      const transitionNodeRef = useRef<HTMLDivElement>(null);
      const transitionNodeHandleRef = useMergeRefs([
        transitionNodeRef,
        forwardedRef,
      ]);

      const state = useSideSheet(opened, {
        onOpen,
        onClose,
      });

      return (
        <>
          <CSSTransition
            nodeRef={transitionNodeRef}
            in={state.standardOpened}
            timeout={550} // motionTokens.duration$long3
            classNames={{
              enter: getStyles('animation$enter').className,
              enterActive: getStyles('animation$enterActive').className,
              exitActive: getStyles('animation$exitActive').className,
            }}
            unmountOnExit
          >
            <SideSheetContent
              sx={[globalStyles, sx]}
              styles={innerStyles?.sideSheetContent}
              anchor={anchor}
              onClose={onClose}
              {...other}
              ref={transitionNodeHandleRef}
            />
          </CSSTransition>

          {state.isModal ? (
            <Drawer
              root={root}
              opened={state.modalOpened}
              onClose={onClose}
              disabled={disabled}
              anchor={anchor}
              variant={variant}
            >
              {({ close }) => (
                <SideSheetContent
                  sx={[globalStyles, sx]}
                  styles={innerStyles?.sideSheetContent}
                  anchor={anchor}
                  variant={variant === 'detached' ? 'detachedModal' : 'modal'}
                  onClose={close}
                  {...other}
                  ref={forwardedRef}
                />
              )}
            </Drawer>
          ) : null}
        </>
      );
    },
  ),
);
