import { forwardRef, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useMergeRefs } from '@floating-ui/react';

import type { ISideSheetProps } from './SideSheet.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { useStyles } from '~/hooks/useStyles';
import { SideSheetContent } from '../SideSheetContent';
import { Drawer } from '../Drawer';
import { sideSheetStyles } from './SideSheet.styles';

// FIXME: rename to ResponsiveSideSheet?
export const SideSheet = createPolymorphicComponent<'div', ISideSheetProps>(
  forwardRef<HTMLDivElement, ISideSheetProps>(
    function SideSheet(props, forwardedRef) {
      const {
        innerStyles,
        styles,
        sx,
        root,
        isModal,
        standardOpened,
        modalOpened,
        onClose,
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

      const renderContent = (
        props?: Partial<React.ComponentPropsWithRef<typeof SideSheetContent>>,
      ): JSX.Element => (
        <SideSheetContent
          styles={innerStyles?.sideSheetContent}
          anchor={anchor}
          {...other}
          {...props}
          sx={[globalStyles, combineStyles('host'), props?.sx, sx]}
        />
      );

      return (
        <>
          <CSSTransition
            nodeRef={transitionNodeRef}
            in={standardOpened}
            timeout={550} // motionTokens.duration$long3
            unmountOnExit
          >
            {(status) => (
              <div {...getStyles(`animation$${status}`)} data-anchor={anchor}>
                {renderContent({
                  onClose,
                  ref: transitionNodeHandleRef,
                })}
              </div>
            )}
          </CSSTransition>

          {isModal ? (
            <Drawer
              root={root}
              opened={modalOpened}
              onClose={onClose}
              disabled={disabled}
              anchor={anchor}
              variant={variant}
            >
              {({ close }) =>
                renderContent({
                  onClose: close,
                  variant: variant === 'detached' ? 'detachedModal' : 'modal',
                  ref: forwardedRef,
                })
              }
            </Drawer>
          ) : null}
        </>
      );
    },
  ),
);
