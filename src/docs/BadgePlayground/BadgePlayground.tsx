import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import { anchoredPlaygroundSections } from '../AnchoredPlayground';
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
          modifiers: {
            on: true,
          },
        },
        {
          label: 'Max value',
          input: {
            type: 'number',
            value: 99,
            targetProp: 'maxValue',
          },
        },
        {
          label: 'Dot',
          props: {
            dot: true,
          },
        },
        {
          label: 'Show zero value',
          props: {
            showZero: true,
          },
        },
      ],
    },
    anchored: anchoredPlaygroundSections.anchored,
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
