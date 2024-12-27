import type { ILabeledThemeFactory } from './Labeled.css';
import type { ILabeledFactory } from './Labeled.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { labeledTheme, labeledThemeVariants } from './Labeled.css';

const COMPONENT_NAME = 'Labeled';

export const Labeled = componentFactory<ILabeledFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'primary',
      children,
      disabled,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ILabeledThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: labeledTheme,
      themeVariants: labeledThemeVariants,
      variant,
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

Labeled.theme = labeledTheme;
Labeled.displayName = `@sixui/${COMPONENT_NAME}`;
