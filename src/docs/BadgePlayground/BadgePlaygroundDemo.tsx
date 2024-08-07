import { Badge, type IBadgeProps } from '~/components/Badge';
import { Anchored, type IAnchoredProps } from '~/components/Anchored';
import { Placeholder } from '~/components/Placeholder';

export type IBadgePlaygroundDemoProps = {
  badge: IBadgeProps;
  anchored: IAnchoredProps;
};

export const BadgePlaygroundDemo: React.FC<IBadgePlaygroundDemoProps> = (
  props,
) => (
  <Anchored {...props.anchored} content={<Badge {...props.badge} />}>
    <Placeholder
      width={56}
      height={56}
      corner={props.anchored.overlap === 'circular' ? 'full' : 'sm'}
    />
  </Anchored>
);
