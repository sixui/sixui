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
            value: 'Label',
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
          label: 'Trailing action',
          input: {
            type: 'string',
            value: 'Trailing action',
            targetProp: 'trailingAction',
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Supporting text',
          input: {
            type: 'string',
            value: 'Supporting text',
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
            off: true,
          },
          getModifiers: (sectionsProps) => ({
            disabled: !sectionsProps?.labeled.supportingText,
          }),
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
            value: 'Error text',
            targetProp: 'errorText',
          },
          modifiers: {
            off: true,
          },
          getModifiers: (sectionsProps) => ({
            disabled: !sectionsProps?.labeled.hasError,
          }),
        },
        {
          label: 'Error text position',
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
            targetProp: 'errorTextPosition',
          },
          modifiers: {
            off: true,
          },
          getModifiers: (sectionsProps) => ({
            disabled: !sectionsProps?.labeled.errorText,
          }),
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
      ],
    },
  };

export const LabeledPlayground: React.FC = (props) => {
  return (
    <Playground<ILabeledPlaygroundDemoProps>
      {...props}
      defaultSections={labeledPlaygroundSections}
      componentRenderer={(props) => <LabeledPlaygroundDemo {...props} />}
      initialProps={{
        labeled: {
          labelPosition: 'top',
        },
      }}
    />
  );
};
