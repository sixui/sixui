import type { IAppLayoutBodyThemeFactory } from './AppLayoutBody.css';
import type { IAppLayoutBodyFactory } from './AppLayoutBody.types';
import { useAppLayoutContext } from '~/components/AppLayout/AppLayout.context';
import { Paper } from '~/components/Paper';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { appLayoutBodyTheme } from './AppLayoutBody.css';

const COMPONENT_NAME = 'AppLayoutBody';

export const AppLayoutBody = componentFactory<IAppLayoutBodyFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      hasHeader: hasHeaderProp,
      orientation = 'horizontal',
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();
    const hasHeader =
      hasHeaderProp ?? appLayoutContext?.components.includes('header');

    const { getStyles } = useComponentTheme<IAppLayoutBodyThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appLayoutBodyTheme,
      modifiers: {
        orientation,
        'with-header': hasHeader,
      },
    });

    return (
      <Paper as="main" {...getStyles('root')} ref={forwardedRef} {...other}>
        {children}
      </Paper>
    );
  },
);

AppLayoutBody.theme = appLayoutBodyTheme;
AppLayoutBody.displayName = `@sixui/${COMPONENT_NAME}`;
