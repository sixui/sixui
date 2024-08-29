import { forwardRef } from 'react';

import type { IFieldProps } from './Field.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { useStyles } from '~/hooks/useStyles';
import { FieldBase } from '../FieldBase';
import { fieldStyles } from './Field.styles';

export const Field = createPolymorphicComponent<'div', IFieldProps>(
  forwardRef<HTMLDivElement, IFieldProps>(function Field(props, forwardedRef) {
    const {
      styles,
      sx,
      innerStyles,
      populated: populatedProp,
      placeholder,
      children,
      ...other
    } = props;

    const { getStyles, globalStyles } = useStyles({
      componentName: 'Field',
      styles: [fieldStyles, styles],
    });

    const populated = populatedProp ?? (!!children || !!placeholder);

    return (
      <FieldBase
        styles={innerStyles?.fieldBase}
        populated={populated}
        {...other}
        sx={[globalStyles, sx]}
        ref={forwardedRef}
      >
        {children ? (
          <div {...getStyles('value')} data-cy='value'>
            {children}
          </div>
        ) : placeholder ? (
          <div
            {...getStyles(
              'placeholder',
              other.disabled && 'placeholder$disabled',
            )}
            data-cy='placeholder'
          >
            {placeholder}
          </div>
        ) : null}
      </FieldBase>
    );
  }),
);
