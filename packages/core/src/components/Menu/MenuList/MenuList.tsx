import type { IMenuListThemeFactory } from './MenuList.css';
import type { IMenuListFactory } from './MenuList.types';
import { List } from '~/components/List';
import { useComponentTheme, useProps } from '~/components/ThemeProvider';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { COMPONENT_NAME } from './MenuList.constants';
import { menuListTheme } from './MenuList.css';

export const MenuList = polymorphicComponentFactory<IMenuListFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IMenuListThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: menuListTheme,
    });

    return (
      <List
        {...getStyles('root')}
        classNames={{
          content: getStyles('listContent').className,
        }}
        {...other}
        ref={forwardedRef}
      >
        {children}
      </List>
    );
  },
);
