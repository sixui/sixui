import { forwardRef, useMemo } from 'react';

import type { IFieldProps } from './Field.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
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

    const componentTheme = useComponentTheme('Field');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(fieldStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    const populated = populatedProp ?? (!!children || !!placeholder);

    return (
      <FieldBase
        styles={innerStyles?.fieldBase}
        populated={populated}
        {...other}
        sx={[componentTheme.overridenStyles, sx]}
        ref={forwardedRef}
      >
        {children ? (
          <div {...sxf('value')} data-cy='value'>
            {children}
          </div>
        ) : placeholder ? (
          <div
            {...sxf('placeholder', other.disabled && 'placeholder$disabled')}
            data-cy='placeholder'
          >
            {placeholder}
          </div>
        ) : null}
      </FieldBase>
    );
  }),
);
