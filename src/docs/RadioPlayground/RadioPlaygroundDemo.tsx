import type { IOmit } from '~/helpers/types';
import { RadioGroup } from '~/components/RadioGroup';
import { Radio, type IRadioOwnProps } from '~/components/Radio';
import { Labeled, type ILabeledOwnProps } from '~/components/Labeled';

export type IRadioPlaygroundDemoProps = {
  radio: IOmit<IRadioOwnProps, 'styles'>;
  labeled: IOmit<ILabeledOwnProps, 'styles'>;
};

export const RadioPlaygroundDemo: React.FC<IRadioPlaygroundDemoProps> = (
  props,
) => (
  <RadioGroup>
    <Labeled label='Extras'>
      <Labeled
        {...props.radio}
        {...props.labeled}
        label='Pickles'
        value='pickles'
        as={Radio}
      />
      <Labeled
        {...props.radio}
        {...props.labeled}
        label='Tomato'
        value='tomato'
        as={Radio}
      />
      <Labeled
        {...props.radio}
        {...props.labeled}
        label='Lettuce'
        value='lettuce'
        as={Radio}
      />
    </Labeled>
  </RadioGroup>
);
