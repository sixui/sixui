import stylex from '@stylexjs/stylex';

import { Anchored, type IAnchoredProps } from '~/components/Anchored';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { Placeholder } from '~/components/Placeholder';
import { shapeTokens } from '~/themes/base/shape.stylex';

export type IAnchoredPlaygroundDemoProps = {
  anchored: IAnchoredProps;
};

const styles = stylex.create({
  badge: {
    borderRadius: shapeTokens.corner$full,
    backgroundColor: colorSchemeTokens.primary,
  },
  badge$sm: {
    height: 16,
    width: 16,
  },
});

const BadgePlaceholder: React.FC = () => (
  <Placeholder sx={[styles.badge, styles.badge$sm]} />
);

export const AnchoredPlaygroundDemo: React.FC<IAnchoredPlaygroundDemoProps> = (
  props,
) => (
  <Anchored {...props.anchored} content={<BadgePlaceholder />}>
    <Placeholder shape={props.anchored.overlap} />
  </Anchored>
);
