import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import { labeledPlaygroundSections } from '~/docs/LabeledPlayground';
import {
  RadioPlaygroundDemo,
  type IRadioPlaygroundDemoProps,
} from './RadioPlaygroundDemo';

export const radioPlaygroundSections: IPlaygroundSections<IRadioPlaygroundDemoProps> =
  {
    radio: {
      title: 'Radio Group',
      options: [
        {
          label: 'Disabled',
          props: {
            disabled: true,
          },
        },
        {
          label: 'Loading',
          props: {
            loading: true,
          },
        },
      ],
    },
    ...labeledPlaygroundSections,
  };

export const RadioPlayground: React.FC = (props) => {
  return (
    <Playground<IRadioPlaygroundDemoProps>
      {...props}
      defaultSections={radioPlaygroundSections}
      componentRenderer={(props) => <RadioPlaygroundDemo {...props} />}
      initialProps={{
        labeled: {
          labelPosition: 'right',
        },
      }}
    />
  );
};
