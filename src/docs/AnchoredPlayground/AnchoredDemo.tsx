import stylex from '@stylexjs/stylex';

import type { IOmit } from '~/helpers/types';
import { Anchored, type IAnchoredProps } from '~/components/Anchored';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { Placeholder } from '~/components/Placeholder';
import { shapeTokens } from '~/themes/base/shape.stylex';

export type IAnchoredDemoProps = IOmit<IAnchoredProps, 'styles' | 'content'>;

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

const Badge: React.FC = () => (
  <Placeholder sx={[styles.badge, styles.badge$sm]} />
);

export const AnchoredDemo: React.FC<IAnchoredDemoProps> = (props) => (
  <Anchored {...props} content={<Badge />}>
    <Placeholder shape={props.overlap} />
  </Anchored>
);
