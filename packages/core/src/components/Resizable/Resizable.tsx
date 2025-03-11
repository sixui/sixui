import { useState } from 'react';
import { Resizable as ReResizable } from 're-resizable';

import type { IResizableThemeFactory } from './Resizable.css';
import type { IResizableFactory } from './Resizable.types';
import { ResizeHandle } from '~/components/ResizeHandle';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component';
import { COMPONENT_NAME } from './Resizable.constants';
import { resizableTheme } from './Resizable.css';

export const Resizable = polymorphicComponentFactory<IResizableFactory>(
  (props, forwardedRef) => {
    const {
      as,
      className,
      style,
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
      className,
      style,
      theme: resizableTheme,
      modifiers: {
        'handle-location': handleLocation,
      },
    });

    return (
      <ReResizable
        as={as}
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
        boundsByDirection
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
            <ResizeHandle
              interactions={{
                pressed: draggingHorizontally,
              }}
            />
          ),
          bottom: (
            <ResizeHandle
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
        ref={forwardedRef}
        {...getStyles('root')}
        {...other}
      />
    );
  },
);

Resizable.displayName = `@sixui/core/${COMPONENT_NAME}`;
Resizable.theme = resizableTheme;
