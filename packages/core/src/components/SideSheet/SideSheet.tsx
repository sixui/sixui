import type { ISideSheetThemeFactory } from './SideSheet.css';
import type { ISideSheetFactory } from './SideSheet.types';
import { DrawerSideSheet } from '~/components/DrawerSideSheet';
import { StandardSideSheet } from '~/components/StandardSideSheet';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './SideSheet.constants';
import { sideSheetTheme } from './SideSheet.css';

export const SideSheet = componentFactory<ISideSheetFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      opened,
      drawer,
      root,
      detached,
      drawerRef,
      modal,
      wide,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ISideSheetThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: sideSheetTheme,
    });

    return (
      <>
        <DrawerSideSheet
          {...getStyles(['root', 'drawer'])}
          opened={opened && drawer}
          root={root}
          detached={detached}
          ref={drawerRef}
          modal={modal}
          {...other}
        />

        <StandardSideSheet
          {...getStyles(['root', 'standard'])}
          opened={opened && !drawer}
          wide={wide}
          ref={forwardedRef}
          {...other}
        />
      </>
    );
  },
);

SideSheet.theme = sideSheetTheme;
SideSheet.displayName = `@sixui/core/${COMPONENT_NAME}`;
