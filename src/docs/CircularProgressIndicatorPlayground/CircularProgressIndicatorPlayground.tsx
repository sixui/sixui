import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import {
  CircularProgressIndicatorPlaygroundDemo,
  ICircularProgressIndicatorPlaygroundDemoProps,
} from './CircularProgressIndicatorPlaygroundDemo';

export const circularprogressindicatorPlaygroundSections: IPlaygroundSections<ICircularProgressIndicatorPlaygroundDemoProps> =
  {
    circularProgressIndicator: {
      title: 'Circular Progress Indicator',
      options: [
        {
          label: 'Progress',
          input: {
            type: 'number',
            value: 67,
            min: 0,
            max: 100,
            targetProp: 'value',
            getValue: (value) => Number(value) / 100,
          },
        },
        {
          label: 'With label',
          props: {
            withLabel: true,
          },
          getModifiers: (sectionsProps) => ({
            disabled:
              sectionsProps?.circularProgressIndicator.value === undefined,
          }),
        },
      ],
    },
  };

export const CircularProgressIndicatorPlayground: React.FC = (props) => {
  return (
    <Playground<ICircularProgressIndicatorPlaygroundDemoProps>
      {...props}
      defaultSections={circularprogressindicatorPlaygroundSections}
      componentRenderer={(props) => (
        <CircularProgressIndicatorPlaygroundDemo {...props} />
      )}
    />
  );
};
