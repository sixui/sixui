import type { IOmit } from '~/helpers/types';
import type { ILabeledPlaygroundDemoProps } from '~/docs/LabeledPlayground/LabeledPlaygroundDemo';
import { Switch, type ISwitchProps } from '~/components/Switch';
import { Labeled } from '~/components/Labeled';
import { Stack } from '~/components/Stack';

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
      <Switch defaultChecked icons />
    </Labeled>
  </Stack>
);
