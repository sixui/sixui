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
          label: 'Size',
          input: {
            type: 'string',
            value: 'md',
            items: [
              {
                label: 'Medium',
                value: 'md',
              },
              {
                label: 'Large',
                value: 'lg',
              },
            ],
            targetProp: 'size',
          },
          modifiers: {
            required: true,
          },
        },
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
          modifiers: {
            off: true,
          },
        },
        {
          label: 'With label',
          props: {
            withLabel: true,
          },
          modifiers: {
            off: true,
          },
          getModifiers: (sectionsProps) => ({
            disabled:
              sectionsProps?.circularProgressIndicator.size !== 'lg' ||
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
