import type { IBasicTemplateThemeFactory } from './BasicTemplate.css';
import type { IBasicTemplateFactory } from './BasicTemplate.types';
import { Paper } from '~/components/Paper';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { basicTemplateTheme } from './BasicTemplate.css';

const COMPONENT_NAME = 'BasicTemplate';

export const BasicTemplate = componentFactory<IBasicTemplateFactory>(
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

    const { getStyles } = useComponentTheme<IBasicTemplateThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: basicTemplateTheme,
      modifiers: {
        disabled,
      },
    });

    return (
      <Paper {...getStyles('root')} ref={forwardedRef} {...other}>
        <div {...getStyles('label')}>{children}</div>
      </Paper>
    );
  },
);

BasicTemplate.theme = basicTemplateTheme;
BasicTemplate.displayName = `@sixui/${COMPONENT_NAME}`;
