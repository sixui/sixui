import type { IPlaygroundSections } from '~/docs/Playground';
import type { ITextInputFieldPlaygroundDemoProps } from './TextInputFieldPlaygroundDemo';
import { Playground } from '~/docs/Playground';
import { textFieldBasePlaygroundSections } from '~/docs/TextFieldBasePlayground';
import { TextInputFieldPlaygroundDemo } from './TextInputFieldPlaygroundDemo';

export const textInputFieldPlaygroundSections: IPlaygroundSections<ITextInputFieldPlaygroundDemoProps> =
  {
    textInputField: {
      title: 'Text Input Field',
      options: [
        {
          label: 'Type',
          input: {
            type: 'string',
            value: 'text',
            targetProp: 'type',
            items: [
              {
                label: 'Text',
                value: 'text',
              },
              {
                label: 'Number',
                value: 'number',
              },
              {
                label: 'Color',
                value: 'color',
              },
              {
                label: 'Email',
                value: 'email',
              },
              {
                label: 'Password',
                value: 'password',
              },
              {
                label: 'Date',
                value: 'date',
              },
              {
                label: 'Datetime',
                value: 'datetime-local',
              },
              {
                label: 'Time',
                value: 'time',
              },
              {
                label: 'Week',
                value: 'week',
              },
              {
                label: 'Month',
                value: 'month',
              },
            ],
          },
          modifiers: {
            required: true,
          },
        },
        {
          label: 'Placeholder',
          input: {
            type: 'string',
            value: 'Placeholder',
            targetProp: 'placeholder',
          },
        },
        {
          label: 'Prefix',
          input: {
            type: 'string',
            value: '$',
            targetProp: 'prefixText',
          },
        },
        {
          label: 'Suffix',
          input: {
            type: 'string',
            value: '.00',
            targetProp: 'suffixText',
          },
        },
      ],
    },
    ...textFieldBasePlaygroundSections,
  };

export const TextInputFieldPlayground: React.FC = (props) => {
  return (
    <Playground<ITextInputFieldPlaygroundDemoProps>
      {...props}
      defaultSections={textInputFieldPlaygroundSections}
      componentRenderer={(props) => <TextInputFieldPlaygroundDemo {...props} />}
    />
  );
};
