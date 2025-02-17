import type { IResizableThemeFactory } from './Resizable.css';
import type { IResizableFactory } from './Resizable.types';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './Resizable.constants';
import { resizableTheme } from './Resizable.css';

export const Resizable = componentFactory<IResizableFactory>(
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

    const { getStyles } = useComponentTheme<IResizableThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: resizableTheme,
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

Resizable.theme = resizableTheme;
Resizable.displayName = `@sixui/core/${COMPONENT_NAME}`;
