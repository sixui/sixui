import type { IIconButtonThemeFactory } from './IconButton.css';
import type { IIconButtonFactory } from './IconButton.types';
import { Button } from '~/components/Button';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { mergeClassNames } from '~/utils/css/mergeClassNames';
import { COMPONENT_NAME } from './IconButton.constants';
import { iconButtonTheme, iconButtonThemeVariants } from './IconButton.css';

/**
 * @see https://m3.material.io/components/icon-buttons/overview
 */
export const IconButton = polymorphicComponentFactory<IIconButtonFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'standard',
      toggle,
      selected,
      icon,
      selectedIcon,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IIconButtonThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: iconButtonTheme,
      themeVariants: iconButtonThemeVariants,
      modifiers: {
        toggle,
        selected,
      },
    });

    return (
      <Button
        {...getStyles('root')}
        variant={false}
        classNames={mergeClassNames(classNames, {
          stateLayer: getStyles('stateLayer').className,
        })}
        leadingIcon={selected ? (selectedIcon ?? icon) : icon}
        ref={forwardedRef}
        {...other}
      />
    );
  },
);

IconButton.theme = iconButtonTheme;
IconButton.displayName = `@sixui/core/${COMPONENT_NAME}`;
