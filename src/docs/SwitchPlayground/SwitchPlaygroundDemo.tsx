import type { IOmit } from '~/helpers/types';
import { Switch, type ISwitchOwnProps } from '~/components/Switch';
import { Labeled, type ILabeledOwnProps } from '~/components/Labeled';

export type ISwitchPlaygroundDemoProps = {
  switch: IOmit<ISwitchOwnProps, 'styles'>;
  labeled: IOmit<ILabeledOwnProps, 'styles'>;
};

export const SwitchPlaygroundDemo: React.FC<ISwitchPlaygroundDemoProps> = (
  props,
) => (
  <Labeled label='General settings'>
    <Labeled {...props.switch} {...props.labeled} label='Wi-Fi' as={Switch} />
    <Labeled
      {...props.switch}
      {...props.labeled}
      label='Bluetooth'
      as={Switch}
      defaultChecked
    />
    <Labeled
      {...props.switch}
      {...props.labeled}
      label='Airplane mode'
      as={Switch}
      defaultChecked
      icons
    />
  </Labeled>
);
