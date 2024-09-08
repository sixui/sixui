import type { IBasicTemplateFactory } from './BasicTemplate.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../../Box';
import {
  polymorphicTemplateTheme,
  polymorphicTemplateThemeVariants,
  type IBasicTemplateThemeFactory,
} from './BasicTemplate.css';

const COMPONENT_NAME = 'BasicTemplate';

export const BasicTemplate = componentFactory<IBasicTemplateFactory>(
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

    const { getStyles } = useComponentTheme<IBasicTemplateThemeFactory>({
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
    });

    return (
      <Box {...other} {...getStyles('root')} ref={forwardedRef}>
        {children}
      </Box>
    );
  },
);

BasicTemplate.theme = polymorphicTemplateTheme;
BasicTemplate.displayName = `@sixui/${COMPONENT_NAME}`;
