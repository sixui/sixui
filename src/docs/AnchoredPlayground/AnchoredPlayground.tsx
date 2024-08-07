import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import {
  AnchoredPlaygroundDemo,
  IAnchoredPlaygroundDemoProps,
} from './AnchoredPlaygroundDemo';

export const anchoredPlaygroundSections: IPlaygroundSections<IAnchoredPlaygroundDemoProps> =
  {
    anchored: {
      title: 'Anchored',
      options: [
        {
          label: 'Overlap',
          input: {
            type: 'string',
            targetProp: 'overlap',
            value: 'circular',
            items: [
              { label: 'Circular', value: 'circular' },
              { label: 'Rectangular', value: 'rectangular' },
            ],
          },
          modifiers: {
            required: true,
          },
        },
        {
          label: 'Vertical origin',
          input: {
            type: 'string',
            targetProp: 'verticalOrigin',
            value: 'top',
            items: [
              { label: 'Top', value: 'top' },
              { label: 'Bottom', value: 'bottom' },
            ],
          },
          modifiers: {
            required: true,
          },
        },
        {
          label: 'Horizontal origin',
          input: {
            type: 'string',
            targetProp: 'horizontalOrigin',
            value: 'right',
            items: [
              { label: 'Right', value: 'right' },
              { label: 'Left', value: 'left' },
            ],
          },
          modifiers: {
            required: true,
          },
        },
        {
          label: 'Invisible',
          props: {
            invisible: true,
          },
        },
      ],
    },
  };

export const AnchoredPlayground: React.FC = (props) => {
  return (
    <Playground<IAnchoredPlaygroundDemoProps>
      {...props}
      defaultSections={anchoredPlaygroundSections}
      componentRenderer={(props) => <AnchoredPlaygroundDemo {...props} />}
    />
  );
};
