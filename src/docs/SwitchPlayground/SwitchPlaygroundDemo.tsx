import type { ISwitchProps } from '~/components/Switch';
import type { ILabeledPlaygroundDemoProps } from '~/docs/LabeledPlayground/LabeledPlaygroundDemo';
import type { IOmit } from '~/helpers/types';
import { Labeled } from '~/components/Labeled';
import { Stack } from '~/components/Stack';
import { Switch } from '~/components/Switch';

export type ISwitchPlaygroundDemoProps = ILabeledPlaygroundDemoProps & {
  switch: IOmit<ISwitchProps, 'styles'>;
};

export const SwitchPlaygroundDemo: React.FC<ISwitchPlaygroundDemoProps> = (
  props,
) => (
  <Stack gap={4}>
    <Labeled {...props.switch} {...props.labeled}>
      <Switch />
    </Labeled>
    <Labeled {...props.switch} {...props.labeled}>
      <Switch defaultChecked />
    </Labeled>
    <Labeled {...props.switch} {...props.labeled}>
      <Switch defaultChecked withIcons />
    </Labeled>
  </Stack>
);
