import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import {
  LabeledPlaygroundDemo,
  ILabeledPlaygroundDemoProps,
} from './LabeledPlaygroundDemo';

export const labeledPlaygroundSections: IPlaygroundSections<ILabeledPlaygroundDemoProps> =
  {
    labeled: {
      title: 'Labeled',
      options: [
        {
          label: 'Label',
          input: {
            type: 'string',
            value: 'First name',
            targetProp: 'label',
          },
          modifiers: {
            required: true,
          },
        },
        {
          label: 'Label position',
          input: {
            type: 'string',
            value: 'top',
            items: [
              {
                label: 'Top',
                value: 'top',
              },
              {
                label: 'Bottom',
                value: 'bottom',
              },
              {
                label: 'Left',
                value: 'left',
              },
              {
                label: 'Right',
                value: 'right',
              },
            ],
            targetProp: 'labelPosition',
          },
          modifiers: {
            required: true,
          },
        },
        {
          label: 'Supporting text',
          input: {
            type: 'string',
            value: 'How should we address you?',
            targetProp: 'supportingText',
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Supporting text position',
          input: {
            type: 'string',
            value: 'start',
            items: [
              {
                label: 'Start',
                value: 'start',
              },
              {
                label: 'End',
                value: 'end',
              },
            ],
            targetProp: 'supportingTextPosition',
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
          label: 'Disabled',
          props: {
            disabled: true,
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
        {
          label: 'Error text',
          input: {
            type: 'string',
            value: 'This field is required',
            targetProp: 'errorText',
          },
          modifiers: {
            off: true,
          },
          getModifiers: (sectionsProps) => ({
            disabled: !sectionsProps?.labeled.hasError,
          }),
        },
      ],
    },
  };

export const LabeledPlayground: React.FC = (props) => {
  return (
    <Playground<ILabeledPlaygroundDemoProps>
      {...props}
      defaultSections={labeledPlaygroundSections}
      componentRenderer={(props) => <LabeledPlaygroundDemo {...props} />}
    />
  );
};
