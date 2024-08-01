import type { IOmit } from '~/helpers/types';
import { Switch, type ISwitchOwnProps } from '~/components/Switch';
import { Labeled, type ILabeledOwnProps } from '~/components/Labeled';

export type ISwitchGroupDemoProps = IOmit<
  ISwitchOwnProps,
  'styles' | 'checked' | 'onChange'
> &
  IOmit<ILabeledOwnProps, 'styles'>;

export const SwitchGroupDemo: React.FC<ISwitchGroupDemoProps> = (props) => (
  <Labeled label='General settings'>
    <Labeled {...props} label='Wi-Fi' as={Switch} />
    <Labeled {...props} label='Bluetooth' as={Switch} defaultChecked />
    <Labeled
      {...props}
      label='Airplane mode'
      as={Switch}
      defaultChecked
      icons
    />
  </Labeled>
);
