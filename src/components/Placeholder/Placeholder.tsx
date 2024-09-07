import type { IPlaceholderFactory } from './Placeholder.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Paper } from '../Paper';
import {
  placeholderTheme,
  type IPlaceholderThemeFactory,
} from './Placeholder.css';

const COMPONENT_NAME = 'Placeholder';

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
      crosshairs,
      disabled,
      surface = '$surfaceContainerHighest',
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IPlaceholderThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: placeholderTheme,
      variant,
      modifiers: {
        disabled,
      },
    });

    return (
      <Paper
        {...other}
        {...getStyles('root')}
        surface={surface}
        ref={forwardedRef}
      >
        {crosshairs && <div {...getStyles('crosshairs')} />}
        {label && <div {...getStyles('label')}>{label}</div>}
        {children}
      </Paper>
    );
  },
);

Placeholder.theme = placeholderTheme;
Placeholder.displayName = `@sixui/${COMPONENT_NAME}`;
