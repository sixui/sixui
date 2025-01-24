import type { IFabThemeFactory } from './Fab.css';
import type { IFabFactory } from './Fab.types';
import { Button } from '~/components/Button';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { fabTheme, fabThemeVariants } from './Fab.css';

const COMPONENT_NAME = 'Fab';

export const Fab = polymorphicComponentFactory<IFabFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'surface',
      lowered,
      icon,
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
        lowered,
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
Fab.displayName = `@sixui/${COMPONENT_NAME}`;
