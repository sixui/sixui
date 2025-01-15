import type { ISideSheetContentThemeFactory } from './SideSheetContent.css';
import type { ISideSheetContentFactory } from './SideSheetContent.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { sideSheetContentTheme } from './SideSheetContent.css';

const COMPONENT_NAME = 'SideSheetContent';

export const SideSheetContent = componentFactory<ISideSheetContentFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      disabled,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ISideSheetContentThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: sideSheetContentTheme,
      modifiers: {
        disabled,
      },
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        {children}
      </Box>
    );
  },
);

SideSheetContent.theme = sideSheetContentTheme;
SideSheetContent.displayName = `@sixui/${COMPONENT_NAME}`;
