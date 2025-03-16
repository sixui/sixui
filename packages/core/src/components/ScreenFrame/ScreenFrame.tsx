import type { IScreenFrameThemeFactory } from './ScreenFrame.css';
import type {
  IScreenFrameFactory,
  IScreenFrameProps,
} from './ScreenFrame.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { Frame } from '~/components/Frame';
import { Resizable } from '~/components/Resizable';
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
      minWidth = 375,
      minHeight = 375 * 0.65,
      defaultWidth = 1300,
      defaultHeight = 1300 * 0.65,
      bounds = 'window',
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });
    const { boxProps, other: otherExceptBoxProps } =
      extractBoxProps<IScreenFrameProps>(other);

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
      <Resizable
        minWidth={minWidth}
        minHeight={minHeight}
        defaultWidth={defaultWidth}
        defaultHeight={defaultHeight}
        bounds={bounds}
        {...otherExceptBoxProps}
      >
        <Frame
          ref={forwardedRef}
          importParentStyles
          w="100%"
          h="100%"
          {...getStyles('root')}
          {...boxProps}
        >
          {children}
        </Frame>
      </Resizable>
    );
  },
);

ScreenFrame.displayName = `@sixui/core/${COMPONENT_NAME}`;
ScreenFrame.theme = screenFrameTheme;
