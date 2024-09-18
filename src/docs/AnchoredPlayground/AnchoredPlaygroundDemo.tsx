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
    content={
      <Placeholder width={16} height={16} corner="full" surface="primary" />
    }
  >
    <Placeholder
      width={56}
      height={56}
      corner={props.anchored.overlap == 'circular' ? 'full' : 'sm'}
    />
  </Anchored>
);
