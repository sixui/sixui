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
      variant = 'standard',
      onClose,
      children,
      headline,
      leadingActions,
      trailingActions,
      showCloseButton,
      closeIcon,
      header,
      footer,
      bottomActions,
      anchor,
      divider,
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
        anchor,
      },
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        XX
      </Box>
    );
  },
);

SideSheetContent.theme = sideSheetContentTheme;
SideSheetContent.displayName = `@sixui/${COMPONENT_NAME}`;
