import type { IPlaygroundSections } from './Playground.types';
import type { IOmit } from '~/helpers/types';
import { Checkbox, type ICheckboxOwnProps } from '~/components/Checkbox';
import { Labeled } from '~/components/Labeled';
import { Playground } from './Playground';

const defaultSections: IPlaygroundSections<ICheckboxOwnProps> = [
  {
    title: 'Props',
    options: [
      {
        label: 'Disabled',
        props: {
          disabled: true,
        },
        modifiers: {
          off: true,
        },
      },
      {
        label: 'Loading',
        props: {
          loading: true,
        },
        modifiers: {
          off: true,
        },
      },
    ],
  },
];

const CheckboxGroupDemo: React.FC<
  IOmit<ICheckboxOwnProps, 'styles' | 'checked' | 'onChange'>
> = (props) => (
  <Labeled label='Extras'>
    <Labeled {...props} label='Pickles' labelPosition='right' as={Checkbox} />
    <Labeled
      {...props}
      label='Tomato'
      labelPosition='right'
      as={Checkbox}
      defaultIndeterminate
    />
    <Labeled
      {...props}
      label='Lettuce'
      labelPosition='right'
      as={Checkbox}
      defaultChecked
    />
  </Labeled>
);

export const CheckboxPlayground: React.FC = (props) => {
  return (
    <Playground<ICheckboxOwnProps>
      {...props}
      defaultSections={defaultSections}
      componentRenderer={(componentProps) => (
        <CheckboxGroupDemo {...componentProps} />
      )}
    />
  );
};
