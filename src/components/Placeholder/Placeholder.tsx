import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IPlaceholderFactory } from './Placeholder.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useStyles } from '~/utils/styles/useStyles';
import { sizeToString } from '~/helpers/sizeToString';
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
      surface = 'surfaceContainerHighest',
      children,
      label,
      crosshairs,
      disabled,
      width,
      height,
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
      modifiers,
    });

    const vars = {
      [placeholderStyles.tokens.container.width]:
        width !== undefined ? sizeToString(width) : undefined,
      [placeholderStyles.tokens.container.height]:
        height !== undefined ? sizeToString(height) : undefined,
    };

    return (
      <Paper
        {...other}
        {...getStyles('root', {
          style: assignInlineVars(vars),
        })}
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

Placeholder.styles = placeholderStyles;
Placeholder.displayName = `@sixui/${COMPONENT_NAME}`;
