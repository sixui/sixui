import type { IBurgerFactory } from './Burger.types';
import { IconButton } from '~/components/IconButton';
import { useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component';
import { COMPONENT_NAME } from './Burger.constants';
import { BurgerIndicator } from './BurgerIndicator';

export const Burger = polymorphicComponentFactory<IBurgerFactory>(
  (props, forwardedRef) => {
    const { variant, opened, ...other } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    return (
      <IconButton
        variant={variant}
        ref={forwardedRef}
        icon={<BurgerIndicator opened={opened} />}
        {...other}
      />
    );
  },
);

Burger.displayName = `@sixui/core/${COMPONENT_NAME}`;
Burger.Indicator = BurgerIndicator;
