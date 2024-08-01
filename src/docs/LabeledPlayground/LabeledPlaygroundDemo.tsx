import stylex from '@stylexjs/stylex';

import { Labeled, type ILabeledOwnProps } from '~/components/Labeled';
import { Placeholder } from '~/components/Placeholder';

export type ILabeledPlaygroundDemoProps = {
  labeled: ILabeledOwnProps;
};

const styles = stylex.create({
  placeholder: {
    width: 200,
    height: 56,
  },
});

export const LabeledPlaygroundDemo: React.FC<ILabeledPlaygroundDemoProps> = (
  props,
) => (
  <Labeled {...props.labeled}>
    <Placeholder
      sx={styles.placeholder}
      corner={{ topLeft: 'sm', topRight: 'sm' }}
    >
      xx
    </Placeholder>
  </Labeled>
);
