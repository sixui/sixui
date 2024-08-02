import stylex from '@stylexjs/stylex';

import { Labeled, type ILabeledOwnProps } from '~/components/Labeled';
import { Placeholder } from '~/components/Placeholder';

export type ILabeledPlaygroundDemoProps = {
  labeled: ILabeledOwnProps;
};

const styles = stylex.create({
  placeholder$field: {
    width: 240,
    height: 56,
  },
  placeholder$control: {
    width: 52,
    height: 32,
  },
});

export const LabeledPlaygroundDemo: React.FC<ILabeledPlaygroundDemoProps> = (
  props,
) => (
  <Labeled {...props.labeled}>
    {props.labeled.labelPosition === 'top' ||
    props.labeled.labelPosition === 'bottom' ? (
      <Placeholder
        sx={styles.placeholder$field}
        corner={{ topLeft: 'sm', topRight: 'sm' }}
      />
    ) : (
      <Placeholder sx={styles.placeholder$control} corner='full' />
    )}
  </Labeled>
);
