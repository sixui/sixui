import type { IFabFactory } from './Fab.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Button } from '../Button';
import { fabTheme, fabThemeVariants, type IFabThemeFactory } from './Fab.css';

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
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IFabThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: fabTheme,
      themeVariants: fabThemeVariants,
      variant,
      modifiers: {
        extended: !!children,
        lowered,
      },
    });

    return (
      <Button
        {...other}
        {...getStyles('root')}
        variant={false}
        classNames={classNames}
        ref={forwardedRef}
      >
        {children}
      </Button>
    );
  },
);

Fab.theme = fabTheme;
Fab.displayName = `@sixui/${COMPONENT_NAME}`;
