import type { IFlexThemeFactory } from './Flex.css';
import type { IFlexFactory } from './Flex.types';
import { Box } from '~/components/Box';
import { filterFalsyChildren } from '~/helpers/react/filterFalsyChildren';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { COMPONENT_NAME } from './Flex.constants';
import { flexSprinkles, flexTheme } from './Flex.css';

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

    const sprinkles = flexSprinkles({
      ...otherWithSprinkles,
      gap:
        otherWithSprinkles.direction === 'column'
          ? undefined
          : otherWithSprinkles.gap,
      rowGap:
        otherWithSprinkles.direction === 'column'
          ? (otherWithSprinkles.rowGap ?? otherWithSprinkles.gap)
          : undefined,
    });
    const other = sprinkles.otherProps;

    const { getStyles } = useComponentTheme<IFlexThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: flexTheme,
    });

    const filteredChildren = filterFalsyChildren(children);

    return (
      <Box
        {...getStyles('root', {
          className: sprinkles.className,
          style: sprinkles.style,
        })}
        ref={forwardedRef}
        {...other}
      >
        {divider
          ? filteredChildren.reduce<Array<React.ReactNode>>(
              (acc, child, index) => {
                if (index === 0) {
                  return [child];
                }

                return [...acc, divider, child];
              },
              [],
            )
          : filteredChildren}
      </Box>
    );
  },
);

Flex.theme = flexTheme;
Flex.displayName = `@sixui/${COMPONENT_NAME}`;
