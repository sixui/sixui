import type { IOmit } from '~/helpers/types';
import type { ILabeledPlaygroundDemoProps } from '~/docs/LabeledPlayground/LabeledPlaygroundDemo';
import { Checkbox, type ICheckboxProps } from '~/components/Checkbox';
import { Labeled } from '~/components/Labeled';
import { Stack } from '~/components/Stack';

export type ICheckboxPlaygroundDemoProps = ILabeledPlaygroundDemoProps & {
  checkbox: IOmit<ICheckboxProps, 'styles'>;
};

export const CheckboxPlaygroundDemo: React.FC<ICheckboxPlaygroundDemoProps> = (
  props,
) => (
  <Stack gap={4}>
    <Labeled {...props.checkbox} {...props.labeled}>
      <Checkbox />
    </Labeled>
    <Labeled {...props.checkbox} {...props.labeled}>
      <Checkbox defaultIndeterminate />
    </Labeled>
    <Labeled {...props.checkbox} {...props.labeled}>
      <Checkbox defaultChecked />
    </Labeled>
  </Stack>
);
