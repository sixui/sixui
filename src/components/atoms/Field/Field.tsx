import { forwardRef, useMemo } from 'react';

import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '@/helpers/types';
import type { IFieldStyleKey } from './Field.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import {
  FieldBase,
  type IFieldBaseStyleKey,
  type IFieldBaseProps,
} from '@/components/atoms/FieldBase';

export type IFieldProps = IContainerProps<IFieldStyleKey> &
  Omit<IFieldBaseProps, 'styles' | 'children' | 'populated'> & {
    innerStyles?: {
      field?: IZeroOrMore<ICompiledStyles<IFieldBaseStyleKey>>;
    };
    placeholder?: string;
    value?: React.ReactNode;
  };

export const Field = forwardRef<HTMLDivElement, IFieldProps>(
  function Field(props, ref) {
    const { styles, sx, placeholder, value, ...other } = props;

    const { theme } = useComponentTheme('Field');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory<IFieldStyleKey>(stylesCombinator),
      [stylesCombinator],
    );

    const populated = !!value || !!placeholder;

    return (
      <FieldBase sx={sx} ref={ref} populated={populated} {...other}>
        {value ? (
          <div {...sxf('value')}>{value}</div>
        ) : placeholder ? (
          <div
            {...sxf('placeholder', other.disabled && 'placeholder$disabled')}
          >
            {placeholder}
          </div>
        ) : null}
      </FieldBase>
    );
  },
);
