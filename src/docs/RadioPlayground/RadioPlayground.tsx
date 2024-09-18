import type { IPlaygroundSections } from '~/docs/Playground';
import type { IRadioPlaygroundDemoProps } from './RadioPlaygroundDemo';
import { labeledPlaygroundSections } from '~/docs/LabeledPlayground';
import { Playground } from '~/docs/Playground';
import { RadioPlaygroundDemo } from './RadioPlaygroundDemo';

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
