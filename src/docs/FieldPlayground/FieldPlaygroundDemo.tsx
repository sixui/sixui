import stylex from '@stylexjs/stylex';

import type { IOmit } from '~/helpers/types';
import type { IFieldBaseOwnProps } from '~/components/FieldBase';
import { Field, type IFieldProps } from '~/components/Field';

const styles = stylex.create({
  host: {
    width: 240,
  },
});

export type IFieldPlaygroundDemoProps = {
  fieldBase: IOmit<IFieldBaseOwnProps, 'children' | 'styles'>;
  field: IFieldProps;
};

export const FieldPlaygroundDemo: React.FC<IFieldPlaygroundDemoProps> = (
  props,
) => (
  <div {...stylex.props(styles.host)}>
    <Field {...props.fieldBase} {...props.field} />
  </div>
);
