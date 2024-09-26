import type { IIconButtonThemeFactory } from './IconButton.css';
import type { IIconButtonFactory } from './IconButton.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Button } from '../Button';
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
      theme: iconButtonTheme,
      themeVariants: iconButtonThemeVariants,
      variant,
      modifiers: {
        toggle,
        selected,
      },
    });

    return (
      <Button
        {...getStyles('root')}
        variant={false}
        classNames={classNames}
        icon={selected ? (selectedIcon ?? icon) : icon}
        ref={forwardedRef}
        {...other}
      />
    );
  },
);

IconButton.theme = iconButtonTheme;
IconButton.displayName = `@sixui/${COMPONENT_NAME}`;
