import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import type { IStandardAsideThemeFactory } from './StandardAside.css';
import type { IStandardAsideFactory } from './StandardAside.types';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { extractBoxProps } from '../Box/extractBoxProps';
import { Motion } from '../Motion';
import { SideSheetContent } from '../SideSheetContent';
import { standardAsideTheme } from './StandardAside.css';

const COMPONENT_NAME = 'StandardAside';

export const StandardAside = componentFactory<IStandardAsideFactory>(
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
    const { boxProps, other: forwardedProps } = extractBoxProps(other);

    const { getStyles } = useComponentTheme<IStandardAsideThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: standardAsideTheme,
      modifiers: {
        opened,
        side,
      },
    });

    const transitionNodeRef = useRef<HTMLDivElement>(null);
    const transitionNodeHandleRef = useMergeRefs(
      transitionNodeRef,
      forwardedRef,
    );

    return (
      <Box {...getStyles('root')} {...boxProps}>
        <CSSTransition
          nodeRef={transitionNodeRef}
          in={opened}
          timeout={550} // motionTokens.duration$long3
          unmountOnExit
        >
          {(status) => (
            <Motion
              {...getStyles('transitionContainer')}
              status={status}
              placement={{ side }}
              origin="edge"
              pattern="enterExitOffScreen"
              ref={transitionNodeHandleRef}
            >
              <SideSheetContent
                {...getStyles('sideSheetContent')}
                side={side}
                onClose={onClose}
                variant="standard"
                ref={transitionNodeHandleRef}
                {...forwardedProps}
              />
            </Motion>
          )}
        </CSSTransition>
      </Box>
    );
  },
);

StandardAside.theme = standardAsideTheme;
StandardAside.displayName = `@sixui/${COMPONENT_NAME}`;
