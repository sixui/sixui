import type { IDrawerAsideThemeFactory } from './DrawerAside.css';
import type { IDrawerAsideFactory } from './DrawerAside.types';
import { Drawer } from '~/components/Drawer';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { isFunction } from '~/utils/isFunction';
import { COMPONENT_NAME } from './DrawerAside.constants';
import { drawerAsideTheme } from './DrawerAside.css';

export const DrawerAside = componentFactory<IDrawerAsideFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      side = 'left',
      children,
      detached,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IDrawerAsideThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: drawerAsideTheme,
    });

    return (
      <Drawer
        {...getStyles('root')}
        variant={detached ? 'detached' : undefined}
        fullHeight={['left', 'right'].includes(side)}
        ref={forwardedRef}
        side={side}
        {...other}
      >
        {({ close }) => (isFunction(children) ? children({ close }) : children)}
      </Drawer>
    );
  },
);

DrawerAside.displayName = `@sixui/core/${COMPONENT_NAME}`;
DrawerAside.theme = drawerAsideTheme;
