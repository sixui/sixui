import { useState } from 'react';
import { Resizable as ReResizable } from 're-resizable';

import type { IResizableThemeFactory } from './Resizable.css';
import type { IResizableFactory } from './Resizable.types';
import { Box } from '~/components/Box';
import { DragHandle } from '~/components/DragHandle';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './Resizable.constants';
import { resizableTheme } from './Resizable.css';

export const Resizable = componentFactory<IResizableFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      size,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      grid,
      gridGap,
      snap,
      snapGap,
      lockAspectRatio,
      children,
      defaultWidth,
      defaultHeight,
      locked,
      orientation,
      handleLocation = 'outside',
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const [draggingHorizontally, setDraggingHorizontally] = useState(false);
    const [draggingVertically, setDraggingVertically] = useState(false);

    const { getStyles } = useComponentTheme<IResizableThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: resizableTheme,
      modifiers: {
        'handle-location': handleLocation,
      },
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        <ReResizable
          enable={
            locked
              ? false
              : !orientation
                ? undefined
                : {
                    right: orientation === 'horizontal',
                    bottom: orientation === 'vertical',
                  }
          }
          defaultSize={{
            width: defaultWidth,
            height: defaultHeight,
          }}
          size={size}
          minWidth={minWidth}
          minHeight={minHeight}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          grid={grid}
          gridGap={gridGap}
          snap={snap}
          snapGap={snapGap}
          lockAspectRatio={lockAspectRatio}
          bounds="window"
          handleClasses={{
            right: getStyles('handleRight').className,
            bottom: getStyles('handleBottom').className,
          }}
          handleStyles={{
            right: {
              height: 'auto',
              top: '50%',
              transform: 'translateY(-50%)',
            },
            bottom: {
              width: 'auto',
              left: '50%',
              transform: 'translateX(-50%)',
            },
          }}
          handleComponent={{
            right: (
              <DragHandle
                interactions={{
                  pressed: draggingHorizontally,
                }}
              />
            ),
            bottom: (
              <DragHandle
                interactions={{
                  pressed: draggingVertically,
                }}
                orientation="horizontal"
              />
            ),
          }}
          onResizeStart={(_event, direction) => {
            if (['left', 'right'].includes(direction)) {
              setDraggingHorizontally(true);
            }
            if (['top', 'bottom'].includes(direction)) {
              setDraggingVertically(true);
            }
          }}
          onResizeStop={() => {
            setDraggingHorizontally(false);
            setDraggingVertically(false);
          }}
        >
          {children}
        </ReResizable>
      </Box>
    );
  },
);

Resizable.theme = resizableTheme;
Resizable.displayName = `@sixui/core/${COMPONENT_NAME}`;
