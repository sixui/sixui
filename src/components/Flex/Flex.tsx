import type { IFlexFactory } from './Flex.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '~/components/Box';
import { filterFalsyChildren } from '~/helpers/react/filterFalsyChildren';
import { flexTheme, flexSprinkles, type IFlexThemeFactory } from './Flex.css';

const COMPONENT_NAME = 'Flex';

export const Flex = polymorphicComponentFactory<IFlexFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      divider,
      ...otherWithSprinkles
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const sprinkles = flexSprinkles(otherWithSprinkles);
    const other = sprinkles.otherProps;

    const { getStyles } = useComponentTheme<IFlexThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: flexTheme,
      variant,
    });

    const filteredChildren = filterFalsyChildren(children);

    return (
      <Box
        {...other}
        {...getStyles('root', {
          className: sprinkles.className,
          style: sprinkles.style,
        })}
        ref={forwardedRef}
      >
        {divider
          ? filteredChildren.reduce((acc, child, index) => {
              if (index === 0) {
                return [child];
              }

              return [...acc, divider, child];
            }, [] as Array<React.ReactNode>)
          : filteredChildren}
      </Box>
    );
  },
);

Flex.theme = flexTheme;
Flex.displayName = `@sixui/${COMPONENT_NAME}`;
