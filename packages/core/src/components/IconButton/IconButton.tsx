import type { IIconButtonThemeFactory } from './IconButton.css';
import type { IIconButtonFactory } from './IconButton.types';
import { Button } from '~/components/Button';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { iconButtonTheme, iconButtonThemeVariants } from './IconButton.css';

const COMPONENT_NAME = 'IconButton';

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
IconButton.displayName = `@sixui/${COMPONENT_NAME}`;
