import stylex from '@stylexjs/stylex';

import { FieldBase, type IFieldBaseProps } from '~/components/FieldBase';
import { scaleTokens } from '~/themes/base/scale.stylex';

const styles = stylex.create({
  host: {
    width: `calc(240px * ${scaleTokens.scale})`,
  },
});

export type IFieldBasePlaygroundDemoProps = {
  fieldBase: IFieldBaseProps;
};

export const FieldBasePlaygroundDemo: React.FC<
  IFieldBasePlaygroundDemoProps
> = (props) => (
  <div {...stylex.props(styles.host)}>
    <FieldBase {...props.fieldBase} />
  </div>
);
