import type { ILabeledProps } from '~/components/Labeled';
import { Labeled } from '~/components/Labeled';
import { Placeholder } from '~/components/Placeholder';

export type ILabeledPlaygroundDemoProps = {
  labeled: ILabeledProps;
};

export const LabeledPlaygroundDemo: React.FC<ILabeledPlaygroundDemoProps> = (
  props,
) => (
  <Labeled {...props.labeled}>
    {props.labeled.labelPosition === 'top' ||
    props.labeled.labelPosition === 'bottom' ? (
      <Placeholder
        width={240}
        height={56}
        corner={{ topLeft: 'sm', topRight: 'sm' }}
      />
    ) : (
      <Placeholder width={52} height={32} corner="full" />
    )}
  </Labeled>
);
