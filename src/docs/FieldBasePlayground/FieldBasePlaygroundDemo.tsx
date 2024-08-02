import stylex from '@stylexjs/stylex';

import { FieldBase, type IFieldBaseProps } from '~/components/FieldBase';

const styles = stylex.create({
  host: {
    width: 240,
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
