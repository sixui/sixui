import type { IPlaygroundSections } from '~/docs/Playground';
import type { IOmit } from '~/helpers/types';
import { RadioGroup } from '~/components/RadioGroup';
import { Radio, type IRadioOwnProps } from '~/components/Radio';
import { Labeled, type ILabeledOwnProps } from '~/components/Labeled';
import { Playground } from '~/docs/Playground';

type IRadioGroupGroupDemoProps = IOmit<
  IRadioOwnProps,
  'styles' | 'checked' | 'onChange'
> &
  IOmit<ILabeledOwnProps, 'styles'>;

const RadioGroupGroupDemo: React.FC<IRadioGroupGroupDemoProps> = (props) => (
  <RadioGroup>
    <Labeled label='Extras'>
      <Labeled {...props} label='Pickles' value='pickles' as={Radio} />
      <Labeled {...props} label='Tomato' value='tomato' as={Radio} />
      <Labeled {...props} label='Lettuce' value='lettuce' as={Radio} />
    </Labeled>
  </RadioGroup>
);

const defaultSections: IPlaygroundSections<IRadioGroupGroupDemoProps> = [
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
          supportingText: 'Supporting text',
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

export const RadioGroupPlayground: React.FC = (props) => {
  return (
    <Playground<IRadioGroupGroupDemoProps>
      {...props}
      defaultSections={defaultSections}
      componentRenderer={(componentProps) => (
        <RadioGroupGroupDemo {...componentProps} />
      )}
    />
  );
};
