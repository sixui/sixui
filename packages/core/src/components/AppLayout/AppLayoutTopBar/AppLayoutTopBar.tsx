import type { IAppLayoutTopBarThemeFactory } from './AppLayoutTopBar.css';
import type { IAppLayoutTopBarFactory } from './AppLayoutTopBar.types';
import { Burger } from '~/components/Burger';
import { useComponentTheme, useProps } from '~/components/Theme';
import { TopAppBar } from '~/components/TopAppBar';
import { componentFactory } from '~/utils/component/componentFactory';
import { useAppLayoutContext } from '../AppLayout.context';
import { useAppLayoutComponent } from '../hooks/useAppLayoutComponent';
import { COMPONENT_NAME } from './AppLayoutTopBar.constants';
import { appLayoutTopBarTheme } from './AppLayoutTopBar.css';

export const AppLayoutTopBar = componentFactory<IAppLayoutTopBarFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      wide,
      divider,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();
    useAppLayoutComponent('topBar');

    const { getStyles } = useComponentTheme<IAppLayoutTopBarThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appLayoutTopBarTheme,
      modifiers: {
        'with-divider': divider,
      },
    });

    return (
      <TopAppBar
        {...getStyles('root')}
        as="header"
        ref={forwardedRef}
        leadingNavigation={
          wide &&
          appLayoutContext?.navigationDrawer?.state?.toggle && (
            <Burger onClick={appLayoutContext.navigationDrawer.state.toggle} />
          )
        }
        trailingActions={
          appLayoutContext?.sideSheet?.state?.toggle && (
            <Burger onClick={appLayoutContext.sideSheet.state.toggle} />
          )
        }
        {...other}
      />
    );
  },
);

AppLayoutTopBar.theme = appLayoutTopBarTheme;
AppLayoutTopBar.displayName = `@sixui/core/${COMPONENT_NAME}`;
