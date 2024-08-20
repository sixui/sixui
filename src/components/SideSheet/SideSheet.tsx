import { forwardRef, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useMergeRefs } from '@floating-ui/react';

import type { ISideSheetProps } from './SideSheet.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { useStyles } from '~/hooks/useStyles';
import { SideSheetContent } from '../SideSheetContent';
import { Drawer } from '../Drawer';
import { sideSheetStyles } from './SideSheet.styles';

// FIXME: delete? voir si on peut l'utiliser pour le aside layout?
export const SideSheet = createPolymorphicComponent<'div', ISideSheetProps>(
  forwardRef<HTMLDivElement, ISideSheetProps>(
    function SideSheet(props, forwardedRef) {
      const {
        innerStyles,
        styles,
        sx,
        root,
        type = 'standard',
        standardOpened,
        modalOpened,
        onClose,
        disabled,
        anchor,
        detached,
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
                  variant: 'standard',
                  ref: transitionNodeHandleRef,
                })}
              </div>
            )}
          </CSSTransition>

          {type === 'modal' ? (
            <Drawer
              root={root}
              opened={modalOpened}
              onClose={onClose}
              disabled={disabled}
              anchor={anchor}
              detached={detached}
            >
              {({ close }) =>
                renderContent({
                  showCloseButton: true,
                  onClose: close,
                  variant: detached ? 'detachedModal' : 'modal',
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
