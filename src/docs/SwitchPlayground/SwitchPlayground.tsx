import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import {
  SwitchPlaygroundDemo,
  type ISwitchPlaygroundDemoProps,
} from './SwitchPlaygroundDemo';

export const switchPlaygroundSections: IPlaygroundSections<ISwitchPlaygroundDemoProps> =
  {
    switch: {
      title: 'Switch',
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
    labeled: {
      // TODO: link to Labeled component
      title: 'Labeled',
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
  };

export const SwitchPlayground: React.FC = (props) => {
  return (
    <Playground<ISwitchPlaygroundDemoProps>
      {...props}
      defaultSections={switchPlaygroundSections}
      componentRenderer={(props) => <SwitchPlaygroundDemo {...props} />}
    />
  );
};