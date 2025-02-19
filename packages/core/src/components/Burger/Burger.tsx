import type { IBurgerThemeFactory } from './Burger.css';
import type { IBurgerFactory } from './Burger.types';
import { IconButton } from '~/components/IconButton';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component';
import { COMPONENT_NAME } from './Burger.constants';
import { BurgerIndicator } from './BurgerIndicator';
import { burgerTheme } from './Burger.css';

export const Burger = polymorphicComponentFactory<IBurgerFactory>(
  (props, forwardedRef) => {
    const { classNames, className, styles, style, variant, opened, ...other } =
      useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IBurgerThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: burgerTheme,
    });

    return (
      <IconButton
        {...getStyles('root')}
        classNames={classNames}
        variant={variant}
        ref={forwardedRef}
        icon={<BurgerIndicator opened={opened} />}
        {...other}
      />
    );
  },
);

Burger.theme = burgerTheme;
Burger.displayName = `@sixui/core/${COMPONENT_NAME}`;
Burger.Indicator = BurgerIndicator;
