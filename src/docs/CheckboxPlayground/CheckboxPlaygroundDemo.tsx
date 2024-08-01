import type { IOmit } from '~/helpers/types';
import { Checkbox, type ICheckboxOwnProps } from '~/components/Checkbox';
import { Labeled, type ILabeledOwnProps } from '~/components/Labeled';

export type ICheckboxPlaygroundDemoProps = {
  checkbox: IOmit<ICheckboxOwnProps, 'styles'>;
  labeled: IOmit<ILabeledOwnProps, 'styles'>;
};

export const CheckboxPlaygroundDemo: React.FC<ICheckboxPlaygroundDemoProps> = (
  props,
) => (
  <Labeled label='Extras'>
    <Labeled
      {...props.checkbox}
      {...props.labeled}
      label='Pickles'
      as={Checkbox}
    />
    <Labeled
      {...props.checkbox}
      {...props.labeled}
      label='Tomato'
      as={Checkbox}
      defaultIndeterminate
    />
    <Labeled
      {...props.checkbox}
      {...props.labeled}
      label='Lettuce'
      as={Checkbox}
      defaultChecked
    />
  </Labeled>
);
