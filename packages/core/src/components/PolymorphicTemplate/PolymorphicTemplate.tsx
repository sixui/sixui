import type { IPolymorphicTemplateThemeFactory } from './PolymorphicTemplate.css';
import type { IPolymorphicTemplateFactory } from './PolymorphicTemplate.types';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/ThemeProvider';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { COMPONENT_NAME } from './PolymorphicTemplate.constants';
import {
  polymorphicTemplateTheme,
  polymorphicTemplateThemeVariants,
} from './PolymorphicTemplate.css';

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
        <Paper {...getStyles('root')} ref={forwardedRef} {...other}>
          <div {...getStyles('label')}>{children}</div>
        </Paper>
      );
    },
  );

PolymorphicTemplate.theme = polymorphicTemplateTheme;
PolymorphicTemplate.displayName = `@sixui/${COMPONENT_NAME}`;
