import { useState } from 'react';
import { Resizable } from 're-resizable';

import type { IScreenFrameThemeFactory } from './ScreenFrame.css';
import type { IScreenFrameFactory } from './ScreenFrame.types';
import { Box } from '~/components/Box';
import { DragHandle } from '~/components/DragHandle';
import { Frame } from '~/components/Frame';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './ScreenFrame.constants';
import { screenFrameTheme } from './ScreenFrame.css';

export const ScreenFrame = componentFactory<IScreenFrameFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      defaultWidth = 'auto',
      defaultHeight = 367,
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
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const [draggingHorizontally, setDraggingHorizontally] = useState(false);
    const [draggingVertically, setDraggingVertically] = useState(false);

    const { getStyles } = useComponentTheme<IScreenFrameThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: screenFrameTheme,
    });

    return (
      <Box {...getStyles('root')} {...other}>
        <Resizable
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
          <Frame
            ref={forwardedRef}
            importParentStyles
            w="100%"
            h="100%"
            {...getStyles('frame')}
          >
            {children}
          </Frame>
        </Resizable>
      </Box>
    );
  },
);

ScreenFrame.theme = screenFrameTheme;
ScreenFrame.displayName = `@sixui/core/${COMPONENT_NAME}`;
