import { forwardRef, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useMergeRefs } from '@floating-ui/react';

import type { ISideSheetProps } from './SideSheet.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { useStyles } from '~/hooks/useStyles';
import { useWindowSizeClass } from '~/hooks/useWindowSizeClass';
import { SideSheetContent } from '../SideSheetContent';
import { Drawer } from '../Drawer';
import { sideSheetStyles } from './SideSheet.styles';
import { usePrevious } from '~/hooks/usePrevious';

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

      const windowSizeClass = useWindowSizeClass();
      const isCompact = !!windowSizeClass?.compact;
      const [modalOpened, setModalOpened] = useState(false);
      const previousIsCompact = usePrevious(isCompact);
      const savedOpenedRef = useRef(opened);
      const previousOpened = usePrevious(opened);

      useEffect(() => {
        // This effect is triggered when the state of the side sheet changes
        // from opened to closed or vice versa. It is used to manage the state
        // of the modal side sheet, which is managed separately from the
        // standard side sheet.
        if (previousOpened === opened || previousOpened === undefined) {
          return;
        }

        // If the window size is compact, the side sheet should be displayed as
        // a modal side sheet.
        setModalOpened(!!isCompact && !!opened);
      }, [isCompact, opened, previousOpened]);

      useEffect(() => {
        // This effect is triggered when the window size changes from compact to
        // non-compact or vice versa. It is used to manage the state of the side
        // sheet when the window size changes.
        if (
          previousIsCompact === isCompact ||
          previousIsCompact === undefined
        ) {
          return;
        }

        // If the window size has grown from compact to non-compact, the modal
        // side sheet should already be removed from the DOM. Here we ensure
        // that its state is closed to prevent any glitch like a closing
        // animation when the window size shrinks back to compact.
        setModalOpened(false);

        if (isCompact) {
          // If the window size has shrunk from non-compact to compact, the side
          // sheet is closed. The next time it is opened, it should be displayed
          // as a modal side sheet.
          onClose?.();
          // The open state is saved in a ref to ensure that the modal side
          // sheet is re-opened when the window size grows back to non-compact.
          savedOpenedRef.current = opened;
        } else if (savedOpenedRef.current) {
          // If the window size has grown back to non-compact and the standard
          // side sheet was open, it should be re-opened.
          onOpen?.();
        }
      }, [isCompact, previousIsCompact, onClose, onOpen, opened]);

      return (
        <>
          <CSSTransition
            nodeRef={transitionNodeRef}
            in={!isCompact && opened}
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

          {isCompact ? (
            <Drawer
              root={root}
              opened={modalOpened}
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
