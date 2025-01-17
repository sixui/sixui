import type { IAppBodyThemeFactory } from './AppBody.css';
import type { IAppBodyFactory } from './AppBody.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { Paper } from '../Paper';
import { appBodyTheme } from './AppBody.css';

const COMPONENT_NAME = 'AppBody';

export const AppBody = componentFactory<IAppBodyFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      hasHeader: hasHeaderProp,
      hasAside: hasAsideProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();
    const hasHeader =
      hasHeaderProp ?? appLayoutContext?.components.includes('header');
    const hasAside =
      hasAsideProp ?? appLayoutContext?.components.includes('aside');

    const { getStyles } = useComponentTheme<IAppBodyThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appBodyTheme,
      modifiers: {
        'with-header': hasHeader,
        'with-aside': hasAside,
      },
    });

    return (
      <Paper as="main" {...getStyles('root')} ref={forwardedRef} {...other}>
        {children}
      </Paper>
    );
  },
);

AppBody.theme = appBodyTheme;
AppBody.displayName = `@sixui/${COMPONENT_NAME}`;
