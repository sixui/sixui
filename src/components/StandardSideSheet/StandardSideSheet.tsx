import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import type { IStandardSideSheetThemeFactory } from './StandardSideSheet.css';
import type { IStandardSideSheetFactory } from './StandardSideSheet.types';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { Motion } from '../Motion';
import { SideSheetContent } from '../SideSheetContent';
import { standardSideSheetTheme } from './StandardSideSheet.css';

const COMPONENT_NAME = 'StandardSideSheet';

export const StandardSideSheet = componentFactory<IStandardSideSheetFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      side = 'left',
      opened,
      onClose,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IStandardSideSheetThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: standardSideSheetTheme,
      modifiers: {
        opened,
      },
    });

    const transitionNodeRef = useRef<HTMLDivElement>(null);
    const transitionNodeHandleRef = useMergeRefs(
      transitionNodeRef,
      forwardedRef,
    );

    return (
      <Box {...getStyles(['root', 'standard'])}>
        <CSSTransition
          nodeRef={transitionNodeRef}
          in={opened}
          timeout={550} // motionTokens.duration$long3
          unmountOnExit
        >
          {(status) => (
            <Motion
              status={status}
              placement={{ side }}
              origin="edge"
              pattern="enterExitOffScreen"
              {...getStyles('transitionContainer')}
              ref={transitionNodeHandleRef}
            >
              <SideSheetContent
                {...getStyles('sideSheetContent')}
                side={side}
                onClose={onClose}
                variant="standard"
                ref={transitionNodeHandleRef}
                {...other}
              />
            </Motion>
          )}
        </CSSTransition>
      </Box>
    );
  },
);

StandardSideSheet.theme = standardSideSheetTheme;
StandardSideSheet.displayName = `@sixui/${COMPONENT_NAME}`;
