import type { IOverlayableThemeFactory } from './Overlayable.css';
import type { IOverlayableFactory } from './Overlayable.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { overlayableTheme } from './Overlayable.css';

const COMPONENT_NAME = 'Overlayable';

export const Overlayable = componentFactory<IOverlayableFactory>(
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
