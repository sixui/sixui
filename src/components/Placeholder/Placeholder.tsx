import type { IPlaceholderFactory } from './Placeholder.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useStyles } from '~/utils/styles/useStyles';
import { Paper } from '../Paper';
import {
  placeholderStyles,
  type IPlaceholderStylesFactory,
} from './Placeholder.css';

const COMPONENT_NAME = 'Placeholder';

export const Placeholder = polymorphicComponentFactory<IPlaceholderFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      style,
      variant,
      children,
      label,
      crosshairs,
      disabled,
      surface = '$surfaceContainerHighest',
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const modifiers = {
      crosshairs,
      disabled,
    };

    const { getStyles } = useStyles<IPlaceholderStylesFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles: placeholderStyles,
      style,
      variant,
      modifiers,
    });

    return (
      <Paper
        {...other}
        surface={surface}
        {...getStyles('root')}
        ref={forwardedRef}
      >
        {crosshairs && <div {...getStyles('crosshairs')} />}
        {label && <div {...getStyles('label')}>{label}</div>}
        {children}
      </Paper>
    );
  },
);

Placeholder.styles = placeholderStyles;
Placeholder.displayName = `@sixui/${COMPONENT_NAME}`;
