import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import type { IOrientation } from '~/helpers/types';
import type { IStandardAsideThemeFactory } from './StandardAside.css';
import type { IStandardAsideFactory } from './StandardAside.types';
import { isFunction } from '~/helpers/isFunction';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { Motion } from '../Motion';
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
      children,
      wide,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const orientation: IOrientation = ['left', 'right'].includes(side)
      ? 'horizontal'
      : 'vertical';

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
        wide,
        orientation,
      },
    });

    const transitionNodeRef = useRef<HTMLDivElement>(null);
    const transitionNodeHandleRef = useMergeRefs(
      transitionNodeRef,
      forwardedRef,
    );

    return (
      <Box {...getStyles('root')} {...other}>
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
              {isFunction(children)
                ? children({ type: 'standard', close: onClose })
                : children}
            </Motion>
          )}
        </CSSTransition>
      </Box>
    );
  },
);

StandardAside.theme = standardAsideTheme;
StandardAside.displayName = `@sixui/${COMPONENT_NAME}`;
