import stylex from '@stylexjs/stylex';

import { Anchored, type IAnchoredProps } from '~/components/Anchored';
import { Placeholder } from '~/components/Placeholder';

export type IAnchoredPlaygroundDemoProps = {
  anchored: IAnchoredProps;
};

const styles = stylex.create({
  badge: {
    height: 16,
    width: 16,
  },
});

const BadgePlaceholder: React.FC = () => (
  <Placeholder corner='full' surface='primary' sx={styles.badge} />
);

export const AnchoredPlaygroundDemo: React.FC<IAnchoredPlaygroundDemoProps> = (
  props,
) => (
  <Anchored {...props.anchored} content={<BadgePlaceholder />}>
    <Placeholder
      corner={props.anchored.overlap == 'circular' ? 'full' : 'sm'}
    />
  </Anchored>
);
