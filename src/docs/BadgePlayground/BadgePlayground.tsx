import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import {
  BadgePlaygroundDemo,
  IBadgePlaygroundDemoProps,
} from './BadgePlaygroundDemo';

export const badgePlaygroundSections: IPlaygroundSections<IBadgePlaygroundDemoProps> =
  {
    badge: {
      title: 'Badge',
      options: [
        {
          label: 'Value',
          input: {
            type: 'string',
            value: '8',
            targetProp: 'value',
          },
        },
        {
          label: 'Max value',
          input: {
            type: 'number',
            value: 99,
            targetProp: 'maxValue',
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Dot',
          props: {
            dot: true,
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Show zero value',
          props: {
            showZero: true,
          },
          modifiers: {
            off: true,
          },
        },
      ],
    },
    anchored: {
      // TODO: link to Anchored component
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
          modifiers: {
            off: true,
          },
        },
      ],
    },
  };

export const BadgePlayground: React.FC = (props) => {
  return (
    <Playground<IBadgePlaygroundDemoProps>
      {...props}
      defaultSections={badgePlaygroundSections}
      componentRenderer={(props) => <BadgePlaygroundDemo {...props} />}
    />
  );
};
