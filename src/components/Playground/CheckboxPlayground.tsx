import type { IPlaygroundSections } from './Playground.types';
import type { IOmit } from '~/helpers/types';
import { Checkbox, type ICheckboxOwnProps } from '~/components/Checkbox';
import { Labeled, type ILabeledOwnProps } from '~/components/Labeled';
import { Playground } from './Playground';

type ICheckboxGroupDemoProps = IOmit<
  ICheckboxOwnProps,
  'styles' | 'checked' | 'onChange'
> &
  IOmit<ILabeledOwnProps, 'styles'>;

const CheckboxGroupDemo: React.FC<ICheckboxGroupDemoProps> = (props) => (
  <Labeled label='Extras'>
    <Labeled {...props} label='Pickles' as={Checkbox} />
    <Labeled {...props} label='Tomato' as={Checkbox} defaultIndeterminate />
    <Labeled {...props} label='Lettuce' as={Checkbox} defaultChecked />
  </Labeled>
);

const defaultSections: IPlaygroundSections<ICheckboxGroupDemoProps> = [
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
  {
    title: 'Label',
    options: [
      {
        label: 'Position',
        input: {
          type: 'string',
          value: 'right',
          items: [
            { label: 'Right', value: 'right' },
            { label: 'Left', value: 'left' },
          ],
          targetProp: 'labelPosition',
        },
        modifiers: {
          required: true,
        },
      },
      {
        label: 'Required',
        props: {
          required: true,
        },
        modifiers: {
          off: true,
        },
      },
      {
        label: 'Supporting text',
        props: {
          supportingText: "That's one of my favorite things!",
        },
        modifiers: {
          off: true,
        },
      },
      {
        label: 'Error',
        props: {
          hasError: true,
        },
        modifiers: {
          off: true,
        },
      },
    ],
  },
];

export const CheckboxPlayground: React.FC = (props) => {
  return (
    <Playground<ICheckboxGroupDemoProps>
      {...props}
      defaultSections={defaultSections}
      componentRenderer={(componentProps) => (
        <CheckboxGroupDemo {...componentProps} />
      )}
    />
  );
};
