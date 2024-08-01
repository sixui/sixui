import type { IOmit } from '~/helpers/types';
import { RadioGroup } from '~/components/RadioGroup';
import { Radio, type IRadioOwnProps } from '~/components/Radio';
import { Labeled, type ILabeledOwnProps } from '~/components/Labeled';

export type IRadioGroupGroupDemoProps = IOmit<
  IRadioOwnProps,
  'styles' | 'checked' | 'onChange'
> &
  IOmit<ILabeledOwnProps, 'styles'>;

export const RadioGroupGroupDemo: React.FC<IRadioGroupGroupDemoProps> = (
  props,
) => (
  <RadioGroup>
    <Labeled label='Extras'>
      <Labeled {...props} label='Pickles' value='pickles' as={Radio} />
      <Labeled {...props} label='Tomato' value='tomato' as={Radio} />
      <Labeled {...props} label='Lettuce' value='lettuce' as={Radio} />
    </Labeled>
  </RadioGroup>
);
