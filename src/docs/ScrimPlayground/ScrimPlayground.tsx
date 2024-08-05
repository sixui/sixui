import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import {
  ScrimPlaygroundDemo,
  type IScrimPlaygroundDemoProps,
} from './ScrimPlaygroundDemo';

export const scrimPlaygroundSections: IPlaygroundSections<IScrimPlaygroundDemoProps> =
  {
    scrim: {
      title: 'Scrim',
      options: [
        {
          label: 'Variant',
          input: {
            type: 'string',
            value: 'darken',
            items: [
              { label: 'Darken', value: 'darken' },
              { label: 'Lighten', value: 'lighten' },
            ],
            targetProp: 'variant',
          },
          modifiers: {
            required: true,
          },
        },
        {
          label: 'Contained',
          props: {
            contained: true,
            lockScroll: false,
          },
        },
      ],
    },
  };

export const ScrimPlayground: React.FC = (props) => {
  return (
    <Playground<IScrimPlaygroundDemoProps>
      {...props}
      defaultSections={scrimPlaygroundSections}
      componentRenderer={(props) => <ScrimPlaygroundDemo {...props} />}
    />
  );
};
