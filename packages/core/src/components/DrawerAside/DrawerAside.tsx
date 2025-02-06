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
      opened,
      children,
      detached,
      root,
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
        opened={opened}
        side={side}
        variant={detached ? 'detached' : undefined}
        fullHeight={['left', 'right'].includes(side)}
        root={root}
        modal
        ref={forwardedRef}
        {...other}
      >
        {({ close }) =>
          isFunction(children) ? children({ type: 'modal', close }) : children
        }
      </Drawer>
    );
  },
);

DrawerAside.theme = drawerAsideTheme;
DrawerAside.displayName = `@sixui/core/${COMPONENT_NAME}`;
