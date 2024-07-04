import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IFieldStyleKey } from '@/components/atoms/Field';
import { componentVars as vars } from '../FieldBase/FieldBase.stylex';

type IFieldStyles = IStyles<IFieldStyleKey>;
export const styles: MapNamespaces<IFieldStyles> = stylex.create<IFieldStyles>({
  placeholder: {
    WebkitTextFillColor: vars.contentPlaceholderColor,
    color: vars.contentPlaceholderColor,
    opacity: 1,
  },
  placeholder$disabled: {
    WebkitTextFillColor: 'currentColor',
    color: 'currentColor',
  },
  value: {
    color: 'inherit',
    display: 'flex',
    flexGrow: 1,
  },
});
