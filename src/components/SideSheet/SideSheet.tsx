import { forwardRef, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useMergeRefs } from '@floating-ui/react';

import type { ISideSheetProps } from './SideSheet.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { useStyles } from '~/hooks/useStyles';
import { useMediaQuery } from '~/hooks/useMediaQuery';
import {
  SideSheetContent,
  type ISideSheetContentProps,
} from '../SideSheetContent';
import { Drawer } from '../Drawer';
import { sideSheetStyles } from './SideSheet.styles';

export const SideSheet = createPolymorphicComponent<'div', ISideSheetProps>(
  forwardRef<HTMLDivElement, ISideSheetProps>(
    function SideSheet(props, forwardedRef) {
      const {
        innerStyles,
        styles,
        sx,
        root,
        opened,
        defaultOpened,
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

      // FIXME: use token
      const isModal = useMediaQuery('(max-width: 640px)');
      const expanded = !isModal && opened;

      return (
        <>
          <CSSTransition
            nodeRef={transitionNodeRef}
            in={expanded}
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

          {isModal ? (
            <Drawer
              root={root}
              opened={opened}
              defaultOpened={defaultOpened}
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
