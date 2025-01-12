import type { ITabListThemeFactory } from './TabList.css';
import type { ITabListFactory } from './TabList.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { Divider } from '../Divider';
import { tabListTheme } from './TabList.css';

const COMPONENT_NAME = 'TabList';

export const TabList = componentFactory<ITabListFactory>(
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

    const { getStyles } = useComponentTheme<ITabListThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: tabListTheme,
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

TabList.theme = tabListTheme;
TabList.displayName = `@sixui/${COMPONENT_NAME}`;
