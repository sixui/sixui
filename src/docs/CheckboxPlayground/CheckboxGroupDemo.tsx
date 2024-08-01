import type { IOmit } from '~/helpers/types';
import { Checkbox, type ICheckboxOwnProps } from '~/components/Checkbox';
import { Labeled, type ILabeledOwnProps } from '~/components/Labeled';

export type ICheckboxGroupDemoProps = IOmit<
  ICheckboxOwnProps,
  'styles' | 'checked' | 'onChange'
> &
  IOmit<ILabeledOwnProps, 'styles'>;

export const CheckboxGroupDemo: React.FC<ICheckboxGroupDemoProps> = (props) => (
  <Labeled label='Extras'>
    <Labeled {...props} label='Pickles' as={Checkbox} />
    <Labeled {...props} label='Tomato' as={Checkbox} defaultIndeterminate />
    <Labeled {...props} label='Lettuce' as={Checkbox} defaultChecked />
  </Labeled>
);
