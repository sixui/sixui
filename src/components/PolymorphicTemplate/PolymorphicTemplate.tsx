import type { IPolymorphicTemplateThemeFactory } from './PolymorphicTemplate.css';
import type { IPolymorphicTemplateFactory } from './PolymorphicTemplate.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import {
  polymorphicTemplateTheme,
  polymorphicTemplateThemeVariants,
} from './PolymorphicTemplate.css';

const COMPONENT_NAME = 'PolymorphicTemplate';

export const PolymorphicTemplate =
  polymorphicComponentFactory<IPolymorphicTemplateFactory>(
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

      const { getStyles } = useComponentTheme<IPolymorphicTemplateThemeFactory>(
        {
          componentName: COMPONENT_NAME,
          classNames,
          className,
          styles,
          style,
          theme: polymorphicTemplateTheme,
          themeVariants: polymorphicTemplateThemeVariants,
          variant,
          modifiers: {
            disabled,
          },
        },
      );

      return (
        <Box {...getStyles('root')} ref={forwardedRef} {...other}>
          {children}
        </Box>
      );
    },
  );

PolymorphicTemplate.theme = polymorphicTemplateTheme;
PolymorphicTemplate.displayName = `@sixui/${COMPONENT_NAME}`;
