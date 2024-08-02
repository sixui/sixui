import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import { labeledPlaygroundSections } from '~/docs/LabeledPlayground';
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
    labeled: labeledPlaygroundSections.labeled,
  };

export const SwitchPlayground: React.FC = (props) => {
  return (
    <Playground<ISwitchPlaygroundDemoProps>
      {...props}
      defaultSections={switchPlaygroundSections}
      componentRenderer={(props) => <SwitchPlaygroundDemo {...props} />}
      initialProps={{
        labeled: {
          labelPosition: 'right',
        },
      }}
    />
  );
};
