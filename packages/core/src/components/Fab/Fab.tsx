import type { IFabThemeFactory } from './Fab.css';
import type { IFabFactory } from './Fab.types';
import { Button } from '~/components/Button';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { mergeClassNames } from '~/utils/css/mergeClassNames';
import { COMPONENT_NAME } from './Fab.constants';
import { fabTheme, fabThemeVariants } from './Fab.css';

export const Fab = polymorphicComponentFactory<IFabFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'surface',
      flat,
      icon,
      size = 'md',
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IFabThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: fabTheme,
      themeVariants: fabThemeVariants,
      modifiers: {
        extended: !!other.children,
        flat,
        size,
      },
    });

    return (
      <Button
        {...getStyles('root')}
        variant={false}
        classNames={mergeClassNames(classNames, {
          stateLayer: getStyles('stateLayer').className,
        })}
        leadingIcon={icon}
        ref={forwardedRef}
        {...other}
      />
    );
  },
);

Fab.theme = fabTheme;
Fab.displayName = `@sixui/core/${COMPONENT_NAME}`;
