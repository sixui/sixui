import stylex from '@stylexjs/stylex';

import type { IOmit } from '~/helpers/types';
import type { IFieldBaseProps } from '~/components/FieldBase';
import { Field, type IFieldProps } from '~/components/Field';
import { scaleTokens } from '~/themes/base/scale.stylex';

const styles = stylex.create({
  host: {
    width: `calc(240px * ${scaleTokens.scale})`,
  },
});

export type IFieldPlaygroundDemoProps = {
  fieldBase: IOmit<IFieldBaseProps, 'children' | 'styles'>;
  field: IFieldProps;
};

export const FieldPlaygroundDemo: React.FC<IFieldPlaygroundDemoProps> = (
  props,
) => (
  <div {...stylex.props(styles.host)}>
    <Field {...props.fieldBase} {...props.field} />
  </div>
);
