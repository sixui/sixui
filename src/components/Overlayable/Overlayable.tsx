import type { IOverlayableThemeFactory } from './Overlayable.css';
import type { IOverlayableFactory } from './Overlayable.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { overlayableTheme } from './Overlayable.css';

const COMPONENT_NAME = 'Overlayable';

export const Overlayable = polymorphicComponentFactory<IOverlayableFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      overlay,
      visible,
      keepContentVisible,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IOverlayableThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: overlayableTheme,
      modifiers: {
        visible,
        'keep-content-visible': keepContentVisible,
      },
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        <div {...getStyles('content')}>{children}</div>
        {visible && <div {...getStyles('overlay')}>{overlay}</div>}
      </Box>
    );
  },
);

Overlayable.theme = overlayableTheme;
Overlayable.displayName = `@sixui/${COMPONENT_NAME}`;
