import { forwardRef, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useMergeRefs } from '@floating-ui/react';

import type { ISideSheetProps } from './SideSheet.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { useStyles } from '~/hooks/useStyles';
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
      console.log('_o', opened);

      return (
        <>
          <CSSTransition
            nodeRef={transitionNodeRef}
            in={opened}
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

          {/* <Drawer
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
          </Drawer> */}
        </>
      );
    },
  ),
);
