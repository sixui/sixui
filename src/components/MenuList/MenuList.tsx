import type { IMenuListThemeFactory } from './MenuList.css';
import type { IMenuListFactory } from './MenuList.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { List } from '../List';
import { menuListTheme } from './MenuList.css';

const COMPONENT_NAME = 'MenuList';

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
      theme: menuListTheme,
      variant,
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
