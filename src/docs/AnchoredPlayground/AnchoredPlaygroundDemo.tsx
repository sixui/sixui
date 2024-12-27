import type { IAnchoredProps } from '~/components/Anchored';
import { Anchored } from '~/components/Anchored';
import { Placeholder } from '~/components/Placeholder';

export type IAnchoredPlaygroundDemoProps = {
  anchored: IAnchoredProps;
};

export const AnchoredPlaygroundDemo: React.FC<IAnchoredPlaygroundDemoProps> = (
  props,
) => (
  <Anchored
    {...props.anchored}
    content={<Placeholder w={16} h={16} shape="$full" surface="$primary" />}
  >
    <Placeholder
      w={56}
      h={56}
      shape={props.anchored.overlap == 'circular' ? '$full' : '$sm'}
    />
  </Anchored>
);
