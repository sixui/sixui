import type { IPlaceholderFactory } from './Placeholder.types';
import { componentFactory } from '~/utils/componentFactory';
import { useProps } from '~/hooks/useProps';
import { useStyles } from '~/hooks/useStyles2';
// import { sizeToString } from '~/helpers/sizeToString';
import { Paper } from '../Paper';
import {
  placeholderStyles,
  type IPlaceholderStylesFactory,
} from './Placeholder.css';

const COMPONENT_NAME = 'Placeholder';

export const Placeholder = componentFactory<IPlaceholderFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      style,
      surface = 'surfaceContainerHighest',
      corner = 'sm',
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

    // FIXME: handle scale
    // const widthAsString = width !== undefined ? sizeToString(width) : undefined;
    // const heightAsString =
    //   height !== undefined ? sizeToString(height) : undefined;

    // widthAsString !== undefined && commonStyles.width(widthAsString),
    //         heightAsString !== undefined && commonStyles.height(heightAsString),
    //         disabled ? 'host$disabled' : null,

    return (
      <Paper
        {...other}
        {...getStyles('root')}
        surface={surface}
        corner={corner}
        ref={forwardedRef}
      >
        {crosshairs && <div {...getStyles('crosshairs')} />}
        {label && <div {...getStyles('label')}>{label}</div>}
        {children}
      </Paper>
    );
  },
);
