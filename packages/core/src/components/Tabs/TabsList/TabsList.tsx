import type { ITabsListThemeFactory } from './TabsList.css';
import type { ITabsListFactory } from './TabsList.types';
import { Box } from '~/components/Box';
import { Divider } from '~/components/Divider';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './TabsList.constants';
import { tabsListTheme } from './TabsList.css';

export const TabsList = componentFactory<ITabsListFactory>(
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

    const { getStyles } = useComponentTheme<ITabsListThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: tabsListTheme,
    });

    return (
      <Box
        {...getStyles('root')}
        ref={forwardedRef}
        role="tablist"
        aria-orientation="horizontal"
        {...other}
      >
        <div {...getStyles('inner')}>{children}</div>
        <Divider />
      </Box>
    );
  },
);

TabsList.theme = tabsListTheme;
TabsList.displayName = `@sixui/core/${COMPONENT_NAME}`;
