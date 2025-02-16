import type { IScreenFrameThemeFactory } from './ScreenFrame.css';
import type { IScreenFrameFactory } from './ScreenFrame.types';
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
      resizable,
      minSize,
      maxSize,
      aspectRatio,
      keepAspectRatio,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IScreenFrameThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: screenFrameTheme,
    });

    return <Frame {...getStyles('root')} ref={forwardedRef} {...other} />;
  },
);

ScreenFrame.theme = screenFrameTheme;
ScreenFrame.displayName = `@sixui/core/${COMPONENT_NAME}`;
