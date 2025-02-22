import type { IPlaceholderThemeFactory } from './Placeholder.css';
import type { IPlaceholderFactory } from './Placeholder.types';
import { Diagonals } from '~/components/Diagonals';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { COMPONENT_NAME } from './Placeholder.constants';
import { placeholderTheme } from './Placeholder.css';

export const Placeholder = polymorphicComponentFactory<IPlaceholderFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      label,
      diagonals,
      disabled,
      surface = '$surfaceContainerHigh',
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IPlaceholderThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: placeholderTheme,
      modifiers: {
        disabled,
      },
    });

    return (
      <Paper
        {...getStyles('root')}
        surface={surface}
        ref={forwardedRef}
        {...other}
      >
        {diagonals && <Diagonals {...getStyles('diagonals')} />}
        {label && <div {...getStyles('label')}>{label}</div>}
        {children}
      </Paper>
    );
  },
);

Placeholder.theme = placeholderTheme;
Placeholder.displayName = `@sixui/core/${COMPONENT_NAME}`;
