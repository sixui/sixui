import type { IRadioProps } from '~/components/Radio';
import type { ILabeledPlaygroundDemoProps } from '~/docs/LabeledPlayground/LabeledPlaygroundDemo';
import type { IOmit } from '~/helpers/types';
import { Labeled } from '~/components/Labeled';
import { Radio } from '~/components/Radio';
import { RadioGroup } from '~/components/RadioGroup';
import { Stack } from '~/components/Stack';

export type IRadioPlaygroundDemoProps = ILabeledPlaygroundDemoProps & {
  radio: IOmit<IRadioProps, 'styles'>;
};

export const RadioPlaygroundDemo: React.FC<IRadioPlaygroundDemoProps> = (
  props,
) => (
  <RadioGroup>
    <Stack gap={4}>
      <Labeled {...props.radio} {...props.labeled}>
        <Radio value="1" />
      </Labeled>
      <Labeled {...props.radio} {...props.labeled}>
        <Radio value="2" />
      </Labeled>
      <Labeled {...props.radio} {...props.labeled}>
        <Radio value="3" />
      </Labeled>
    </Stack>
  </RadioGroup>
);
