import stylex from '@stylexjs/stylex';

import { Anchored, type IAnchoredProps } from '~/components/Anchored';
import { Placeholder } from '~/components/Placeholder';

export type IAnchoredPlaygroundDemoProps = {
  anchored: IAnchoredProps;
};

const styles = stylex.create({
  placeholder: {
    width: 56,
    height: 56,
  },
  badge: {
    width: 16,
    height: 16,
  },
});

export const AnchoredPlaygroundDemo: React.FC<IAnchoredPlaygroundDemoProps> = (
  props,
) => (
  <Anchored
    {...props.anchored}
    content={<Placeholder sx={styles.badge} corner='full' surface='primary' />}
  >
    <Placeholder
      sx={styles.placeholder}
      corner={props.anchored.overlap == 'circular' ? 'full' : 'sm'}
    />
  </Anchored>
);
