import type { IMenuListThemeFactory } from './MenuList.css';
import type { IMenuListFactory } from './MenuList.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { PaperBase } from '~/components/PaperBase';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { List } from '../../List';
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

    const { boxProps, other: forwardedProps } = extractBoxProps(other);

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
      <PaperBase {...boxProps} {...getStyles('root')} ref={forwardedRef}>
        <List
          {...forwardedProps}
          classNames={mergeClassNames(classNames, {
            root: getStyles('list').className,
            content: getStyles('listContent').className,
          })}
        >
          {children}
        </List>
      </PaperBase>
    );
  },
);
